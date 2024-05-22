import { Component, EventEmitter, OnInit, Output, signal } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { FormMsgCmp } from '../form-msg/form-msg.cmp';
import { INFO_INPUT_FORM } from '../../constant/form.const';
import {
  FORM_FIELD_REQUIRED_MSG,
  FORM_NAME_INCORRECT_FORMAT_MSG,
  MESSAGE_TYPES,
  SOME_PROBLEM_HAS_OCCURED_MSG,
  SUBMIT_INFO_SUCCESS_MSG,
} from '../../constant/message.const';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import { NzFlexModule } from 'ng-zorro-antd/flex';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { IInfoModel } from '../../model/info.model';
import { HttpService } from '../../service/http.service';
import { ApiConst } from '../../constant/api.const';

@Component({
  selector: 'info-input-form-cmp',
  templateUrl: './info-input-form.cmp.html',
  styleUrls: ['./info-input-form.cmp.css'],
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, NzFormModule, NzInputModule, NzDatePickerModule, NzButtonModule, NzFlexModule, FormMsgCmp],
})
export class InfoInputFormCmp implements OnInit {
  @Output('showAddressForm') showAddressForm = new EventEmitter<void>();

  infoInputForm = this.formBuilder.group({
    [INFO_INPUT_FORM.NAME.KEY]: ['', [Validators.required, Validators.pattern('^[a-zA-Z ]+$')]],
    [INFO_INPUT_FORM.DOB.KEY]: ['', [Validators.required]],
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
  setFormValues(info: IInfoModel) {
    this.infoInputForm.controls[INFO_INPUT_FORM.NAME.KEY].setValue(info.name);
    this.infoInputForm.controls[INFO_INPUT_FORM.DOB.KEY].setValue(info.dob);
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

    this.submitInfo();
  }

  submitInfo() {
    let formValues = this.getFormValues();
    this.httpSvc.postData(ApiConst.API_INFO, formValues, false).subscribe({
      next: (value) => {
        if (value) {
          this.showFormMsg(MESSAGE_TYPES.SUCCESS, SUBMIT_INFO_SUCCESS_MSG);
          setTimeout(() => {
            this.clearFormMsg();
            this.showAddressForm.emit();
          }, 3000);
        } else {
          this.showFormMsg('error', SOME_PROBLEM_HAS_OCCURED_MSG);
        }
      },
      error: (err) => {
        this.showFormMsg('error', SOME_PROBLEM_HAS_OCCURED_MSG);
      },
    });
  }

  /**
   * Validate form values
   *
   * @return error message
   */
  validateFormValues(): string {
    // Required name
    if (this.infoInputForm.get(INFO_INPUT_FORM.NAME.KEY)?.errors?.['required']) {
      return FORM_FIELD_REQUIRED_MSG;
    }

    // Name incorrect format
    if (this.infoInputForm.get(INFO_INPUT_FORM.NAME.KEY)?.errors?.['pattern']) {
      return FORM_NAME_INCORRECT_FORMAT_MSG;
    }

    // Required date of birth
    if (this.infoInputForm.get(INFO_INPUT_FORM.DOB.KEY)?.errors) {
      return FORM_FIELD_REQUIRED_MSG;
    }

    return '';
  }

  resetForm() {
    let info: IInfoModel = {
      name: '',
      dob: new Date().toISOString().split('T')[0],
    };
    this.setFormValues(info);
  }

  /**
   * Create info object by form values
   *
   * @return info object
   */
  getFormValues(): IInfoModel {
    let doDob: Date;
    let dobValue = this.infoInputForm.controls[INFO_INPUT_FORM.DOB.KEY].value ? this.infoInputForm.controls[INFO_INPUT_FORM.DOB.KEY].value?.toString() : '';
    if (dobValue) {
      doDob = new Date(dobValue);
    } else {
      doDob = new Date();
    }

    let info: IInfoModel = {
      name: this.infoInputForm.controls[INFO_INPUT_FORM.NAME.KEY].value ? this.infoInputForm.controls[INFO_INPUT_FORM.NAME.KEY].value! : '',
      dob: doDob?.toISOString().split('T')[0],
    };
    return info;
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
