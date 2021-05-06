import { Component, OnInit, ViewChild } from '@angular/core';
import { Produto } from '../model/produto';
import { ProdutoService } from './produto.service';
import { ConfirmationService, Message, LazyLoadEvent, MessageService } from 'primeng/api';
import { Categoria } from '../model/categoria';
import { CategoriaService } from '../categoria/categoria.service';
import { Table } from 'primeng/table';;
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-produto',
  templateUrl: './produto.component.html',
  styleUrls: ['./produto.component.scss']
})
export class ProdutoComponent implements OnInit {

  @ViewChild('dt', {static: false}) dataTable: Table;

  produtos: Produto[];
  totalRecords: number;
  maxRecords = 10;
  currentPage = 1;

  produtoEdit = new Produto();
  showDialog = false;
  msgs: Message[] = [];

  categorias: Categoria[];

  br: any;

  // atributos utilizados para o upload
  uploadedFiles: any[] = [];
  urlApi: string = environment.api;
  today: number = Date.now();

  constructor(private produtoService: ProdutoService,
              private confirmationService: ConfirmationService,
              private categoriaService: CategoriaService,
              private messageService: MessageService) { }

  ngOnInit() {
    this.carregarCombos();
    this.br = {
      firstDayOfWeek: 1,
      dayNames: [ 'domingo', 'segunda', 'terça', 'quarta', 'quinta', 'sexta', 'sábado' ],
      dayNamesShort: [ 'dom', 'seg', 'ter', 'qua', 'qui', 'sex', 'sáb' ],
      dayNamesMin: [ 'D', 'S', 'T', 'Q', 'Q', 'S', 'S' ],
      monthNames: [ 'Janeiro', 'fevereiro', 'março', 'abril', 'maio', 'junho', 'julho',
                    'agosto', 'setembro', 'outubro', 'novembro', 'dezembro' ],
      monthNamesShort: [ 'jan', 'fev', 'mar', 'abr', 'mai', 'jun', 'jul', 'ago', 'set',
                         'out', 'nov', 'dez' ],
      today: 'Hoje',
      clear: 'Limpar'
    }
  }

  carregarCombos() {
    //this.categoriaService.findAll().subscribe(e => this.categorias  = e );
    // this.marcaService.findAll().subscribe(e => this.marcas = e);
  }

  findAllPaged(page: number, size: number) {
    this.produtoService.findPageable(page, size).subscribe(e => {
      this.produtos = e.content;
      this.totalRecords = e.totalElements;
    });
  }

  lazyLoad(event: LazyLoadEvent) {
    const pageNumber = event.first / event.rows;
    this.currentPage = pageNumber;

    this.maxRecords = event.rows;

    setTimeout( () => {
      this.findAllPaged(this.currentPage, this.maxRecords);
    }, 250);
  }

  newEntity() {
    this.today = Date.now();
    this.showDialog = true;
    this.produtoEdit = new Produto();
    this.produtoEdit.categoria = this.categorias[0];
  }

  search(event) {
    // this.marcasFiltered = this.marcas.filter(
    //   p => p.conteudo.toLocaleLowerCase().includes(event.query.toLocaleLowerCase())
    //  );
  }

  edit(produto: Produto) {
    this.today = Date.now();
    this.produtoEdit = Object.assign({}, produto);
    this.showDialog = true;
  }

  cancel() {
    this.showDialog = false;
  }

  save() {
    this.produtoService.save(this.produtoEdit).subscribe(e => {
      this.produtoEdit = new Produto();
      this.dataTable.reset();
      this.showDialog = false;
      this.messageService.add({severity: 'success', summary: 'Confirmado',
      detail: 'Registro salvo com sucesso!'});
    },
      error => {
      this.messageService.add({severity: 'error', summary: 'Erro',
            detail: 'Falha ao salvar o registro!'});
    });
  }

  delete(produto: Produto) {
    this.confirmationService.confirm({
      message: 'Esta ação não poderá ser desfeita!',
      header: 'Deseja remover o registro?',
      acceptLabel: 'Confirmar',
      rejectLabel: 'Cancelar',
      accept: () => {
        this.produtoService.delete(produto.id).subscribe(() => {
          this.dataTable.reset();
          this.messageService.add({severity: 'success', summary: 'Confirmado',
                    detail: 'Registro removido com sucesso!'});
        }, error => {
          this.messageService.add({severity: 'error', summary: 'Erro',
                    detail: 'Falha ao remover o registro!'});
        });
      }
    });
  }

  // Método utilizado no upload de arquivos
  onUpload(event) {
    for (const file of event.files) {
      this.uploadedFiles.push(file);
    }

    this.msgs = [{severity: 'info', summary: 'Arquivo salvo',
                  detail: 'Arquivo salvo com sucesso!'}];
    setTimeout(() => {
      this.dataTable.reset();
      this.showDialog = false;
      this.uploadedFiles = [];
    }, 500);
  }
}
