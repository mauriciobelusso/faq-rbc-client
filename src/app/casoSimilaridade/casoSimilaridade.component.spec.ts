import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { CasoSimilaridadeComponent } from './casoSimilaridade.component';

describe('CasoSimilaridadeComponent', () => {
  let component: CasoSimilaridadeComponent;
  let fixture: ComponentFixture<CasoSimilaridadeComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ CasoSimilaridadeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CasoSimilaridadeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
