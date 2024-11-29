import { Routes } from '@angular/router';
import { HomeComponent } from './componentes/home/home.component';
import { FooterComponent } from './componentes/footer/footer.component';
import { ShopComponent } from './componentes/shop/shop.component';
import { DetailComponent } from './componentes/detail/detail.component';
import { WellcomeComponent } from './componentes/wellcome/wellcome.component'; // Importa WellcomeComponent

export const routes: Routes = [
    { path: '', component: WellcomeComponent },  // Ruta raíz para mostrar "wellcome" como pantalla de inicio
    { path: 'work', component: HomeComponent },  // Ruta para "work"
    { path: 'contact', component: FooterComponent },  // Ruta para "contact" en footer
    { path: 'shop', component: ShopComponent },  // Ruta para "shop"
    { path: 'detail/:id', component: DetailComponent }, // Ruta para el detalle de un proyecto.
    { path: '**', redirectTo: ''}, // Ruta por defecto
];
