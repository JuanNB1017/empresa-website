import { Injectable } from '@angular/core';
import { io, Socket } from 'socket.io-client';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SocketService {
  private socket: Socket;

  constructor() {
    this.socket = io("http://localhost:3000", { autoConnect: false });

    this.socket.on("connect", () => {
      console.log("✅ Conectado a Socket.io");
    });

    this.socket.on("disconnect", () => {
      console.log("❌ Desconectado de Socket.io");
    });

    this.socket.connect();
  }

  // Escucha cambios en la lista de colaboradores
    // Escuchar cambios en la lista de colaboradores con filtro
  recibirColaboradores(filtro: string): Observable<any> {
    return new Observable(observer => {
      this.socket.emit("filtrarColaboradores", filtro); // Enviar filtro al servidor

      this.socket.on("actualizarColaboradores", (data) => {
        console.log("📥 Datos recibidos en Angular:", data);
        observer.next(data);
      });
    });
  }

  // Solicitar lista filtrada al servidor vía socket
  solicitarColaboradores(filtro: string) {
    console.log(`Enviando solicitud de colaboradores con filtro: ${filtro}`);
    this.socket.emit("obtenerColaboradores", { filtro });
  }

  // Escuchar notificaciones de cambios en la base de datos
recibirCambios(): Observable<any> {
  return new Observable(observer => {
    this.socket.on("cambioDetectado", () => {
      console.log("Notificación recibida: Se detectó un cambio en los colaboradores.");
      observer.next();
    });
  });
}


}
