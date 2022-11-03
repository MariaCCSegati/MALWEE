import { HttpClient } from '@angular/common/http';
import { Component, Inject, inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { HttpService } from 'src/services/http.service';
export interface DialogDataSubGroup {
  id: number,
  description: string;
}

@Component({
  selector: 'app-edit-subgroup',
  templateUrl: './edit-subgroup.component.html',
  styleUrls: ['./edit-subgroup.component.scss']
})
export class EditSubgroupComponent implements OnInit {

  description:string = '';
  subgroup:Array<any> = [];
  id: number | undefined;

  constructor(public dialogRef: MatDialogRef<EditSubgroupComponent>, private httpService : HttpService, @Inject(MAT_DIALOG_DATA) public data: DialogDataSubGroup) { }

  ngOnInit(): void {
  }

  async delete(){
    this.subgroup =  await this.httpService.patch(`subgroup/${this.data.id}`, {});
    alert('deletado!')
  }

  async edit(){
    this.subgroup =  await this.httpService.put('subgroup', {id: this.data.id, description: this.data.description});
    alert('editado!')
  }

  cancel(): void {
    this.dialogRef.close();
  }
}
