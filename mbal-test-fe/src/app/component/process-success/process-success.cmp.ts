import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'process-success-cmp',
  templateUrl: './process-success.cmp.html',
  styleUrls: ['./process-success.cmp.css'],
  standalone: true,
  imports: [CommonModule],
})
export class ProcessSuccessCmp {
  @Output('goBack') goBack = new EventEmitter<void>();

  onGoBack() {
    this.goBack.emit();
  }
}
