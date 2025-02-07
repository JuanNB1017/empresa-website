import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { GlobalService } from './global.service';

@Injectable({
  providedIn: 'root'
})
export class ApiService {


  constructor(private http: HttpClient, private globalService: GlobalService) {}

  actualizarColaborador(id: number, datos: any): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': this.globalService.jwtToken
    });

    return this.http.put(`${this.globalService.ApiUrl}/update-colaborator-info/${id}`, datos, { headers });
  }

  deleteColaborator(id: number) {
    const headers = new HttpHeaders({
      'Authorization': this.globalService.jwtToken
    });
    return this.http.delete(`${this.globalService.ApiUrl}/delete-colaborator/${id}`,{ headers });
  }

  registrarColaborador(datos: any): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': this.globalService.jwtToken
    });
    console.log(headers)
  
    return this.http.post(`${this.globalService.ApiUrl}/create-colaborator`, datos, { headers });
  }
  

}
