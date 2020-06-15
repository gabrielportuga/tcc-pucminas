import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { IncidentCrudPage } from './incidente-crud.page';

describe('IncidentCrudPage', () => {
  let component: IncidentCrudPage;
  let fixture: ComponentFixture<IncidentCrudPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IncidentCrudPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(IncidentCrudPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
