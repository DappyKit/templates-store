import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ChangeDetectorRef } from '@angular/core';
import { SharedModalComponent } from './modal.component';

import { Subject } from 'rxjs';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SharedModalService } from '../../../services/sharedModal.service';

describe('SharedModalComponent', () => {
  let component: SharedModalComponent;
  let fixture: ComponentFixture<SharedModalComponent>;

  beforeEach(async () => {
    const sharedModalServiceMock = jasmine.createSpyObj('SharedModalService', ['toggle'], {
      modalState$: new Subject<any>()
    });


    await TestBed.configureTestingModule({
      imports: [SharedModalComponent, BrowserAnimationsModule],
      providers: [
        ChangeDetectorRef,
        { provide: SharedModalService, useValue: sharedModalServiceMock },
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SharedModalComponent);
    component = fixture.componentInstance;
    component.id = 'testModal';
    component['modalService'] = TestBed.inject(SharedModalService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should subscribe to modalState$ on ngAfterViewInit', () => {
    component.ngAfterViewInit();
    (component['modalService'].modalState$ as Subject<any>).next({ id: 'testModal', show: true });
    expect(component.modalVisible).toBe(true);
  });

  it('should unsubscribe from modalState$ on ngOnDestroy', () => {
    component.ngAfterViewInit();
    component.ngOnDestroy();
    expect(component['modalSubscription'].closed).toBe(true);
  });

  it('should handle close event', () => {
    component.id = 'testModal';
    component.modalVisible = true;
    component.show = true;

    component.handleClose(new MouseEvent('click'));
    
    expect(component.show).toBe(false);
    expect(component.modalVisible).toBe(false);
    expect(component['modalService'].toggle).toHaveBeenCalledWith({ show: false, id: 'testModal' });
  });
});
