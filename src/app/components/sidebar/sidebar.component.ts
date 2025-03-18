import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss'
})
export class SidebarComponent {

  isClosed = true;
  @Output() closeBarEvent = new EventEmitter<boolean>();

  closeSidebar() {
    this.isClosed = !this.isClosed;
    this.closeBarEvent.emit(this.isClosed);
  }

}
