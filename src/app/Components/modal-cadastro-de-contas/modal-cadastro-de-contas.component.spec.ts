import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalCadastroDeContasComponent } from './modal-cadastro-de-contas.component';

describe('ModalCadastroDeContasComponent', () => {
  let component: ModalCadastroDeContasComponent;
  let fixture: ComponentFixture<ModalCadastroDeContasComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ModalCadastroDeContasComponent]
    });
    fixture = TestBed.createComponent(ModalCadastroDeContasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
