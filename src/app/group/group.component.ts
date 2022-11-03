import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { HttpService } from 'src/services/http.service';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { ModalComponent } from '../modal/modal.component';

@Component({
  selector: 'app-group',
  templateUrl: './group.component.html',
  styleUrls: ['./group.component.scss']
})
export class GroupComponent implements OnInit {
  description:string = '';
  group:Array<any> = []
  modal: string = '';
  //html:string = '';
  id: any;

  constructor(private http : HttpClient, private httpService : HttpService, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.list();
    this.get();
  //  this.html = 'false';
  }

  async get(){
    this.group = await this.httpService.get('grupo')
  }

  //public htmlAdd(){
  //  this.html = 'true';
  //}


  openDialog(){
    const dialogRef = this.dialog.open(ModalComponent, {
      width: '550px',
      data: {idGrupo : this.id, description: this.description}
    });
   

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.get();
    });
  }


  teste(){
    this.group.push({description : this.description})
    console.log(this.group)
  }

  async list(){
    this.group = await this.httpService.get('grupo');
    console.log(this.group)
  }

}
