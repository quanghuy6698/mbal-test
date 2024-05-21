import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { HttpUtil } from '../util/http.util';

@Injectable({
  providedIn: 'root',
})
export class HttpService {
  private readonly baseUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) {}

  getData(path: string, param?: any, auth: boolean = false, contentType?: string): Observable<any> {
    let doOption = HttpUtil.buildGetOption(param, auth, contentType);

    return this.http.get(`${this.baseUrl}/${path}`, doOption);
  }

  postData(path: string, body?: any, auth: boolean = false, contentType?: string): Observable<any> {
    let doOption = HttpUtil.buildPostOption(auth, contentType);

    return this.http.post(`${this.baseUrl}/${path}`, body, doOption);
  }
}
