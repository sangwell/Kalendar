import {Component, ViewChild} from '@angular/core';
import {NavController, NavParams} from 'ionic-angular';
import {DayPage} from '../day/day';

@Component({
  selector: 'page-month',
  templateUrl: 'month.html'
})
export class MonthPage {
  selectedYear: number;
  monthList = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9],
    [10, 11, 12]
  ];

  constructor(public navCtrl: NavController,
              public navParams: NavParams) {
    this.selectedYear = this.navParams.get('year');
  }

  goToDayPage(month) {
    this.navCtrl.push(DayPage, {
      year: this.selectedYear,
      month: month
    })
  }


}
