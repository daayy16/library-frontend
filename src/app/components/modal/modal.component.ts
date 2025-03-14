import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { BsModalService } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-modal',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.scss',
  providers: [BsModalService]
})
export class ModalComponent {
  public message = '';
  public title  = ''
  public error = false;
  public exitModal = (): void => {};

}
