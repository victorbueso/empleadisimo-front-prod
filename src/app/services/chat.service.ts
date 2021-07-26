import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  url = "https://empleadisimo.herokuapp.com/usuarios";
  idChat = ""; 

  constructor(
    private httpClient: HttpClient
  ) {}

  messageSeen(idUser : string, user : any) : Observable<any>{
    return this.httpClient.put(`https://empleadisimo.herokuapp.com/usuarios/messageSeen/${idUser}`, user);
  }

}
