
import { Component, ElementRef, ViewChild } from '@angular/core';

import { MatTable } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { DialogBoxComponent } from './dialog-box/dialog-box.component';

export interface UsersData {
  name: string;
  edate: any;
}

const ELEMENT_DATA: UsersData[] = [
  {name: 'iphone XR',edate: new Date().toISOString().slice(0,10)},
  {name: 'Samsung S9',edate: new Date().toISOString().slice(0,10)},
  {name: 'Samsung Note 8',edate: new Date().toISOString().slice(0,10)},
  {name: 'LG Phone',edate: new Date().toISOString().slice(0,10)},
  {name: 'ipad Pro',edate: new Date().toISOString().slice(0,10)},
  {name: 'Macbook Pro',edate: new Date().toISOString().slice(0,10)},
  {name: 'HP Thinkbook',edate: new Date().toISOString().slice(0,10)},
  {name: 'Dell inspiron',edate: new Date().toISOString().slice(0,10)},
  {name: 'Dell Flate',edate: new Date().toISOString().slice(0,10)},
];
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  displayedColumns: string[] = [ 'name','edate' ,'action'];
  dataSource = ELEMENT_DATA;

  @ViewChild(MatTable, { static: true })
  table!: MatTable<any>;

  constructor(public dialog: MatDialog) {}

  openDialog(action:any,obj:any) {
    obj.action = action;
    const dialogRef = this.dialog.open(DialogBoxComponent, {
      width: '250px',
      data:obj
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result.event == 'Add'){
        this.addRowData(result.data);
      }else if(result.event == 'Update'){
        this.updateRowData(result.data);
      }else if(result.event == 'Delete'){
        this.deleteRowData(result.data);
      }
    });
  }

  addRowData(row_obj:any){
    var d = new Date();
      this.dataSource.push({
      name:row_obj.name,
      edate:d
    });
    this.table.renderRows();
    
  }
  updateRowData(row_obj:any){
    this.dataSource = this.dataSource.filter((value,key)=>{
      if(value.edate == row_obj.edate){
        value.name = row_obj.name;
      }
      return true;
    });
  }
  deleteRowData(row_obj:any){
    this.dataSource = this.dataSource.filter((value,key)=>{
      return value.edate != row_obj.edate;
    });
  }
}
