import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

import {map} from 'rxjs/operators';
import {Observable, of,from } from 'rxjs';
import {ProductsService} from "./products.service";
import {AutoCompleteService} from 'ionic4-auto-complete';
@Injectable({
  providedIn: 'root'
})
export class AutoCompleteDataService implements AutoCompleteService {
  labelAttribute = 'name';

  private productList:any[] = [];

  constructor(private productsService: ProductsService, private http:HttpClient) {

  }

  getResults(keyword:string):Observable<any[]> {
    let observable:Observable<any>;

    if (this.productList.length === 0) {
      observable =from(this.productsService.getProducts(''));
 // observable = this.http.get('https://restcountries.eu/rest/v2/all');
} else {
  observable = of(this.productList);
}

    return observable.pipe(
      map(
        (result) => {
          return result.filter(
            (item) => {
              return item.name.toLowerCase().startsWith(
                 keyword.toLowerCase()
              );
            }
          );
        }
      )
    );
  }
}
