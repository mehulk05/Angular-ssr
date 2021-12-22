import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WebsiteSsrComponent } from './website-ssr.component';

describe('WebsiteSsrComponent', () => {
  let component: WebsiteSsrComponent;
  let fixture: ComponentFixture<WebsiteSsrComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WebsiteSsrComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WebsiteSsrComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
