import { provideHttpClient } from '@angular/common/http';
import { TemplateService } from './template.service';
import { TestBed } from '@angular/core/testing';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { firstValueFrom } from 'rxjs';
import { ApiPath } from '../constants/api-url.config';

describe('TemplateService', () => {
  let service: TemplateService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideHttpClient(),
        provideHttpClientTesting()
      ]
    });
    httpMock = TestBed.inject(HttpTestingController);
    service = TestBed.inject(TemplateService);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('#createApp', () => {
    const userId = 366142;
    const app = {
      description: "Qui deserunt quis od",
      isPublic: true,
      title: "Quis neque obcaecati",
      questions: [
        {
          question: "Incididunt itaque ut",
          answers: ["Voluptas voluptatum", "Voluptatum provident", "Iste itaque sunt ani"],
          correctAnswerIndex: 2
        }
      ]
    };

    it('should make a POST request with the correct body', async () => {
      const response$ = service.createApp(userId, app);

      const responsePromise = firstValueFrom(response$);

      const req = httpMock.expectOne(ApiPath.CREATE_APP);
      expect(req.request.method).toBe('POST');
      expect(req.request.body).toEqual({ userId, ...app });

    });
  });
});
