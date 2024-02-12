import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DataService } from '../services/data.service';
import { Location } from '@angular/common';
@Component({
  selector: 'app-tiers-form',
  templateUrl: './tiers-form.page.html',
  styleUrls: ['./tiers-form.page.scss'],
})
export class TiersFormPage implements OnInit {
  depart: any;

  constructor(private router: Router,private location: Location,private route: ActivatedRoute,private dataApi:DataService) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.getDepartData(params['data']);
    });
  }
  getDepartData(id:any){
    this.dataApi.getDepartById(id).subscribe({
      next: (res) => {
        this.depart=res;
        console.log(this.depart);
      },
      error: (e) => {console.error(e) }
    });
  }
  goBack() {
    this.location.back();
  }
}
