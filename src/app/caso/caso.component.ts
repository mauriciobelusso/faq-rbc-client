import { Component, OnInit } from '@angular/core';
import { Message, ConfirmationService, MessageService } from 'primeng/api';
import { CasoService } from './caso.service';
import { Caso } from '../model/caso';
import {MatDialog} from '@angular/material/dialog';
import { Atributo } from '../model/atributo';

@Component({
  selector: 'app-caso',
  templateUrl: './caso.component.html',
  styleUrls: ['./caso.component.scss']
})
export class CasoComponent implements OnInit {

  casos: Caso[];

  casoEdit = new Caso();
  atributoEdit = new Atributo();

  showDialog = false;
  showDialogDetail = false;

  msgs: Message[] = [];

  constructor(private casoService: CasoService,
              private confirmationService: ConfirmationService,
              private messageService: MessageService) { }

  ngOnInit() {
    this.findAll();
  }

  findAll() {
    this.casoService.findAll().subscribe( e => this.casos = e);
  }

  newEntity() {
    this.casoEdit = new Caso();
    this.casoEdit.atributos = [];
    this.showDialog = true;
  }

  cancel() {
    this.showDialog = false;
  }

  edit(caso: Caso) {
    this.casoEdit = Object.assign({}, caso);
    this.showDialog = true;
  }

  save() {
    this.casoService.save(this.casoEdit).subscribe(e => {
      this.casoEdit = new Caso();
      this.findAll();
      this.showDialog = false;
      this.messageService.add({severity: 'success', summary: 'Confirmado',
            detail: 'Registro salvo com sucesso!'});
    },
      error => {
      this.messageService.add({severity: 'error', summary: 'Erro',
            detail: 'Falha ao salvar o registro!'});
    });
  }

  delete(caso: Caso) {
    this.confirmationService.confirm({
      message: 'Esta ação não poderá ser desfeita!',
      header: 'Deseja remover o registro?',
      acceptLabel: 'Confirmar',
      rejectLabel: 'Cancelar',
      accept: () => {
        this.casoService.delete(caso.id).subscribe(() => {
          this.findAll();
          this.messageService.add({severity: 'success', summary: 'Confirmado',
                    detail: 'Registro removido com sucesso!'});
        }, error => {
          this.messageService.add({severity: 'error', summary: 'Erro',
                    detail: 'Falha ao remover o registro!'});
        });
      }
    });
  }




  

  novoAtributo() {
    this.atributoEdit = new Atributo();
    this.showDialogDetail = true;
  }

  cancelDetail() {
    this.showDialogDetail = false;
  }

  editDetail(atributo: Atributo) {
    this.atributoEdit = Object.assign({}, atributo);
    this.showDialogDetail = true;
  }

  saveDetail() {
    if (this.atributoEdit.id > 0) {
      this.casoEdit.atributos.forEach((attr, index) => {
        if (this.atributoEdit.id === attr.id) {
          this.casoEdit.atributos.splice(index, 1);
          this.casoEdit.atributos.push(this.atributoEdit);
        }
      })
    }
    else
      this.casoEdit.atributos.push(this.atributoEdit);
    this.showDialogDetail = false;
  }

  deleteDetail(atributo: Atributo) {
    this.confirmationService.confirm({
      message: 'Esta ação não poderá ser desfeita!',
      header: 'Deseja remover o registro?',
      acceptLabel: 'Confirmar',
      rejectLabel: 'Cancelar',
      accept: () => {
        this.casoEdit.atributos.forEach((attr, index) => {
          if (atributo == attr) this.casoEdit.atributos.splice(index, 1);
        })
      }
    });
  }
}
