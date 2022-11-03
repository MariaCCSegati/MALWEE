import { HttpClient } from '@angular/common/http';
import { Component, Inject, inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { HttpService } from 'src/services/http.service';
export interface DialogDataSubGroup {
  id: number,
  description: string;
}

@Component({
  selector: 'app-modal-subgroup',
  templateUrl: './modal-subgroup.component.html',
  styleUrls: ['./modal-subgroup.component.scss']
})
export class ModalSubgroupComponent implements OnInit {

  description:string = '';
  subgroup:Array<any> = [];
  id: number | undefined;

  constructor(public dialogRef: MatDialogRef<ModalSubgroupComponent>, private httpService : HttpService, @Inject(MAT_DIALOG_DATA) public data: DialogDataSubGroup) { }

  ngOnInit(): void {
  }

  cancel(): void {
    this.dialogRef.close();
  }

  async insert(){
    this.subgroup =  await this.httpService.post('subgroup', {description : this.description});
    console.log(this.description);
    alert('adicionado')
  }


}
