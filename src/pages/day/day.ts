import {Component, ViewChild} from '@angular/core';
import {NavController, NavParams, ModalController} from 'ionic-angular';
import {AddEventPage} from '../add-event/add-event';
import {EditEventPage} from '../edit-event/edit-event';
import {MonthList, DayList} from "../../shared/constant";
import {Storage} from '@ionic/storage';

const DATE = new Date();

@Component({
  selector: 'page-day',
  templateUrl: 'day.html'
})
export class DayPage {
  selectedYear;
  selectedMonth;
  selectedDay;
  nowYear = DATE.getFullYear();
  nowMonth = DATE.getMonth() + 1;
  nowDay = DATE.getDate();
  monthList = [];
  storageId: string;
  eventList: any = [];

  constructor(public navCtrl: NavController,
              public modalCtrl: ModalController,
              public navParams: NavParams,
              private storage: Storage) {
    this.selectedYear = this.navParams.get('year');
    this.selectedMonth = this.navParams.get('month');
    this.setMonthList(this.selectedYear, this.selectedMonth);
    if (this.selectedYear === this.nowYear && this.selectedMonth === this.nowMonth) {
      this.storageId = this.nowYear.toString() + MonthList[this.nowMonth] + DayList[this.nowDay];
    } else {
      this.storageId = this.selectedYear.toString() + MonthList[this.selectedMonth] + '01';
    }
  }

  ionViewDidEnter() {
    this.getStorage();
  }

  setMonthList(year: number, month: number, day?: number) {
    const d = new Date(year, month, 0);
    const monthDays = d.getDate();
    const w = new Date(year, month-1, 1);
    let firstWeekDayIndex = w.getDay();
    let index = 1;
    const monthList = [];
    let weekList = [];
    while (firstWeekDayIndex < 7 && index < monthDays + 1) {
      firstWeekDayIndex++;
      weekList.push({
        DayIndex: index,
        IsToday: year === this.nowYear && month === this.nowMonth && index === this.nowDay,
        IsSelected: index === day
      });
      index++;
      if (firstWeekDayIndex === 7) {
        firstWeekDayIndex = 0;
        monthList.push(weekList);
        weekList = [];
      }
      if (index === monthDays + 1) {
        monthList.push(weekList);
        weekList = [];
      }
    }
    this.monthList = monthList;
  }

  goToAddEventPage() {
    const modal = this.modalCtrl.create(AddEventPage, {
      storageId: this.storageId
    });
    modal.onWillDismiss(data => {
      this.getStorage();
    });
    modal.present();
  }

  getStorage() {
    this.storage.get(this.storageId).then(storage => {
      this.eventList = storage;
    })
  }

  edit(text, index) {
    const modal = this.modalCtrl.create(EditEventPage, {
      storageId: this.storageId,
      text: text,
      index: index,
      storage: this.eventList
    });
    modal.onWillDismiss(data => {
      this.getStorage();
    });
    modal.present();
  }

  selectDay(day: number) {
    this.storageId = this.selectedYear.toString() + MonthList[this.selectedMonth] + DayList[day];
    this.setMonthList(this.selectedYear, this.selectedMonth, day);
    this.getStorage();
  }

  delete(index) {
    this.eventList.splice(index, 1);
    this.storage.set(this.storageId, this.eventList);
  }

  goToMainPage() {
    this.navCtrl.popToRoot();
  }


}
