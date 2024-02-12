import { Component,OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DataService } from '../services/data.service';
import { StorageService } from '../services/storage.service';
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  userData: any;
 
  constructor(private fb:FormBuilder,private storeApi:StorageService,private router:Router,private dataApi:DataService) {}
  searchForm!:FormGroup;
  submitted=false;
  compagnies:any;
  searchResult: any;
  searchResult_: any;
  searchInProgress=false;
  villes:any;
  ville_depart:any;
  ville_destination:any;
  compagnie:any;
  isEmpty=true;
  hide=false;
  gares:any;
  filteredVille:any;
  departureStations: string[] = [];
  // eslint-disable-next-line @angular-eslint/use-lifecycle-interface
  ngOnInit() {
    this.initForm();
    this.getCompagnie();
    this.getVille();
    this.getUserData();
  }
  initForm(){
    this.searchForm=this.fb.group({
      depart:['',Validators.required],
      compagnie:['',Validators.required],
      gare_depart:['',Validators.required],
      destination:['',Validators.required],
      date_depart:['',Validators.required],
      isTiersChecked:[false,Validators.required]
    });
    this.searchForm.controls['compagnie'].valueChanges.subscribe(compagnie => {
      console.log(compagnie);
      const departControl = this.searchForm.controls['depart'];
      const departValue=this.searchForm.controls['depart'].value;
      console.log(departValue);
      if(departValue!==''){
        this.getGareByVilleAndCompagnie(compagnie,departValue);
      }
      departControl.valueChanges.subscribe(depart => {
        // Use compagnie and depart values to update gare_depart options
        this.getGareByVilleAndCompagnie(compagnie,depart);
        let  indexToRemove=depart-1;
        const sortedData = this.villes.sort((a:any, b:any) => a.id - b.id);
        console.log(sortedData)
        // Remove the selected depart value from filteredVilles
        this.filteredVille = sortedData.slice(0, indexToRemove).concat( 
        this.villes.slice(indexToRemove + 1)); 
        //this.filteredVille = this.villes.filter((ville:any) => ville.id !== depart);
       
      });
    });
  }

  get f(): { [key: string]: AbstractControl } {
    return this.searchForm.controls;
  }

  getGareByVilleAndCompagnie(compId:any,villeId:any){
    const param={compId,villeId};
    console.log(param);
    this.dataApi.getGareByCompAndVille(compId,villeId).subscribe({
      next:(data)=>{
        this.gares=data;
        console.log(data);
      },
      error:(e)=>console.log(e)
    })
  }
  getCompagnie(){
    this.dataApi.getAllCompagnies()
    .subscribe({
      next: (data) => {
        this.compagnies = data;
        console.log(data);
      },
      error: (e) => console.error(e)
    });
  }
  getVille(){
    this.dataApi.getAllVilles()
    .subscribe({
      next: (data) => {
        this.villes = data;
        this.filteredVille=data;
       
        console.log(data);
      },
      error: (e) => console.error(e)
    });
  }
  getUserData(){
    this.storeApi.get('user_data').then(value => {
      if(value){
        // Use the retrieved value here
        this.userData=value;
        console.log(value,this.userData); 
      }else{
        this.router.navigate(['/login']);
      }
    });
  }
  onSubmit(){
    if (this.searchForm.valid) {
      const re=this.storeApi.set('search_value',this.searchForm.value);
      console.log(re)
      const value=this.searchForm.value;
      this.ville_depart=this.villes.filter(function(elem:any){
        return elem.id===parseInt(value.depart);
      });
      this.ville_destination=this.villes.filter(function(elem:any){
        return elem.id===parseInt(value.destination);
      });
      this.compagnie=this.compagnies.filter(function(elem:any){
        return elem.id===parseInt(value.compagnie);
      });
      console.log(this.searchForm.value)
      // Set registrationInProgress to true to disable the button and show the loader
      this.searchInProgress = true;
      this.dataApi.getTrajetByCompDepartArrive(this.searchForm.value).subscribe({
        next: (res) => {
          console.log(res);
          //this.messageApi.setMessage('Connexion réussie ! Bon retour sur notre plateforme de réservation.');
          this.searchResult=res;
          setTimeout(()=>{
            this.searchInProgress=false;
            if(this.searchResult.departs.length>0){
              this.searchResult_=this.searchResult.departs;
              this.isEmpty=false;
              this.hide=true;
            }else{
              this.isEmpty=false;
              this.hide=true;
            }
          },3000);
         
        },
        error: (e) => {
          setTimeout(()=>{
          },3000);
          this.searchInProgress=false;
          console.error(e)
        }
      });
    }
  }
  initEmpty(){
    this.initForm()
    this.isEmpty=true;
    this.hide=false
  }
}
