import { CommonModule } from '@angular/common';
import { Component,EventEmitter,Input, Output } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiService } from '../../services/api.service';
import { GlobalService } from '../../services/global.service';

@Component({
  selector: 'app-card',
  imports: [CommonModule],
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css'],
  standalone: true
})

export class CardComponent {
  @Input() colaborador: any;
  @Output() editar = new EventEmitter<void>();

  constructor(private http: HttpClient, private apiService: ApiService, private globalService:GlobalService) {}

  editarColaborador() {
    this.editar.emit(this.colaborador); // Activa el widget de edición
  }

  eliminar(id: number) {
    if (confirm('¿Estás seguro de que deseas eliminar este colaborador?')) {
      this.apiService.deleteColaborator(id).subscribe(() => {
        this.colaborador = this.colaborador.filter((col : any) => col.id !== id);
      });
    }
  }

  imagenError(event: Event) {
    (event.target as HTMLImageElement).src = 'assets/img/nophoto.jpg';
  }

  getFoto(): string {
    if (this.colaborador.fotografia && this.colaborador.fotografia.trim() !== '') {
      // Si la ruta ya es absoluta (URL completa), la devolvemos directamente
      if (this.colaborador.fotografia.startsWith('http')) {
        return this.colaborador.fotografia;
      }
      
      // Si la ruta es relativa, agregar el dominio base y la carpeta pública
      return `${this.globalService.imgUrl}/storage/colaboradores/${this.colaborador.fotografia}`;
    }
  
    // Imagen por defecto
    return 'assets/img/nophoto.jpg';
  }
  

  
}
