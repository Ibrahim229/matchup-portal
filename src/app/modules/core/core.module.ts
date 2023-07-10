// Modules
import { NgModule } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { CommonModule } from '@angular/common';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { MaterialModule } from '../shared/material/material.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// Components
import { ContentLayoutComponent } from './components/content-layout/content-layout.component';
import { SideNavComponent } from './components/side-nav/side-nav.component';
import { MenuItemsComponent } from './components/menu-items/menu-items.component';
import { DynamicLoaderComponent } from './components/dynamic-loader/dynamic-loader.component';

// Services
import { TranslationService } from './services/translation/translation.service';
import { HeaderComponent } from './components/header/header.component';
import { SharedModule } from '../shared/shared.module';
import { RolesGuard } from './guards/roles.guard';

@NgModule({
  declarations: [
    ContentLayoutComponent,
    SideNavComponent,
    MenuItemsComponent,
    DynamicLoaderComponent,
    HeaderComponent,
  ],
  imports: [
    HttpClientModule,
    CommonModule,
    RouterModule,
    MaterialModule,
    SharedModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: createTranslateLoader,
        deps: [HttpClient],
      },
    }),
  ],
  exports: [DynamicLoaderComponent, ContentLayoutComponent,TranslateModule],
  providers: [RolesGuard,TranslationService],
})
export class CoreModule {}

export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, 'assets/i18n/', '.json');
}
