/* Copyright (c) Think Blue Data 2017. All Rights Reserved. */

/**
 * Designed for Loopback related queries.
 * Hence, used this only if you are using loopback API
 */
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable()
export class AppService {

  providedIn : 'root'
  protected baseURL: string = 'http://13.250.124.7/new/api.php';
  protected model: string;
  private apiURL: string;
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json',
      // 'Authorization': 'Basic ' + 'aGFud2luc3RlckBnbWFpbC5jb206M2UxNjUyRDcwbTg2ODk5MDcwaTBOYWo0NXU5MmNjVUs='
      'Authorization': 'Basic ' + 'YWRtaW5AeWVzc3MuY29tLm1tOmYxM202d2pGMjE3MDMwMmM3TzBrNjY5ajQxNEo2bDRZ'

    })
  };

  constructor(
    protected http: HttpClient
  ) {
  }

  public setModel(model: string): void {
    this.model = model;
    this.apiURL = this.baseURL + '?_d=' + this.model;
  }

  public getBaseURL(): string {
    return this.baseURL;
  }

  public getPath(): string {
    return this.apiURL;
  }

  public getAll(page: number = 1, itemsPerPage: number = 10): Observable<any>  {
    return this.http.get(this.apiURL + '&' + 'page=' + page + '&' + 'items_per_page=' + itemsPerPage, this.httpOptions);
  }

  public getAllWithoutParams(): Observable<any>  {
    return this.http.get(this.apiURL, this.httpOptions);
  }

  public getOptionByQueryString(queryString: string) {
    return this.http.get("http://13.250.124.7/new/api.php?_d=" + queryString, this.httpOptions);
  }

  public createOptions(data: any): Observable<any> {
    return this.http.post("http://13.250.124.7/new/api.php?_d=options", data, this.httpOptions);
  }

  public getByQueryString(queryString: string) {
    return this.http.get(this.apiURL + '&' + queryString, this.httpOptions);
  }

  public create(data: any): Observable<any> {
    return this.http.post(this.apiURL, data, this.httpOptions);
  }

  public edit(id:any, data: any): Observable<any> {
    return this.http.put(this.apiURL + '/' + id, data, this.httpOptions);
  }

  public delete(id: any): Observable<any> {
    const deleteHttpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'raw',
        'Authorization': 'Basic ' + 'YWRtaW5AeWVzc3MuY29tLm1tOmYxM202d2pGMjE3MDMwMmM3TzBrNjY5ajQxNEo2bDRZ'
      })
    };
    return this.http.delete(this.apiURL + '/' + id, deleteHttpOptions);
  }

  public get(id: any): Observable<any> {
    return this.http.get(this.apiURL + '/' + id, this.httpOptions);
  }
}
