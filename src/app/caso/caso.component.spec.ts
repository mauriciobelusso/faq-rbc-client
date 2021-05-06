import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { CasoComponent } from './caso.component';

describe('ProdutoraComponent', () => {
  let component: CasoComponent;
  let fixture: ComponentFixture<CasoComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ CasoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CasoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
