import 'zone.js';

import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter, RouteReuseStrategy } from '@angular/router';
import { routes } from './app/routes';
import { App } from './app/app';
import { importProvidersFrom } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { provideHttpClient } from '@angular/common/http';
import { AppInitializerProvider } from './app/app-initializer.service';
import { NZ_I18N, zh_CN } from 'ng-zorro-antd/i18n';
import { CustomReuseStrategy } from './CustomReuseStrategy';

bootstrapApplication(App, {
  providers: [
    importProvidersFrom(BrowserAnimationsModule),
    provideRouter(routes),
    provideHttpClient(),
    { provide: RouteReuseStrategy, useClass: CustomReuseStrategy },
    AppInitializerProvider,
    { provide: NZ_I18N, useValue: zh_CN },
  ],
}).catch((err) => console.error(err));
