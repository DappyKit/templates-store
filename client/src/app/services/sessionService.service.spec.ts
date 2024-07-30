import { TestBed } from "@angular/core/testing";

import { LOCAL_STORAGE } from "../constants/localStorage.injectionToken";
import { SessionService } from "./sessionService.service";

describe('SessionService', () => {
  let service: SessionService;
  let localStorageMock: any;

  beforeEach(() => {
    localStorageMock = {
      getItem: jasmine.createSpy('getItem').and.callFake((key: string) => {
        return key || null;
      }),
      setItem: jasmine.createSpy('setItem').and.callFake((key: string, value: string) => {
        key = value;
      })
    };

    TestBed.configureTestingModule({
      providers: [
        SessionService,
        { provide: LOCAL_STORAGE, useValue: localStorageMock }
      ]
    });

    service = TestBed.inject(SessionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should set item to local storage', () => {
    const key = 'testKey';
    const data = { foo: 'bar' };

    service.setItemToLocalStorage(key, data);
    expect(localStorageMock.setItem).toHaveBeenCalledWith(key, JSON.stringify(data));
  });

  it('should get item from local storage', () => {
    const key = 'testKey';
    const data = { foo: 'bar' };
    localStorageMock.getItem.and.returnValue(JSON.stringify(data));

    const result = service.getItemFromLocalStorage(key);
    expect(localStorageMock.getItem).toHaveBeenCalledWith(key);
    expect(result).toEqual(data);
  });

  it('should return null if item does not exist in local storage', () => {
    const key = 'nonExistentKey';
    localStorageMock.getItem.and.returnValue(null);

    const result = service.getItemFromLocalStorage(key);
    expect(localStorageMock.getItem).toHaveBeenCalledWith(key);
    expect(result).toBeNull();
  });
});
