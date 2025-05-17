import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { appConfig } from './app/app.config';
import { registerLocaleData } from '@angular/common';
import en from '@angular/common/locales/en';
import {importProvidersFrom, LOCALE_ID} from '@angular/core';
import { NZ_I18N, en_US } from 'ng-zorro-antd/i18n';
import {NzModalModule} from 'ng-zorro-antd/modal';
import {provideHttpClient} from '@angular/common/http';

registerLocaleData(en);

bootstrapApplication(AppComponent, {
  ...appConfig,
  providers: [
    ...(appConfig.providers || []),
    { provide: LOCALE_ID, useValue: 'en-US' },
    { provide: NZ_I18N, useValue: en_US },
    importProvidersFrom(NzModalModule),
    provideHttpClient(),
  ]
}).catch(err => console.error(err));

