import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CattleListService {

  baseUrl: string = "http://localhost:3000/cattle";

  constructor(private http: HttpClient) {
  }

  getAllList():Observable<any> {
    return this.http.get(this.baseUrl);
  }
  createList(data:any): Observable<any> {
    return this.http.post(this.baseUrl, data);
  }
  onDeleted(id:string):Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}`);
  }
  onEdit(id:string):Observable<any> {
    return this.http.get(`${this.baseUrl}/${id}`);
  }
  updateList(id: string, updatedList: any): Observable<any> {
    return this.http.put(`${this.baseUrl}/${id}`, updatedList);
  }
}
