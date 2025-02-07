import { Component, Input,Output, EventEmitter } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-register-widget',
  imports: [NgIf,FormsModule],
  templateUrl: './register-widget.component.html',
  styleUrl: './register-widget.component.css'
})
export class RegisterWidgetComponent {

  name: string = '';
  email: string = '';
  password: string = '';
  errorMessage: string = '';

  @Input() isVisible: boolean = false; // Inicialmente oculto
  @Output() irALogin = new EventEmitter<void>();

  constructor(private authService: AuthService) {}

  registrarse() {
    this.authService.register(this.name, this.email, this.password).subscribe({
      next: (response) => {
        console.log('✅ Registro exitoso:', response);
        alert('Registro exitoso, ahora inicia sesión');
        this.irALogin.emit();
      },
      error: (error) => {
        console.error('❌ Error en el registro:', error);
        this.errorMessage = 'Error al registrarse';
      }
    });
  }

  volverALogin() {
    this.irALogin.emit(); // Dispara evento para regresar al login
  }
  
  registrarUsuario() {
    console.log("Usuario registrado (esto se conectará con una API más adelante)");
    this.isVisible = false; // Oculta el registro después de registrar
  }
}
