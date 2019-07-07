import {Component} from '@angular/core';
import {NavController, ModalController} from 'ionic-angular';
import {Storage} from '@ionic/storage';
import {YearPage} from '../year/year';
import {MonthPage} from '../month/month';
import {DayPage} from '../day/day';
import {AddEventPage} from '../add-event/add-event';
import {EventListPage} from '../event-list/event-list';
import {MonthList, DayList, STORAGE_FLAG} from "../../shared/constant";
import {SettingPage} from '../setting/setting';
import {SettingService} from '../../services/setting.service';
import {SettingModel} from '../../shared/interface';

const DATE = new Date();

@Component({
  selector: 'page-main',
  templateUrl: 'main.html'
})
export class MainPage {
  index = 0;
  nowYear;
  nowYearDisplay;
  nowMonth;
  nowMonthDisplay;
  nowDay;
  nowDayDisplay;
  storageId: string;
  storageLength: number;
  selectedTheme: string;
  yearSpeed: number;
  setting: SettingModel = {
    yearSpeed: false
  };

  constructor(public navCtrl: NavController,
              public modalCtrl: ModalController,
              private storage: Storage,
              private settingService: SettingService) {
    this.getSettings();
    this.nowYear = DATE.getFullYear();
    this.nowYearDisplay = this.nowYear.toString().split('').join(' ');
    this.nowMonth = DATE.getMonth() + 1;
    this.nowMonthDisplay = this.nowMonth.toString().split('').join(' ');
    this.nowDay = DATE.getDate();
    this.nowDayDisplay = this.nowDay.toString().split('').join(' ');
    this.storageId = this.nowYear.toString() + MonthList[this.nowMonth] + DayList[this.nowDay];
    this.getStorageLength();
    this.settingService.getActiveTheme().subscribe(val => {
      this.selectedTheme = val;
    });
    this.yearSpeed = ((this.nowMonth - 1) * 30 + this.nowDay) / 365 * 100;
  }

  goToYearPage() {
    this.navCtrl.push(YearPage, {
      year: this.nowYear
    });
  }

  goToMonthPage() {
    this.navCtrl.push(MonthPage, {
      year: this.nowYear
    })
  }

  goToDayPage() {
    const param = {
      year: this.nowYear,
      month: this.nowMonth
    };
    console.log(param);
    this.navCtrl.push(DayPage, param);
  }

  selectDayBefore() {
    this.index--;
    this.setNewDate();
  }

  selectDayNext() {
    this.index++;
    this.setNewDate();
  }

  goToNowDate() {
    this.index = 0;
    this.setNewDate();
  }

  setNewDate() {
    const currentDate = new Date();
    const newDate = new Date(currentDate.getTime() + 24 * 60 * 60 * 1000 * this.index);
    this.nowYear = newDate.getFullYear();
    this.nowYearDisplay = this.nowYear.toString().split('').join(' ');
    this.nowMonth = newDate.getMonth() + 1;
    this.nowMonthDisplay = this.nowMonth.toString().split('').join(' ');
    this.nowDay = newDate.getDate();
    this.nowDayDisplay = this.nowDay.toString().split('').join(' ');

    this.storageId = this.nowYear.toString() + MonthList[this.nowMonth] + DayList[this.nowDay];
    this.getStorageLength();
  }

  addEvent() {
    const modal = this.modalCtrl.create(AddEventPage, {
      storageId: this.storageId
    });
    modal.onWillDismiss(data => {
      this.getStorageLength();
    });
    modal.present();
  }

  getStorageLength() {
    this.storage.get(this.storageId).then(
      data => {
        if (!data) {
          this.storageLength = 0;
        } else {
          this.storageLength = data.length;
        }
      }
    )
  }

  goToEventListPage() {
    if (this.storageLength === 0) {
      return;
    }
    const modal = this.modalCtrl.create(EventListPage, {
      storageId: this.storageId
    });
    modal.onWillDismiss(data => {
      this.getStorageLength();
    });
    modal.present();
  }

  goToSettingPage() {
    const modal = this.modalCtrl.create(SettingPage);
    modal.onWillDismiss(data => {
      this.getSettings();
    });
    modal.present();
  }

  getSettings() {
    this.storage.get(STORAGE_FLAG.setting).then(setting => {
      if (setting) {
        this.setting = setting;
      } else {
        this.setting = {
          yearSpeed: false
        };
      }
    })
  }

  switchTheme() {
    // this.settingService.setActiveTheme('dark-theme');
    if (this.selectedTheme === 'default-theme') {
      this.settingService.setActiveTheme('dark-theme');
    } else {
      this.settingService.setActiveTheme('default-theme');
    }
  }

}
