import {Component, ViewChild} from '@angular/core';
import {NavController, NavParams} from 'ionic-angular';
import {MonthPage} from '../month/month';

@Component({
  selector: 'page-year',
  templateUrl: 'year.html'
})
export class YearPage {
  selectedYear: number;
  yearList = [];
  initialSlide: number;

  constructor(public navCtrl: NavController,
              public navParams: NavParams) {
    this.selectedYear = navParams.get('year');
    this.yearList = this.createYearList();
  }

  ionViewDidEnter() {
    // this.YearSelect.open();
    // console.log(this.YearSelect._elementRef.nativeElement);
    // this.YearSelect._elementRef.nativeElement.click();
    // this.YearSelect._isOpen = true;
    // document.getElementById("dt-0-0").click();

  }

  createYearList() {
    const date = new Date();
    const currentYear = date.getFullYear();
    const startYear = currentYear - 100;
    const endYear = currentYear + 100;
    const yearList = [];
    for (let i = 0; i < 67; i++) {
      const page = [];
      for (let j = 0; j < 3; j++) {
        const offset = i * 3 + j;
        const year = startYear + offset;
        page.push(year);
        if (year === this.selectedYear) {
          this.initialSlide = i;
        }
      }
      yearList.push(page);
    }
    return yearList;
  }

  selectYear(year) {
    this.selectedYear = year;
    this.navCtrl.push(MonthPage, {
      year: year
    })
  }

}
