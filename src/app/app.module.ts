import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

// Imports PrimeNG
// Imports PrimeNG
import {TableModule} from 'primeng/table';
import {ConfirmDialogModule} from 'primeng/confirmdialog';
import {ToastModule} from 'primeng/toast';
import {DialogModule} from 'primeng/dialog';
import {ConfirmationService, MessageService} from 'primeng/api';
import {CalendarModule} from 'primeng/calendar';
import {DropdownModule} from 'primeng/dropdown';
import {AutoCompleteModule} from 'primeng/autocomplete';
import {DataViewModule} from 'primeng/dataview';
import {PanelModule} from 'primeng/panel';
import {SpinnerModule} from 'primeng/spinner';
import {FileUploadModule} from 'primeng/fileupload';
import {TabViewModule} from 'primeng/tabview';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { LoginService } from './login/login.service';
import { MenuComponent } from './menu/menu.component';
import { PrincipalComponent } from './principal/principal.component';
import { CasoComponent } from './caso/caso.component';

import { CasoSimilaridadeService } from './casoSimilaridade/casoSimilaridade.service';
import { CasoService } from './caso/caso.service';
import { LoginModule } from './login/login.module';
import { CasoSimilaridadeComponent } from './casoSimilaridade/casoSimilaridade.component';
import { UsuarioComponent } from './usuario/usuario.component';
import { UsuarioService } from './usuario/usuario.service';

import {MatButtonModule} from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
import {MatDialogModule} from '@angular/material/dialog';

import { HttpClientInterceptor } from './http-client-interceptor';

@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    PrincipalComponent,
    CasoSimilaridadeComponent,
    CasoComponent,
    UsuarioComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,

    TableModule,
    ConfirmDialogModule,
    ToastModule,
    DialogModule,
    CalendarModule,
    DropdownModule,
    AutoCompleteModule,
    DataViewModule,
    PanelModule,
    SpinnerModule,
    FileUploadModule,
    TabViewModule,
    LoginModule,
    MatButtonModule,
    MatInputModule,
    MatDialogModule
  ],
  providers: [
    CasoSimilaridadeService,
    ConfirmationService,
    MessageService,
    CasoService,
    LoginService,
    UsuarioService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpClientInterceptor,
      multi: true
    },
    
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
