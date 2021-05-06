import { Injectable } from '@angular/core';
import { Marca } from '../model/marca';
import { CrudService } from '../generic/crud.service';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Caso } from '../model/caso';

@Injectable({
  providedIn: 'root'
})
export class MarcaService extends CrudService<Caso, number> {

  constructor(http: HttpClient) {
    super(environment.api + '/caso', http);
  }

}
