import { Injectable } from '@angular/core';
import { CrudService } from '../generic/crud.service';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Caso } from '../model/caso';

@Injectable({
  providedIn: 'root'
})
export class CasoService extends CrudService<Caso, number> {

  constructor(http: HttpClient) {
    super(environment.api + '/caso', http);
  }

}
