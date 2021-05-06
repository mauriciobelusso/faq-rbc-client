import { Injectable } from '@angular/core';
import { CrudService } from '../generic/crud.service';
import { Produto } from '../model/produto';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProdutoService extends CrudService<Produto, number> {

  constructor(http: HttpClient) {
    super(environment.api + '/produto', http);
  }
}
