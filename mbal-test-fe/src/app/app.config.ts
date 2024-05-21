import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';
import { appRoute } from './app.route';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzFlexModule } from 'ng-zorro-antd/flex';
import { provideHttpClient } from '@angular/common/http';
import { provideAnimations } from '@angular/platform-browser/animations';
import { NZ_ICONS } from 'ng-zorro-antd/icon';
import { CalendarOutline } from '@ant-design/icons-angular/icons';
import { NZ_I18N, en_US } from 'ng-zorro-antd/i18n';

const icons = [CalendarOutline];

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(appRoute),
    provideHttpClient(),
    provideAnimations(),
    { provide: NZ_ICONS, useValue: icons },
    { provide: NZ_I18N, useValue: en_US },
    importProvidersFrom([NzFormModule, NzInputModule, NzDatePickerModule, NzButtonModule, NzFlexModule]),
  ],
};
