import { Component, OnInit, Input,OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule, NgFor } from '@angular/common';
import { CardComponent } from '../card/card.component';
import { LoginWidgetComponent } from '../login-widget/login-widget.component';
import { RegisterWidgetComponent } from '../register-widget/register-widget.component';
import { SocketService } from '../../services/server.service';
import { EditWidgetComponent } from '../edit-widget/edit-widget.component';
import { GlobalService } from '../../services/global.service';

@Component({
  selector: 'app-index',
  standalone: true,
  imports: [CardComponent, NgFor, CommonModule, LoginWidgetComponent, RegisterWidgetComponent,EditWidgetComponent],
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit {
  colaboradores: any[] = [];
  mostrarLogin: boolean = true;
  mostrarRegistro: boolean = false;
  mostrarEdit: boolean = false;
  colaboradorSeleccionado: any = null;
  nuevoColaborador = false;
  filtroActual: string = 'all';
  mostrarNotificacion: boolean = false;

  @Input() filtro: string = 'all';

  constructor(private socketService: SocketService, private globalService : GlobalService) {
    this.verificarSesion();
  }

  
  ngOnInit() {
    this.obtenerColaboradores(); 
  
    // 🔴 Escuchar cambios en el filtro global
    this.globalService.filtro$.subscribe(nuevoFiltro => {
      console.log("📢 Filtro cambiado en el servicio global:", nuevoFiltro);
      this.obtenerColaboradores();
    });

    // 🎯 Escuchar cambios en la base de datos para mostrar la notificación
    this.socketService.recibirCambios().subscribe(() => {
      this.mostrarNotificacion = true;

      // Ocultar la notificación después de 5 segundos
      setTimeout(() => {
        this.mostrarNotificacion = false;
      }, 5000);
    });
  }

  cerrarNotificacion() {
    this.mostrarNotificacion = false;
  }

  obtenerColaboradores() {
    const filtro = this.globalService.filtro; // Asegurar que tomamos el filtro actualizado
    console.log("Obteniendo colaboradores con filtro:", filtro);
    
    this.socketService.recibirColaboradores(filtro).subscribe(data => {
      if (this.globalService.filtro === filtro) { // Evitar datos obsoletos si el filtro cambió
        this.colaboradores = Array.isArray(data.data) ? data.data : [];
      }
    });
  }

  verificarSesion() {
    const token = localStorage.getItem('token');
    if (token) {
      this.mostrarLogin = false;
      this.mostrarRegistro = false;
    }
  }

  cambiarARegistro() {
    this.mostrarLogin = false;
    this.mostrarRegistro = true;
  }

  cambiarALogin() {
    this.mostrarLogin = true;
    this.mostrarRegistro = false;
  }

  mostraEditWidget(colaborador: any) {
    this.nuevoColaborador = false; // Modo edición
    this.colaboradorSeleccionado = colaborador;
    this.mostrarEdit = true;
  }  
  
  mostrarAgregarWidget() {
    console.log('Le dio click');
    this.nuevoColaborador = true; // Activa el modo de registro
    this.colaboradorSeleccionado = {
      nombre_completo: "",
      empresa: "",
      area: "",
      departamento: "",
      puesto: "",
      estatus: "activo",
      fecha_alta: new Date().toISOString().slice(0, 10),
      fotografia: ""
    };
    this.mostrarEdit = true; // Muestra el widget de edición en modo "nuevo"
  }

  cerrarEditWidget() {
    this.mostrarEdit = false;
  }  

  
}
