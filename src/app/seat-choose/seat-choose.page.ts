import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { DataService } from '../services/data.service';
import { ActivatedRoute, Router } from '@angular/router';
import { StorageService } from '../services/storage.service';
@Component({
  selector: 'app-seat-choose',
  templateUrl: './seat-choose.page.html',
  styleUrls: ['./seat-choose.page.scss'],
})
export class SeatChoosePage implements OnInit {
  public seatConfig: any = null;
  
  public seatmap=[{}];
  public seatChartConfig = {
    showRowsLabel: false,
    showRowWisePricing: false,
    newSeatNoForRow: false
  };
  public cart = {
    selectedSeats: [''],
    seatstoStore: [''],
    totalamount: 0,
    cartId: "",
    eventId: 0
  };
  filteredSeatmap:any;
  userData:any;
  title = "seat-chart-generator";
  departData:any;
  departId:number=0;
  villes: any;
  ville_depart: any;
  ville_destination: any;
  searchData: any;
  constructor(private router: Router,private location: Location,private storeApi:StorageService,private  dataApi:DataService,private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.departId = params['id'];
      this.getDepartData(params['id']);
    });
    // Process a simple bus layout
    this.seatConfig = [
      {
        seat_price: 250,
        seat_map: [
          {
            seat_label: "1",
            layout: "g_____"
          },
          {
            seat_label: "2",
            layout: "gg__gg"
          },
          {
            seat_label: "3",
            layout: "gg__gg"
          },
          {
            seat_label: "4",
            layout: "gg__gg"
          },
          {
            seat_label: "5",
            layout: "gg__gg"
          },
          {
            seat_label: "6",
            layout: "gg__gg"
          },
          {
            seat_label: "7",
            layout: "gg__gg"
          },
          {
            seat_label: "8",
            layout: "gggggg"
          }
        ]
      }
    ];
   
    this.processSeatChart(this.seatConfig);
    this.blockSeats("7_1,7_2");
    
    this.getVille();
    console.log(this.cart);
    this.getUserData();
    this.getSearchFormValue();
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

  getSearchFormValue(){
    this.storeApi.get('search_value').then(value => {
      // Use the retrieved value here
      this.searchData=value;
      console.log(value,this.searchData); 
    });
  }
  public processSeatChart(map_data: any[]) {
    if (map_data.length > 0) {
     
      let seatNoCounter = 1;
      for (let __counter = 0; __counter < map_data.length; __counter++) {
        let row_label = "";
        const item_map = map_data[__counter].seat_map;
        //console.log(item_map);
        // Get the label name and price
        row_label = "Row " + item_map[0].seat_label + " - ";
        if (item_map[item_map.length - 1].seat_label !== " ") {
          row_label += item_map[item_map.length - 1].seat_label;
        } else {
          row_label += item_map[item_map.length - 2].seat_label;
        }
        row_label += " : Rs. " + map_data[__counter].seat_price;

        item_map.forEach((map_element: { seat_label: string; layout: string; }) => {
          const mapObj: { seatRowLabel: string; seats: any[]; seatPricingInformation: string }= {
            seatRowLabel: map_element.seat_label,
            seats:[],
            seatPricingInformation: row_label
          };
          row_label = "";
          const seatValArr = map_element.layout.split("");
          if (this.seatChartConfig.newSeatNoForRow) {
            seatNoCounter = 1; // Reset the seat label counter for new row
          }
          let totalItemCounter = 1;
          seatValArr.forEach((item: string) => {
            const seatObj: {
              key: string;
              price: any;
              status: string;
              seatLabel?: string;
              seatNo?:string
            }= {
              key: map_element.seat_label + "_" + totalItemCounter,
              price: map_data[__counter]["seat_price"],
              status: "available"
            };

            if (item !== "_") {
              seatObj["seatLabel"] =
                map_element.seat_label + " " + seatNoCounter;
              if (seatNoCounter < 10) {
                seatObj["seatNo"] = "0" + seatNoCounter;
              } else {
                seatObj["seatNo"] = "" + seatNoCounter;
              }

              seatNoCounter++;
            } else {
              seatObj["seatLabel"] = "";
            }
            totalItemCounter++;
            mapObj["seats"].push(seatObj);
          });
          //console.log(" \n\n\n Seat Objects ", mapObj);
          this.seatmap.push(mapObj);
         
        });

      }
      
    }
  }

  public selectSeat(seatObject: any) {
    console.log("Seat to block: ", seatObject);
    console.log(this.cart);
    if (seatObject.status === "available") {
      seatObject.status = "booked";
      this.cart.selectedSeats.push(seatObject.seatLabel);
      this.cart.seatstoStore.push(seatObject.key);
      this.cart.totalamount += seatObject.price;
    } else if (seatObject.status === "booked") {
      seatObject.status = "available";
      const seatIndex = this.cart.selectedSeats.indexOf(seatObject.seatLabel);
      if (seatIndex > -1) {
        this.cart.selectedSeats.splice(seatIndex, 1);
        this.cart.seatstoStore.splice(seatIndex, 1);
        this.cart.totalamount -= seatObject.price;
      }
    }
  }
  public blockSeats(seatsToBlock: string) {
    if (seatsToBlock) {
      const seatsToBlockArr = seatsToBlock.split(",");
      for (const seat of seatsToBlockArr) {
        const seatSplitArr = seat.split("_");
        //onsole.log("Split seat: ", seatSplitArr);
        console.log(this.seatmap);
        this.filteredSeatmap = this.seatmap.filter(element => Object.keys(element).length !== 0);
        console.log(this.filteredSeatmap);
        for (let index2 = 0; index2 < this.filteredSeatmap.length; index2++) {
          const element = this.filteredSeatmap[index2];
          if (element.seatRowLabel == seatSplitArr[0]) {
            var seatObj = element.seats[parseInt(seatSplitArr[1]) - 1];
            if (seatObj) {
              seatObj["status"] = "unavailable";
              this.filteredSeatmap[index2]["seats"][
                parseInt(seatSplitArr[1]) - 1
              ] = seatObj;
              break;
            }
          }
        }
        
      }
    }
  }
  getVille(){
    this.dataApi.getAllVilles().subscribe({next: (data) => {
        this.villes = data;
        console.log(data);
      },
      error: (e) => console.error(e)
    });
  }
  public getDepartData(id:any){
    this.dataApi.getDepartById(id).subscribe({
      next: (res) => {
        this.departData=res;
        console.log(this.departData);
      },
      error: (e) => {console.error(e) }
    });
  }
  public processBooking(){
    console.log(this.cart,this.searchData);
    if(this.searchData.isTiersChecked==true){
      this.router.navigate(['/tiers-form',this.departId]);
    }else{
      const data={
        is_tiers:this.searchData.isTiersChecked,
        id_depart:this.departId,
        id_user:this.userData.id_utilisateur,
        date_depart:this.searchData.date_depart,
        type_billet:'none',
        statut_paiement:'en Atente',
        statut_reservation:'Non confirmé',
        numero_siege:this.cart.seatstoStore,
        li_siege:this.cart.selectedSeats
      };
      this.dataApi.createReservation(data).subscribe({
        next: (res) => {
          console.log(res);
          this.router.navigate(['/tickets-checkout',res]);
          
        },
        error: (e) => console.error(e)
      });
  
    
    }
    
  }
  goBack() {
    this.location.back();
  }
}
