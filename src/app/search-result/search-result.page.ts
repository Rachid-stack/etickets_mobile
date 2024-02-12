import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-search-result',
  templateUrl: './search-result.page.html',
  styleUrls: ['./search-result.page.scss'],
})
export class SearchResultPage implements OnInit {
  results: any;
  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.results =  params['results'];
    });
    console.log(this.results);
  }

}
