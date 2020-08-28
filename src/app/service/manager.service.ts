import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Manager } from '@models/manager';

import { environment } from 'environments/environment';
import { CustomHttpResponse, Credential, AuthToken } from '@models/common';

@Injectable({
  providedIn: 'root'
})
export class ManagerService {

  constructor(private http: HttpClient) { }

  public signup(manager: Manager) {
    return this.http.post<CustomHttpResponse<string>>(environment.SIGNUP, manager)
  }

  public login(credential: Credential) {
    return this.http.post<CustomHttpResponse<AuthToken>>(environment.LOGIN, credential)
  }

}
