import { TestBed } from "@angular/core/testing";
import { CanMatchFn, Route, UrlSegment } from "@angular/router";
import { Observable, ReplaySubject } from "rxjs";
import { AuthFacadeService } from "./../store/facade.service";
import { SessionService } from "./../services/sessionService.service";
import { canMatchGuard } from "./canMatchAuth.guard";
import { IUser } from "../interfaces/IUser.interface";
import { RouterTestingModule } from "@angular/router/testing";
import { IStatus } from "../interfaces/IStatus.interface";
import { MODAL_ID } from "../constants/modal-id";
import { SharedModalService } from "../services/sharedModal.service";

describe("canMatchGuard", () => {
  let authFacadeServiceSpy: jasmine.SpyObj<AuthFacadeService>;
  let modalServiceSpy: jasmine.SpyObj<SharedModalService>;
  let route: jasmine.SpyObj<Route>;
  let segments: jasmine.SpyObj<UrlSegment[]>;
  const sessionData = {
    state: "completed",
    nonce: "12345678",
    message: "",
  } as IStatus;

  const executeGuard: CanMatchFn = (route, segments) => {
    return TestBed.runInInjectionContext(() => canMatchGuard(route, segments));
  };
  const sessionServiceMock = {
    getItemFromLocalStorage: jasmine.createSpy("getItemFromLocalStorage")
  }
  const authFacadeServiceMock = {
    login: jasmine.createSpy("login"),
    user$: new ReplaySubject(1)
  }
  beforeEach(() => {
    const modalServiceMock = jasmine.createSpyObj("ModalService", ["toggle"]);
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      providers: [
        { provide: SessionService, useValue: sessionServiceMock },
        { provide: AuthFacadeService, useValue: authFacadeServiceMock },
        {provide: SharedModalService, useValue: modalServiceMock}
      ],
    });
    modalServiceSpy = TestBed.inject(SharedModalService) as jasmine.SpyObj<SharedModalService>;
    authFacadeServiceSpy = TestBed.inject(AuthFacadeService) as jasmine.SpyObj<AuthFacadeService>;

  });

  it("should be created", () => {
    expect(executeGuard).toBeTruthy();
  });

  it("should return false and navigate to login if session data is missing", (done) => {
    sessionServiceMock.getItemFromLocalStorage.and.returnValue(null);
    const result = executeGuard(route, segments);
    expect(modalServiceSpy.toggle).toHaveBeenCalledWith({ show: true, id: MODAL_ID.loginComponent });
    (result as Observable<boolean>).subscribe((value) => {
      expect(value).toBe(false);
      done();
    });
  });

  it("should login and return true if session data is present", (done) => {
    sessionServiceMock.getItemFromLocalStorage.and.returnValue(sessionData);
    const mockUser: IUser = { id: 123, displayName: "Test User" };
    authFacadeServiceMock.user$.next(mockUser);

    const result = executeGuard(route, segments);

    expect(authFacadeServiceSpy.login).toHaveBeenCalledWith(sessionData);

    (result as Observable<boolean>).subscribe((value) => {
      expect(value).toBe(true);
      done();
    });
  });

});
