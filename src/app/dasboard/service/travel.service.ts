import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { TravelResponse } from '../interface/travelResponse';
import { Observable, throwError } from 'rxjs';
import {UserRegister} from '../interface/UserResgister'
@Injectable({
  providedIn: 'root'
})
export class TravelService {

  constructor(private http:HttpClient) { }
 //Trae viajes disponibles

  getTravels(idTravel:number):Observable<TravelResponse[]>{
    return this.http.get<TravelResponse[]>(`/api/Travel/1/${idTravel}`)
  }
  //cambiar viaje
  
  changeTravels(idCadet:string,travelId:string,idUser:string,Reasigned:Boolean,status:string,body:TravelResponse[]){
    return this.http.post<TravelResponse>(`/api/Travel?travelId=${travelId}&statusTravel=${status}&userOperation=${idUser}&cadeteId=${idCadet}&isReasigned=${Reasigned}`,body)
  }

//crea modifica usuarios

createUser(user:UserRegister):Observable<UserRegister>{
  return this.http.post<UserRegister>('/api/Users',user)
}
//traer ususarios
getUsers():Observable<UserRegister[]>{
  return this.http.get<UserRegister[]>('/api/Users?userOperation=1')
}



}
