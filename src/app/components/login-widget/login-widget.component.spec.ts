import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginWidgetComponent } from './login-widget.component';

describe('LoginWidgetComponent', () => {
  let component: LoginWidgetComponent;
  let fixture: ComponentFixture<LoginWidgetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LoginWidgetComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LoginWidgetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
