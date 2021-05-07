import { Component, OnInit } from '@angular/core';
import { Message, ConfirmationService, MessageService } from 'primeng/api';
import { UsuarioService } from './usuario.service';
import { Usuario } from '../model/usuario';
import {MatDialog} from '@angular/material/dialog';
import { Atributo } from '../model/atributo';

@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.scss']
})
export class UsuarioComponent implements OnInit {

  usuarios: Usuario[];

  usuarioEdit = new Usuario();
  atributoEdit = new Atributo();

  showDialog = false;
  showDialogDetail = false;

  msgs: Message[] = [];

  constructor(private usuarioService: UsuarioService,
              private confirmationService: ConfirmationService,
              private messageService: MessageService) { }

  ngOnInit() {
    this.findAll();
  }

  findAll() {
    this.usuarioService.findAll().subscribe( e => this.usuarios = e);
  }

  newEntity() {
    this.usuarioEdit = new Usuario();
    this.showDialog = true;
  }

  cancel() {
    this.showDialog = false;
  }

  edit(Usuario: Usuario) {
    this.usuarioEdit = Object.assign({}, Usuario);
    this.usuarioEdit.password = "";
    this.showDialog = true;
  }

  save() {
    this.usuarioService.save(this.usuarioEdit).subscribe(e => {
      this.usuarioEdit = new Usuario();
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

  delete(usuario: Usuario) {
    this.confirmationService.confirm({
      message: 'Esta ação não poderá ser desfeita!',
      header: 'Deseja remover o registro?',
      acceptLabel: 'Confirmar',
      rejectLabel: 'Cancelar',
      accept: () => {
        this.usuarioService.delete(usuario.id).subscribe(() => {
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
}
