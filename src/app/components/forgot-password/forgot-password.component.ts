import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { getEmailPattern } from '../../utils/validations.utils';
import { LoadingService } from '../../services/loading.service';
import { RouterLink, RouterModule } from '@angular/router';

@Component({
  selector: 'app-forgot-password',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, RouterModule, RouterLink],
  templateUrl: './forgot-password.component.html',
  styleUrl: './forgot-password.component.scss'
})
export class ForgotPasswordComponent {
  constructor(private loadingService: LoadingService) {

  }

  accountForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.pattern(getEmailPattern())]),
    });

    isLoading() {
      return this.loadingService.isLoading();
    }

}
