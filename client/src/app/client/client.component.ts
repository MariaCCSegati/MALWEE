import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { HttpService } from 'src/services/http.service';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { ModalCollectionComponent } from '../modal-collection/modal-collection.component';
import { ModalClientComponent } from '../modal-client/modal-client.component';

@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.scss']
})
export class ClientComponent implements OnInit {

  nome:string = '';
  cnpj:string = '';
  razaoSocial = '';
  clienteDesde = '';
  clientes:Array<any> = []
  grupinho:string = '';
  modal: string = '';
  html:string = '';
  id: any;

  constructor(private http : HttpClient, private httpService : HttpService, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.list();
    this.html = 'false';
    this.modal = 'false';
  }
  public htmlAdd(){
    this.html = 'true';
  }


  openDialog(){
    const dialogRef = this.dialog.open(ModalClientComponent, {
      width: '700px',
      data: {id : this.id, nome : this.nome, cnpj : this.cnpj, razaoSocial : this.razaoSocial, clienteDesde : this.clienteDesde}
    });
   

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.grupinho = result;
    });
  }

  teste(){
    this.clientes.push({ nome : this.nome, cnpj : this.cnpj, razaoSocial : this.razaoSocial, clienteDesde : this.clienteDesde})
    console.log(this.clientes)
  }

  async list(){
    this.clientes = await this.httpService.get('client');
    console.log(this.clientes)
  }
}
