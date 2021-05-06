import { Component, OnInit } from '@angular/core';
import { Categoria } from '../model/categoria';
import { CategoriaService } from './categoria.service';
import { Message, ConfirmationService, MessageService } from 'primeng/api';

@Component({
  selector: 'app-categoria',
  templateUrl: './categoria.component.html',
  styleUrls: ['./categoria.component.scss']
})
export class CategoriaComponent implements OnInit {

  categorias: Categoria[];
  search: String;

  constructor(private categoriaService: CategoriaService) { }

  ngOnInit() {
    //this.findAll();
  }

  findAll() {
    this.categoriaService.search(this.search).subscribe( e => this.categorias = e);
  }


}
