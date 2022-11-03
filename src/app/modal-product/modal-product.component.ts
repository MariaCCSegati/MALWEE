import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { HttpService } from 'src/services/http.service';

@Component({
  selector: 'app-modal-product',
  templateUrl: './modal-product.component.html',
  styleUrls: ['./modal-product.component.scss']
})
export class ModalProductComponent implements OnInit {

  description:string = '';
  preco:number | undefined;
  produtos:Array<any> = []
  grupinho:string = '';
  modal: string = '';
  html:string = '';
  id: any;

  constructor(
    public dialogRef: MatDialogRef<ModalProductComponent>, private http : HttpClient, private httpService : HttpService
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
    this.produtos =  await this.httpService.post('product', {description : this.description, preco : this.preco});
    console.log(this.description);
    alert('adicionado')
  }

  async delete(){
    this.produtos =  await this.httpService.patch(`product/${this.id}`, {});
    alert('deletado!')
  }

  async edit(){
    this.produtos =  await this.httpService.put('product', {id: this.id, description : this.description, preco : this.preco});
    alert('editado!')
  }


}
