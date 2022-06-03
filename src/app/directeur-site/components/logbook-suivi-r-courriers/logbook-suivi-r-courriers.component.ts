import { AfterViewInit, Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { LoadserviceService } from 'src/Services/loadservice.service';


export interface PeriodicElement {
  id:number;
  Date: string;
  reference: number;
  Entrepot: string;
  Nom_chauffeur: string;
   
}
@Component({
  selector: 'app-logbook-suivi-r-courriers',
  templateUrl: './logbook-suivi-r-courriers.component.html',
  styleUrls: ['./logbook-suivi-r-courriers.component.scss']
})
export class LogbookSuiviRCourriersComponent implements OnInit,AfterViewInit {

  dymdm = new Date();
  All = [this.dymdm.getFullYear(), this.dymdm.getMonth() + 1, this.dymdm.getDate()].join('/');
  date = [this.All, this.dymdm.getHours(), this.dymdm.getMinutes()].join('-');


  displayedColumns: string[] = ['Date', 'reference', 'Entrepot', 'Nom_chauffeur',"actions"];
  
  dataSource ;


   
  
    
  constructor(public load:LoadserviceService) { }
 
  ngOnInit(): void {
  }
  ngAfterViewInit(): void {
  }


  
  getAll(){
    this.load.get("AllReceptionCourriers").then(
      (data:any) => {        
        //this.ELEMENT_DATA=data;
        console.log(data);
        this.dataSource = new MatTableDataSource<PeriodicElement>(data);
      }
  );}
    
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  delet(id){
    console.log(id)

  }
  edit(id){
    console.log(id)

  }
  



}



