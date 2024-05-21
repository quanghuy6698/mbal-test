import { Component, signal } from '@angular/core';
import { InfoInputFormCmp } from '../../component/info-input-form/info-input-form.cmp';
import { AddressInputFormCmp } from '../../component/address-input-form/address-input-form.cmp';
import { CommonModule } from '@angular/common';
import { ProcessSuccessCmp } from '../../component/process-success/process-success.cmp';

@Component({
  selector: 'register-page',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.css'],
  standalone: true,
  imports: [CommonModule, InfoInputFormCmp, AddressInputFormCmp, ProcessSuccessCmp],
})
export class RegisterPage {
  isShowInfoForm = signal(true);
  isShowAddressForm = signal(false);
  isRegisterSuccess = signal(false);

  showAddressForm() {
    this.isShowInfoForm.set(false);
    this.isShowAddressForm.set(true);
  }

  completeRegister() {
    this.isShowInfoForm.set(false);
    this.isShowAddressForm.set(false);
    this.isRegisterSuccess.set(true);
  }

  reRegister() {
    this.isShowInfoForm.set(true);
    this.isShowAddressForm.set(false);
    this.isRegisterSuccess.set(false);
  }
}
