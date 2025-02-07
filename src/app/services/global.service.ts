import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GlobalService {
  public editStatus: boolean = false;
  // public filtro: string = 'all';
  public jwtToken : string = '';
  public ApiUrl: string = 'http://127.0.0.1:8000/api';
  public imgUrl: string = 'http://127.0.0.1:8000'

  private filtroSubject = new BehaviorSubject<string>('all');
  filtro$ = this.filtroSubject.asObservable();

  get filtro(): string {
    return this.filtroSubject.value;
  }
  
  //Actualizar variable
  setTitle(Status: boolean) {
    this.editStatus = Status;
  }
  setToken(token:string){
    this.jwtToken = `Bearer ${token}`;
  }
  setFiltro(filter: string){
    this.filtroSubject.next(filter);
  }
}
