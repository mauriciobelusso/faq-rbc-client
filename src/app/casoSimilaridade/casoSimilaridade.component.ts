import { Component, OnInit } from '@angular/core';
import { CasoSimilaridade } from '../model/casoSimilaridade';
import { CasoSimilaridadeService } from './casoSimilaridade.service';;

@Component({
  selector: 'app-casoSimilaridade',
  templateUrl: './casoSimilaridade.component.html',
  styleUrls: ['./casoSimilaridade.component.scss']
})
export class CasoSimilaridadeComponent implements OnInit {

  casoSimilaridades: CasoSimilaridade[];
  search: String;

  constructor(private casoSimilaridadeService: CasoSimilaridadeService) { }

  ngOnInit() {
    this.search = "";
  }

  findAll() {
    this.casoSimilaridadeService.search(this.search).subscribe( e => this.casoSimilaridades = e);
  }


}
