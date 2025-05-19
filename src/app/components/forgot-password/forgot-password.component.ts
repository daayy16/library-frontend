import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { getEmailPattern } from '../../utils/validations.utils';
import { LoadingService } from '../../services/loading.service';
import { Router, RouterLink, RouterModule } from '@angular/router';
import { AccountService } from '../../services/account.service';
import { BsModalRef, BsModalService, ModalOptions } from 'ngx-bootstrap/modal';
import { ModalComponent } from '../modal/modal.component';

@Component({
  selector: 'app-forgot-password',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, RouterModule, RouterLink, ModalComponent],
  templateUrl: './forgot-password.component.html',
  styleUrl: './forgot-password.component.scss',
  providers: [BsModalService]
})
export class ForgotPasswordComponent {
  constructor(private loadingService: LoadingService,
    private accountService: AccountService,
    private modalService: BsModalService,
    private router: Router
  ) {

  }

  accountForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.pattern(getEmailPattern())]),
  });
  modalRef?: BsModalRef;


  isLoading() {
    return this.loadingService.isLoading();
  }

  SendEmail() {
    this.accountService.forgotPassword(this.accountForm.get('email')?.value).subscribe({
      next: (s) => this.openModal(false, 'Email enviado! Acesse seu email e siga as instruções para recuperar a sua senha!'),
      error: (err) => this.openModal(true, 'Ocorreu um erro tente novamente!'),
    })
  }

  openModal(erro: boolean, mensagem: string): void {
    const initialState = {
      title: erro ? 'Erro' : 'Sucesso',
      message: mensagem,
      error: erro,
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

    this.modalRef?.onHidden?.subscribe(() => {
      if (!this.modalRef?.content?.error) {
        this.router.navigate(['login'])
      }
    })

  }

}
