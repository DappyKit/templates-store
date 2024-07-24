import { ENVIRONMENT } from './../constants/environment';

import { TestBed } from '@angular/core/testing';

import { AuthService } from './auth.service';
import { provideHttpClient } from '@angular/common/http';
import { AppClient, } from '@farcaster/auth-client';
import { IChannel } from '../interfaces/IChannel.interface';
import { IStatus } from '../interfaces/IStatus.interface';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { getDomainFromUrl } from '../utilities/getDomainFromUrl';
import { ApiPath } from '../constants/api-url.config';

describe('AuthService', () => {
  let service: AuthService;
  let httpTesting!: HttpTestingController;
   const appClient = jasmine.createSpyObj({
      createChannel: jasmine.createSpy('createChannel').and.returnValue(Promise.resolve({ data: {} as IChannel })),
      watchStatus: jasmine.createSpy('watchStatus').and.returnValue(Promise.resolve({ data: {} as IStatus })),
      verifySignInMessage: jasmine.createSpy('verifySignInMessage').and.returnValue(Promise.resolve({ data: {} as IStatus }))
   } as unknown as AppClient
   )
   const mockEnvironment = {
    production: true,
    url: 'https://test.com'
   }
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        { provide: ENVIRONMENT, useValue: mockEnvironment },
      ],
    });
    httpTesting = TestBed.inject(HttpTestingController);
    service = TestBed.inject(AuthService);
    service['appClient'] = appClient;
  });


  afterEach(() => {
    TestBed.inject(HttpTestingController).verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should create a channel', async () => {
    const channelMock: IChannel = {
      channelToken: 'string',
      url: 'string',
      nonce: 'string',
      connectUri: 'string'
    };

    appClient.createChannel.and.returnValue(Promise.resolve({ data: channelMock }));

    const result = await service.createChannel();
    expect(result).toEqual(channelMock);
    expect(appClient.createChannel).toHaveBeenCalledWith({
      siweUri: 'https://test.com',
      domain: getDomainFromUrl('https://test.com')
    });
  });

  it('should get status', async () => {
    const statusMock: IStatus = { 
      state: 'pending',
      nonce: 'string'
    };
    appClient.watchStatus.and.returnValue(Promise.resolve({ data: statusMock }));

    const result = await service.getStatus('test-token');
    expect(result).toEqual(statusMock);
    expect(appClient.watchStatus).toHaveBeenCalledWith({
      channelToken: 'test-token',
      timeout: 60000,
      interval: 2000,
      onResponse: jasmine.any(Function)
    });
  });

  it('should login and return an observable', () => {
    const statusMock: IStatus = { 
      state: 'pending',
      nonce: 'string'
    };

    service.login(statusMock).subscribe();

    const req = httpTesting.expectOne(ApiPath.LOGIN);
    expect(req.request.method).toBe('POST');
    req.flush({});
  });
  
});


