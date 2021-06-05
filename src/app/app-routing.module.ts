import { PersonaComponent } from './pages/persona/persona.component';
import { TipoDocComprobanteComponent } from './pages/tipo-doc-comprobante/tipo-doc-comprobante.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TipoDocumentoIdentidadComponent } from './pages/tipo-documento-identidad/tipo-documento-identidad.component';
import { ProductoComponent } from './pages/producto/producto.component';
import { VentaComponent } from './pages/venta/venta.component';


const routes: Routes = [ 

{
  path:'tipodocumento', component:TipoDocumentoIdentidadComponent
},

{
  path:'tipo-comprobante', component:TipoDocComprobanteComponent
},

{
  path:'persona', component:PersonaComponent
},

{
  path:'producto', component:ProductoComponent
},

{
  path:'venta', component:VentaComponent
}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
