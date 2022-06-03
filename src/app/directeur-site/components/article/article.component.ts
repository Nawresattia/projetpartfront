import { AfterViewInit, Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { LoadserviceService } from 'src/Services/loadservice.service';


export interface PeriodicElement {
  Id: number;
 code: String;
 Intitule: String;
 Fournisseur: String;
 Datecreation:string;
  
}

@Component({
  selector: 'app-articles',
  templateUrl: './articles.component.html',
  styleUrls: ['./articles.component.scss']
})
export class ArticlesComponent implements OnInit,AfterViewInit {

  dymdm = new Date();
  All = [this.dymdm.getFullYear(), this.dymdm.getMonth() + 1, this.dymdm.getDate()].join('/');
  date = [this.All, this.dymdm.getHours(), this.dymdm.getMinutes()].join('-');

  displayedColumns: string[] = ['Id', 'code','Intitule', 'Fournisseur','Datecreation', 'actions'];
 //{id: 1, code: '44774', intitule: 'Hi first in', fournisseurs: Array(0), datecreation: '2022-05-11T00:04:39.000+00:00'}
  dataSource;
  dialog: any;


   
  constructor(public load:LoadserviceService) { }
 
  ngOnInit(): void {
    this.getAll();
  }
  ngAfterViewInit(): void {
  }

  getAll(){
    this.load.get("AllArticle").then(
      (data:any) => {        
        //this.ELEMENT_DATA=data;
        console.log(data);
        this.dataSource = new MatTableDataSource<PeriodicElement>(data);
      }
  );
  }
    
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  delet(id) {
    console.log(id)
    if (confirm("Sure You want to delete this article!") == true) {
      this.load.post({ "articleid": id }, "DeleteArticle").then(
        (data: any) => {
          console.log(data);
          if (data.key == "true") {
            this.load.openSnackBar("Delete Done");
            this.getAll()
          }
          else this.load.openSnackBar("Error")

        });
    } else { }

  }
  edit(id) {
    console.log(id)
    this.dialog.open(EditArticleDialog, {
      height: '95',
      width: '95',
      data: id,
    });

  }

}

@Component({
  selector: 'dialog-update-article',
  templateUrl: 'edit-pop.html',
})
export class EditArticleDialog {
  Id: any="";
  code: any="";
  Intitule: any="";
  Fournisseur: any="";
  Datecreation: any="";
  actions: any="";
  constructor(public dialogRef: MatDialogRef<EditArticleDialog>,
    @Inject(MAT_DIALOG_DATA) public data, public load: LoadserviceService) { }
  close() {
    this.dialogRef.close();
  }
  update() {
    console.log(this.data)
    let senddata =
    {
      "Id": this.Id,
      "code": this.code,
      "Intitule": this.Intitule,
      "Fournisseur": this.Fournisseur,
      "Datecreation": this.Datecreation,
       
    };
    if(this.data==null && this.Id=="" && this.code=="" && this.Intitule=="" && this.Fournisseur=="" && this.Datecreation=="" )
    {this.load.openSnackBar("Please Update at least one input");}
   else {
    this.load.post(senddata, "UpdateArticle").then(
      (data: any) => {
        console.log(data);
        if (data.key == "true") { this.load.openSnackBar("Updated Done"); }
        else this.load.openSnackBar("Error");

      });
   }
  }
}