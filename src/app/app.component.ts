import {Component} from '@angular/core';
import {Platform} from 'ionic-angular';
import {StatusBar} from '@ionic-native/status-bar';
import {SplashScreen} from '@ionic-native/splash-screen';
import {SettingService} from '../services/setting.service';
import {HomePage} from '../pages/home/home';
import {MainPage} from '../pages/main/main';
import {YearPage} from '../pages/year/year';
import {MonthPage} from '../pages/month/month';
import {DayPage} from '../pages/day/day';
import {AddEventPage} from '../pages/add-event/add-event';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage: any = MainPage;
  selectedTheme: String;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen,
              public settingService: SettingService) {
    // this.selectedTheme = 'dark-theme';
    this.settingService.getActiveTheme().subscribe(val => this.selectedTheme = val);
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      // statusBar.styleDefault();
      statusBar.overlaysWebView(true);
      statusBar.hide();
      splashScreen.hide();
    });
  }
}
