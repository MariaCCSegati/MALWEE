import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { HttpService } from 'src/services/http.service';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { ModalProductComponent } from '../modal-product/modal-product.component';


@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {

  description:string = '';
  preco:number | undefined;
  produtos:Array<any> = []
  grupinho:string = '';
  modal: string = '';
  //html:string = '';
  id: any;

  constructor(
    private http : HttpClient, private httpService : HttpService, public dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.list();
  //  this.html = 'false';
    this.modal = 'false';
  }

  //public htmlAdd(){
  //  this.html = 'true';
  //}

  async get(){
    this.produtos = await this.httpService.get('product')
  }

  openDialog(){
    const dialogRef = this.dialog.open(ModalProductComponent, {
      width: '550px',
      data: {id : this.id, description : this.description, preco : this.preco}
    });
   

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.get();
    });
  }

  teste(){
    this.produtos.push({description : this.description, preco : this.preco})
    console.log(this.produtos)
  }

  async list(){
    this.produtos = await this.httpService.get('product');
    console.log(this.produtos)
  }

}
