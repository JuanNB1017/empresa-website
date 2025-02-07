import { NgIf } from '@angular/common';
import { Component, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-edit-widget',
  imports: [NgIf,FormsModule, ReactiveFormsModule],
  standalone: true,
  templateUrl: './edit-widget.component.html',
  styleUrl: './edit-widget.component.css'
})
export class EditWidgetComponent implements OnChanges {
  editForm: FormGroup;

  @Input() isVisible: boolean = true;
  @Input() colaborador: any;
  @Input() nuevo: boolean = false;
  @Input() nuevoColaborador: boolean = false; // Saber si es nuevo
  @Output() irEdit = new EventEmitter<void>();

  constructor(private fb: FormBuilder, private http: HttpClient, private apiService: ApiService) {
    this.editForm = this.fb.group({
      nombre_completo: ['', Validators.required],
      empresa: ['', Validators.required],
      area: ['', Validators.required],
      departamento: ['', Validators.required],
      puesto: ['', Validators.required],
      fotografia: [''],
      fecha_alta: ['', Validators.required],
      estatus: ['', Validators.required]
    });
  }

  // Se ejecuta cuando cambia el input "colaborador"
  ngOnChanges(changes: SimpleChanges) {
    if (changes['colaborador'] && this.colaborador) {
      this.editForm.patchValue({
        nombre_completo: this.colaborador.nombre_completo || '',
        empresa: this.colaborador.empresa || '',
        area: this.colaborador.area || '',
        departamento: this.colaborador.departamento || '',
        puesto: this.colaborador.puesto || '',
        fotografia: this.colaborador.fotografia || '',
        fecha_alta: this.colaborador.fecha_alta || '',
        estatus: this.colaborador.estatus || 'activo'
      });
    }
  }

  actualizarORegistrar() {
    if (this.editForm.invalid) {
      console.warn("⚠️ Formulario inválido. Completa todos los campos.");
      return;
    }

    if (this.nuevoColaborador) {
      this.registrarColaborador();
    } else {
      this.actualizarColaborador();
    }
  }

  actualizarColaborador() {
    if (!this.colaborador || !this.colaborador.id) {
      console.error("❌ No hay colaborador seleccionado.");
      return;
    }

    const colaboradorActualizado = { ...this.colaborador, ...this.editForm.value };

    this.apiService.actualizarColaborador(this.colaborador.id, colaboradorActualizado).subscribe({
      next: (response) => {
        console.log("✅ Colaborador actualizado:", response);
        this.cerrarWidget();
      },
      error: (err) => {
        console.error("❌ Error al actualizar:", err);
      }
    });
  }

  registrarColaborador() {
    const nuevoColaborador = { ...this.editForm.value };
    console.log(nuevoColaborador)
    this.apiService.registrarColaborador(nuevoColaborador).subscribe({
      next: (response) => {
        console.log("✅ Colaborador registrado:", response);
        this.cerrarWidget();
      },
      error: (err) => {
        console.error("❌ Error al registrar:", err);
      }
    });
  }

  cerrarWidget() {
    this.irEdit.emit();
  }

  subirImagen(event: any) {
    const file = event.target.files[0];
    if (file) {
      // Generar una URL temporal de la imagen
      const imageUrl = URL.createObjectURL(file);
      
      // Validar que la URL no supere los 255 caracteres
      if (imageUrl.length > 255) {
        console.error("❌ La URL de la imagen es demasiado larga (máx. 255 caracteres).");
        alert("La imagen seleccionada es demasiado grande. Por favor, elige otra.");
        return;
      }
  
      // Actualizar el formulario y la previsualización con la URL
      this.editForm.patchValue({ fotografia: imageUrl });
      this.colaborador.fotografia = imageUrl;
    }
  }
  
  
}