import { Component, signal } from '@angular/core';
import { InfoInputFormCmp } from '../../component/info-input-form/info-input-form.cmp';
import { AddressInputFormCmp } from '../../component/address-input-form/address-input-form.cmp';
import { CommonModule } from '@angular/common';
import { ProcessSuccessCmp } from '../../component/process-success/process-success.cmp';
import { NzStepsModule } from 'ng-zorro-antd/steps';

@Component({
  selector: 'register-page',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.css'],
  standalone: true,
  imports: [CommonModule, InfoInputFormCmp, AddressInputFormCmp, ProcessSuccessCmp, NzStepsModule],
})
export class RegisterPage {
  isShowInfoForm = signal(true);
  isShowAddressForm = signal(false);
  isRegisterSuccess = signal(false);
  currentStep = signal(0);

  showAddressForm() {
    this.isShowInfoForm.set(false);
    this.isShowAddressForm.set(true);
    this.currentStep.set(1);
  }

  completeRegister() {
    this.isShowInfoForm.set(false);
    this.isShowAddressForm.set(false);
    this.isRegisterSuccess.set(true);
    this.currentStep.set(2);
  }

  reRegister() {
    this.isShowInfoForm.set(true);
    this.isShowAddressForm.set(false);
    this.isRegisterSuccess.set(false);
    this.currentStep.set(0);
  }
}
