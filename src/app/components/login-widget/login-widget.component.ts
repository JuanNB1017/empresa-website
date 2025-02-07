import { NgIf } from '@angular/common';
import { Component,Input,Output, EventEmitter } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { FormsModule } from '@angular/forms';
import { GlobalService } from '../../services/global.service';

@Component({
  selector: 'app-login-widget',
  imports: [NgIf,FormsModule],
  standalone: true,
  templateUrl: './login-widget.component.html',
  styleUrl: './login-widget.component.css'
})
export class LoginWidgetComponent {

  email: string = '';
  password: string = '';
  errorMessage: string = '';

  @Input() isVisible: boolean = true;
  @Output() irARegistro = new EventEmitter<void>();

  constructor(private authService: AuthService, private globalService:GlobalService) {}

  iniciarSesion() {
    this.authService.login(this.email, this.password).subscribe({
      next: (response) => {
        console.log('✅ Login exitoso:', response);
        this.globalService.setToken(response.access_token);
        localStorage.setItem('token', response.access_token); // Guardar el token
        this.isVisible = false;
      },
      error: (error) => {
        console.error('❌ Error al iniciar sesión:', error);
        this.errorMessage = 'Credenciales incorrectas';
      }
    });
  }

  mostrarRegistro() {
    this.irARegistro.emit(); // Dispara evento para cambiar a registro
  }

  ocultarWidget() {
    this.isVisible = false;
  }

}
