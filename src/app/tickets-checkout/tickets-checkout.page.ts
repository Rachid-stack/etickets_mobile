import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { StorageService } from '../services/storage.service';
import { DataService } from '../services/data.service';
@Component({
  selector: 'app-tickets-checkout',
  templateUrl: './tickets-checkout.page.html',
  styleUrls: ['./tickets-checkout.page.scss'],
})
export class TicketsCheckoutPage implements OnInit {
  public stringQrCode: string = '';
  ticketData: any = {
    // Your ticket details here
    no:'',
    depart: '',
    destination: '',
    heure_depart: '',
    numero_siege: '',
    date:'',
    passager:'',
    compagnie:''
    // Add more ticket details as needed
  };
  departId: any;
  villes: any;
  depart: any;
  searchvalue: any;
  userData: any;
  sieges: any;
  constructor(private dataApi:StorageService,private route:ActivatedRoute,private storeApi:DataService) {this.stringQrCode = 'eduforbetterment.com'; }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.departId = params['id'];
      this.getDepartData(params['id']);
    });
    this.getSearchFormValue(),
    this.getUserData();
    this.getSiegeData();
  }
  getUserData(){
    this.dataApi.get('user_data').then(value => {
      if(value){
        this.userData=value;
        console.log(value)
      }
    });
  }
  getSiegeData(){
    this.dataApi.get('siege').then(value => {
      if(value){
        this.sieges=value
        console.log(value)
      }
    });
  }
  getSearchFormValue(){
    this.dataApi.get('search_value').then(value => {
      this.searchvalue=value;
      console.log(value)
    });
  }
  getVille(){
    this.storeApi.getAllVilles().subscribe({next: (data) => {
        this.villes = data;
        console.log(data);
      },
      error: (e) => console.error(e)
    });
  }
  getDepartData(id:any){
    this.storeApi.getDepartById(id).subscribe({
      next: (res) => {
        this.depart=res;
      },
      error: (e) => {console.error(e) }
    });
  }
  generateQRCode() {
    console.log(this.searchvalue)
    console.log(this.depart.compagnie)
    this.ticketData.date=this.searchvalue.date_depart;
    this.ticketData.passager=this.userData.nom+' '+this.userData.prenom;
    this.ticketData.telephone=this.userData.numero_telephone;
    this.ticketData.compagnie=this.depart.compagnie.libelle;
    this.ticketData.heure_depart=this.depart.heure_depart;
    if(this.villes.id==this.searchvalue.depart){
      this.ticketData.depart=this.villes.libelle;
    }else if(this.villes.id==this.searchvalue.destination){
      this.ticketData.destination=this.villes.libelle;
    }
    this.ticketData.numero_siege=this.sieges.selectedSeats[1];
    const ticketString = JSON.stringify(this.ticketData);
    return ticketString;
  }

}
