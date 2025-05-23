import { Component } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { AccountService } from '../../services/account.service';
import { Router } from '@angular/router';
import { LoadingService } from '../../services/loading.service';
import { getEmailPattern, passwordValidation } from '../../utils/validations.utils';
import { BsModalRef, BsModalService, ModalOptions } from 'ngx-bootstrap/modal';
import { ModalComponent } from '../modal/modal.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-create-account',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, ModalComponent, CommonModule],
  templateUrl: './create-account.component.html',
  styleUrl: './create-account.component.scss',
  providers: [BsModalService],
})
export class CreateAccountComponent {

  constructor(private accountService: AccountService,
    private router: Router,
    private loadingService: LoadingService,
    private modalService: BsModalService,

  ) { }

  modalRef?: BsModalRef;
  showPassword = false;
  showRepeatPassword = false;

  accountForm = new FormGroup({
    fullname: new FormControl('', [Validators.required, Validators.minLength(2)]),
    email: new FormControl('', [Validators.required, Validators.pattern(getEmailPattern())]),
    password: new FormControl('', [Validators.required, Validators.minLength(8)]),
    repeatPassword: new FormControl('', [Validators.required, Validators.minLength(8)]),
  }, { validators: passwordValidation });


  confirm() {
    const payload = {
      fullname: this.accountForm.get('fullname')?.value,
      email: this.accountForm.get('email')?.value,
      password: this.accountForm.get('password')?.value
    }
    this.accountService.create(payload).subscribe({
      next: (v) => this.openModalSuccess(),
      error: (e) => this.openModalError()
    })
  }

  isLoading() {
    return this.loadingService.isLoading();
  }

  openModalError() {
    const initialState = {
      title: 'Aviso',
      message: 'Ocorreu um erro ao criar a conta',
      error: true,
      exitModal: () => {
        this.modalRef?.hide();
      }
    };
    this.openModal(initialState)
  }

  openModalSuccess() {
    const initialState = {
      title: 'Sucesso',
      message: 'Conta criada com sucesso, clique em fechar para voltar ao login',
      error: false,
      exitModal: () => {
        this.modalRef?.hide();
      },
    };
    this.openModal(initialState)
  }

  openModal(initialState: any): void {
    const options: ModalOptions = {
      backdrop: 'static'
    }

    this.modalRef = this.modalService.show(ModalComponent, {
      ...options,
      initialState,
    });

    this.modalRef?.onHidden?.subscribe(() => {
      if (!this.modalRef?.content?.error) {
        this.router.navigate(['login'])
      }
    })

  }

  ShowPassIcon() {
    this.showPassword = !this.showPassword;
  }

  ShowRepeatPassIcon() {
    this.showRepeatPassword = !this.showRepeatPassword;
  }
}
