import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DecodeurComponent } from './decodeur.component';

describe('DecodeurComponent', () => {
  let component: DecodeurComponent;
  let fixture: ComponentFixture<DecodeurComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DecodeurComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DecodeurComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
