import { Component, OnInit } from '@angular/core';
import { TravelResponse } from '../../interface/travelResponse';
import { TravelService } from '../../service/travel.service';

@Component({
  selector: 'app-history-travel',
  templateUrl: './history-travel.component.html',
  styleUrls: ['./history-travel.component.scss']
})
export class HistoryTravelComponent implements OnInit {
  panelOpenState = false;
  isloading=true
  constructor(private travelService:TravelService) { }
  arrayHistory:TravelResponse[]=[]
  ngOnInit(): void {
    this.getArray()
  }
  getArray() {
    this.travelService.getTravels(9).subscribe(data => {
      data.forEach(el => {
        this.arrayHistory.push(el)
        this.isloading=false
      })
    })
  }
}
