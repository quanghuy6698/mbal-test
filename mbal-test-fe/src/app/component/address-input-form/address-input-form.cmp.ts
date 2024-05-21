import { Component, EventEmitter, OnInit, Output, signal } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { FormMsgCmp } from '../form-msg/form-msg.cmp';
import { ADDRESS_INPUT_FORM } from '../../constant/form.const';
import { FORM_FIELD_REQUIRED_MSG, MESSAGE_TYPES, SUBMIT_INFO_ADDRESS_SUCCESS_MSG } from '../../constant/message.const';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { IAddressModel } from '../../model/info.model';
import { ApiConst } from '../../constant/api.const';
import { HttpService } from '../../service/http.service';

@Component({
  selector: 'address-input-form-cmp',
  templateUrl: './address-input-form.cmp.html',
  styleUrls: ['./address-input-form.cmp.css'],
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, NzFormModule, NzInputModule, NzDatePickerModule, NzButtonModule, FormMsgCmp],
})
export class AddressInputFormCmp implements OnInit {
  @Output('completeRegister') completeRegister = new EventEmitter<void>();

  addressInputForm = this.formBuilder.group({
    [ADDRESS_INPUT_FORM.LINE1.KEY]: ['', [Validators.required]],
    [ADDRESS_INPUT_FORM.LINE2.KEY]: [''],
    [ADDRESS_INPUT_FORM.CITY.KEY]: ['', [Validators.required]],
    [ADDRESS_INPUT_FORM.STATE.KEY]: ['', [Validators.required]],
    [ADDRESS_INPUT_FORM.COUNTRY.KEY]: ['', [Validators.required]],
  });

  isShowFormMsg = signal(false);
  formMsg = signal('');
  formMsgType = signal('');

  constructor(private formBuilder: FormBuilder, private httpSvc: HttpService) {}

  ngOnInit() {}

  /**
   * Set values to form
   *
   * @param task: Task object to set values to form
   */
  setFormValues(address: IAddressModel) {
    this.addressInputForm.controls[ADDRESS_INPUT_FORM.LINE1.KEY].setValue(address.line1);
    this.addressInputForm.controls[ADDRESS_INPUT_FORM.LINE2.KEY].setValue(address.line2);
    this.addressInputForm.controls[ADDRESS_INPUT_FORM.CITY.KEY].setValue(address.city);
    this.addressInputForm.controls[ADDRESS_INPUT_FORM.STATE.KEY].setValue(address.state);
    this.addressInputForm.controls[ADDRESS_INPUT_FORM.COUNTRY.KEY].setValue(address.country);
  }

  /**
   * Submit info
   *
   */
  onSubmit() {
    let errMsg = this.validateFormValues();
    if (errMsg) {
      this.showFormMsg(MESSAGE_TYPES.ERROR, errMsg);
      return;
    }

    this.submitInfoAddress();
  }

  submitInfoAddress() {
    let formValues = this.getFormValues();
    this.httpSvc.postData(ApiConst.API_INFO_ADDRESS, formValues, false).subscribe({
      next: (value) => {
        this.showFormMsg(MESSAGE_TYPES.SUCCESS, SUBMIT_INFO_ADDRESS_SUCCESS_MSG);
        setTimeout(() => {
          this.clearFormMsg();
          this.completeRegister.emit();
        }, 3000);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  /**
   * Validate form values
   *
   * @return error message
   */
  validateFormValues(): string {
    // Required line1
    if (!this.addressInputForm.controls[ADDRESS_INPUT_FORM.LINE1.KEY].value) {
      return FORM_FIELD_REQUIRED_MSG;
    }

    // Required city
    if (!this.addressInputForm.controls[ADDRESS_INPUT_FORM.CITY.KEY].value) {
      return FORM_FIELD_REQUIRED_MSG;
    }

    // Required state
    if (!this.addressInputForm.controls[ADDRESS_INPUT_FORM.STATE.KEY].value) {
      return FORM_FIELD_REQUIRED_MSG;
    }

    // Required country
    if (!this.addressInputForm.controls[ADDRESS_INPUT_FORM.COUNTRY.KEY].value) {
      return FORM_FIELD_REQUIRED_MSG;
    }

    return '';
  }

  resetForm() {
    let address: IAddressModel = {
      line1: '',
      line2: '',
      city: '',
      state: '',
      country: '',
    };
    this.setFormValues(address);
  }

  /**
   * Create task object by form values
   *
   * @return task object
   */
  getFormValues(): IAddressModel {
    let address: IAddressModel = {
      line1: this.addressInputForm.controls[ADDRESS_INPUT_FORM.LINE1.KEY].value ? this.addressInputForm.controls[ADDRESS_INPUT_FORM.LINE1.KEY].value! : '',
      line2: this.addressInputForm.controls[ADDRESS_INPUT_FORM.LINE2.KEY].value ? this.addressInputForm.controls[ADDRESS_INPUT_FORM.LINE2.KEY].value! : '',
      city: this.addressInputForm.controls[ADDRESS_INPUT_FORM.CITY.KEY].value ? this.addressInputForm.controls[ADDRESS_INPUT_FORM.CITY.KEY].value! : '',
      state: this.addressInputForm.controls[ADDRESS_INPUT_FORM.STATE.KEY].value ? this.addressInputForm.controls[ADDRESS_INPUT_FORM.STATE.KEY].value! : '',
      country: this.addressInputForm.controls[ADDRESS_INPUT_FORM.COUNTRY.KEY].value
        ? this.addressInputForm.controls[ADDRESS_INPUT_FORM.COUNTRY.KEY].value!
        : '',
    };
    return address;
  }

  /**
   * Show form message
   *
   * @param type: type of message
   * @param msg: content of message
   */
  showFormMsg(type: string, msg: string) {
    this.formMsgType.set(type);
    this.formMsg.set(msg);
    this.isShowFormMsg.set(true);
    setTimeout(() => {
      this.clearFormMsg();
    }, 3000);
  }

  /**
   * Clear form message
   *
   */
  clearFormMsg() {
    this.formMsgType.set('');
    this.formMsg.set('');
    this.isShowFormMsg.set(false);
  }
}
