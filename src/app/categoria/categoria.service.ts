import { Injectable } from '@angular/core';
import { Categoria } from '../model/categoria';
import { HttpClient} from '@angular/common/http';
import { map } from 'rxjs/operators';
import { CrudService } from '../generic/crud.service';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class CategoriaService extends CrudService<Categoria, number>  {

  constructor(http: HttpClient) {
    super(environment.api + '/caso/search?search', http);
  }

  search1() {
    const url = 'http://localhost:8026/caso/search?search';
    const aaa =  this.http.get<Categoria[]>(url).pipe(map(_data => {})).subscribe(result => {
      console.log(result);
    });
  } 

  search(param: String): Observable<Categoria[]> {
    const semEspacos = param.replace(/ /g, '%20');
    const url = `${this.getUrl()}`+'='+semEspacos;
    console.log(url)
    return this.http.get<Categoria[]>(url);
}

}
