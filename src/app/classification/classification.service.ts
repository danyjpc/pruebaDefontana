import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Classification } from './classification';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ClassificationService {

  constructor(private http: HttpClient) { }

  getClassification(){
    return this.http.get<any>(`${environment.baseURLAPI}`)
  }
}
