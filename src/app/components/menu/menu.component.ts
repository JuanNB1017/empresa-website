import { Component, Output, EventEmitter } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { GlobalService } from '../../services/global.service';
import { SocketService } from '../../services/server.service';

@Component({
  selector: 'app-menu',
  imports: [],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.css'
})
export class MenuComponent {
  @Output() filtrarColaboradores = new EventEmitter<string>();
  
  filtroSeleccionado: string = 'all';

  constructor(private authService: AuthService, private globalService:GlobalService,private socketService: SocketService) {}
  

  seleccionarFiltro(filtro: string) {
    console.log("Nuevo filtro seleccionado:", filtro);
    this.globalService.setFiltro(filtro); // Actualiza la variable global
    
    // 🔴 Enviar el filtro al socket para obtener nuevos datos
    this.socketService.solicitarColaboradores(filtro);
  }

  cerrarSesion() {
    this.authService.logout().subscribe({
      next: () => {
        localStorage.removeItem('token');
        location.reload();
      },
      error: (err) => {
        console.error('Error cerrando sesión:', err);
        localStorage.removeItem('token');
        location.reload();
      }
    });
  }
}
