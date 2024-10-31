import { TestBed } from '@angular/core/testing';
import { ApplicationService } from './application.service';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { provideHttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { ApiPath } from '../constants/api-url.config';
import { dynamicPath } from '../utilities/addParamsToEndpoint';

describe('ApplicationService', () => {
  let service: ApplicationService;
  let httpMock: HttpTestingController;
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideHttpClient(),
        provideHttpClientTesting()
      ]
    });
    httpMock = TestBed.inject(HttpTestingController);
    service = TestBed.inject(ApplicationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('#getApplications', () => {
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

    it('should make a GET request', async () => {
      const response$ = service.getApplications(userId);

      const responsePromise = firstValueFrom(response$);
      const path = dynamicPath(ApiPath.USER_APPLICATIONS, userId);
      const req = httpMock.expectOne(path);
      expect(req.request.method).toBe('GET');
    });
  });
});
