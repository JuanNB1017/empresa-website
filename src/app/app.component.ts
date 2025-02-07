import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { IndexComponent } from './components/index/index.component';
import { MenuComponent } from './components/menu/menu.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet,IndexComponent,MenuComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'empresa-website';
  filtroSeleccionado: string = 'all';
}
