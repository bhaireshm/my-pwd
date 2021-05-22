import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Response } from '../models/response.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}

  login(data: any) {
    return this.http.post<Response>(`${environment.baseUrl}/login`, data);
  }

  register(data: any) {
    return this.http.post(`${environment.baseUrl}/register`, data);
  }

  forgotPassword(data: any) {
    return this.http.post(`${environment.baseUrl}/forgot-password`, data);
  }
}
