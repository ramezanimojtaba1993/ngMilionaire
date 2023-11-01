import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { Login, Register } from '../../model/User.model';
import { StorageService } from '../../services/storage.service';
import { Router } from "@angular/router";

@Injectable({
	providedIn: 'root',
})
export class AuthService {
	private baseUrl = 'http://185.226.118.199:8000/users';

	constructor(private router: Router, private http: HttpClient, private storageService: StorageService) {}

	register(user: Register) {
		return this.http.post<any>('http://localhost:3000/users', user);
	}

  login({ email, password }: Login): Observable<Login> {
    return this.http.get<any>(`https://jsonserver.mitra-english.ir/users?password=${password}&email=${email}`);
  }

  logout(): void {
    this.storageService.removeItem('token');
    this.router.navigate(['login']);
  }

  isLoggedIn(): boolean {
    return !!this.storageService.getItem('token');
  }
}
