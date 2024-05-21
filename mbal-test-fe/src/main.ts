import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppCmp } from './app/app.cmp';
import en from '@angular/common/locales/en';
import { registerLocaleData } from '@angular/common';

registerLocaleData(en);

bootstrapApplication(AppCmp, appConfig).catch((err) => console.error(err));
