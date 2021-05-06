import { Injectable } from '@angular/core';
import { CasoSimilaridade } from '../model/casoSimilaridade';
import { HttpClient} from '@angular/common/http';
import { CrudService } from '../generic/crud.service';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class CasoSimilaridadeService extends CrudService<CasoSimilaridade, number>  {

  constructor(http: HttpClient) {
    super(environment.api + '/caso/search?search', http);
  }

  search(param: String): Observable<CasoSimilaridade[]> {
    const semEspacos = param.replace(/ /g, '%20');
    const url = `${this.getUrl()}`+'='+semEspacos;
    return this.http.get<CasoSimilaridade[]>(url);
}

}
