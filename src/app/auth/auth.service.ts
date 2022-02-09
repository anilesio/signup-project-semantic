import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  baseURL = "http://localhost:5040"

  constructor(private http : HttpClient) { }

  getGenero(){
    return this.http.get<any>(`${this.baseURL}/genero`).pipe(map((res : any) => {
      return res
    }))
  }

  create(data:any){
    return this.http.post<any>(`${this.baseURL}/signup`, data).pipe(map((res :any) => {
      return res
    }))
  }

  getUser(){
    return this.http.get<any>(`${this.baseURL}/signup`).pipe(map((data :any) => {
      return data
    }))
  }
}
