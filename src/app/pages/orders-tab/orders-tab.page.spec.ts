import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { OrdersTabPage } from './orders-tab.page';

describe('OrdersTabPage', () => {
  let component: OrdersTabPage;
  let fixture: ComponentFixture<OrdersTabPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrdersTabPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(OrdersTabPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
