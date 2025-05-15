import { Component } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import {} from '@angular/common/http';
import { Router, RouterLink, RouterModule } from '@angular/router';
import { AccountService } from '../../services/account.service';
import { LoadingService } from '../../services/loading.service';
import { ModalComponent } from '../modal/modal.component';
import { BsModalRef, BsModalService, ModalBackdropOptions, ModalOptions } from "ngx-bootstrap/modal";
import { getEmailPattern } from '../../utils/validations.utils';
import { StorageService } from '../../services/storage.service';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-login-page',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, RouterModule, RouterLink, ModalComponent, CommonModule],
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.scss',
  providers: [BsModalService],
})
export class LoginPageComponent {

  constructor(private accountService: AccountService,
    private router: Router,
    private loadingService: LoadingService,
    private modalService: BsModalService,
    private storageService: StorageService
  ) {
    this.storageService.deleteSession('token');
   }

  mostrarErro = false;
  mensagemErro = '';
  modalRef?: BsModalRef;
  showPassword = false


  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.pattern(getEmailPattern())]),
    password: new FormControl('', [Validators.required, Validators.minLength(8)])
  });

  confirm() {
    const payload = {
      email: this.loginForm.get('email')?.value,
      password: this.loginForm.get('password')?.value
    }
    this.accountService.login(payload).subscribe({
      next: (v) => this.sucessLogin(v?.access_token),
      error: (e) => this.openModal()
    });

  }

  isLoading() {
    return this.loadingService.isLoading();
  }

  openModal(): void {
    const initialState = {
      title: 'Erro',
      message: 'Login não autorizado, verifique o email e/ou a senha',
      error: true,
      exitModal: () => {
        this.modalRef?.hide();
      }
    };

    const options: ModalOptions = {
      backdrop: 'static'
    }


    this.modalRef = this.modalService.show(ModalComponent, {
      ...options,
      initialState,
    });

  }

  sucessLogin(token: string) {
    this.storageService.setSessionStorage('token', token);
    this.router.navigate(['books'])

  }

  ShowPassIcon() {
    this.showPassword = !this.showPassword;
  }

}


