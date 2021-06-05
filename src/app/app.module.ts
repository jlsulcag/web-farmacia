import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { MaterialModule } from './material/material.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { PersonaComponent } from './pages/persona/persona.component';
import { TipoDocumentoIdentidadComponent } from './pages/tipo-documento-identidad/tipo-documento-identidad.component';
import { SidenavComponent } from './pages/sidenav/sidenav.component';
import { MatCardModule } from '@angular/material/card';
import { TipodocumentodialogComponent } from './pages/tipo-documento-identidad/tipodocumentodialog/tipodocumentodialog.component';
import { PersonadialogComponent } from './pages/persona/personadialog/personadialog.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { TipoDocComprobanteComponent } from './pages/tipo-doc-comprobante/tipo-doc-comprobante.component';
import { ProductoComponent } from './pages/producto/producto.component';
import { VentaComponent } from './pages/venta/venta.component';
import { TipoDocComprobanteDialogComponent } from './pages/tipo-doc-comprobante/tipo-doc-comprobante-dialog/tipo-doc-comprobante-dialog.component';

@NgModule({
  declarations: [
    AppComponent,
    PersonaComponent,
    TipoDocumentoIdentidadComponent,
    SidenavComponent,
    TipodocumentodialogComponent,
    PersonadialogComponent,
    TipoDocComprobanteComponent,
    ProductoComponent,
    VentaComponent,
    TipoDocComprobanteDialogComponent
  ],
  /*entryComponents sirve  para que pueda abrir el dialogo dentro de otra pagina embebida*/ 
  entryComponents: [
    TipodocumentodialogComponent,
    PersonadialogComponent,
    TipoDocComprobanteDialogComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MaterialModule,
    HttpClientModule,
    ReactiveFormsModule, /*Habilita  la caracteristica de formularios reactivos*/
    FormsModule,
    FlexLayoutModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
