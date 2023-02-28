import { Component } from '@angular/core';
import { RTDBService } from '../services/RTDB.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  data: any;

  constructor(private dataService: RTDBService) {}

  ngOnInit() {
    this.dataService.getData().subscribe(data => {
      this.data = data;
      console.log(data);
    });
  }

}
