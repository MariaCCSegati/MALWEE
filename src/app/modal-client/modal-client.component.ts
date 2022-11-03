import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { HttpService } from 'src/services/http.service';

@Component({
  selector: 'app-modal-client',
  templateUrl: './modal-client.component.html',
  styleUrls: ['./modal-client.component.scss']
})
export class ModalClientComponent implements OnInit {

  nome:string = '';
  cnpj:string = '';
  razaoSocial = '';
  clienteDesde = '';
  clientes:Array<any> = [];
  id: number | undefined;
  html: string = '';

  constructor(
    public dialogRef: MatDialogRef<ModalClientComponent>, private http : HttpClient, private httpService : HttpService
  ) { }

  ngOnInit(): void {
    this.html = 'false';
  }
  public htmlAdd(){
    this.html = 'true';
}

  cancel(): void {
    this.dialogRef.close();
  }

  async insert(){
    this.clientes =  await this.httpService.post('client', {nome : this.nome, CNPJ : this.cnpj, razaoSocial : this.razaoSocial, clienteDesde : this.clienteDesde});
    console.log(this.nome);
    alert('adicionado')
  }

  async delete(){
    this.clientes =  await this.httpService.patch(`client/${this.id}`, {});
    alert('deletado!')
  }

  async edit(){
    this.clientes =  await this.httpService.put('client', {id: this.id, nome : this.nome, cnpj : this.cnpj, razaoSocial : this.razaoSocial, clienteDesde : this.clienteDesde});
    alert('editado!')
  }

}
