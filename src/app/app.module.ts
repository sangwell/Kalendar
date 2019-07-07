import {NgModule, ErrorHandler} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {IonicApp, IonicModule, IonicErrorHandler} from 'ionic-angular';
import {MyApp} from './app.component';

import {HomePage} from '../pages/home/home';
import {MainPage} from '../pages/main/main';
import {YearPage} from '../pages/year/year';
import {MonthPage} from '../pages/month/month';
import {DayPage} from '../pages/day/day';
import {AddEventPage} from '../pages/add-event/add-event';
import {EditEventPage} from '../pages/edit-event/edit-event';
import {EventListPage} from '../pages/event-list/event-list';
import {SettingPage} from '../pages/setting/setting';

import {SettingService} from '../services/setting.service';
import {StatusBar} from '@ionic-native/status-bar';
import {SplashScreen} from '@ionic-native/splash-screen';
import {IonicStorageModule} from '@ionic/storage';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    MainPage,
    YearPage,
    MonthPage,
    DayPage,
    AddEventPage,
    EditEventPage,
    EventListPage,
    SettingPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp, {swipeBackEnabled: true}),
    IonicStorageModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    MainPage,
    YearPage,
    MonthPage,
    DayPage,
    AddEventPage,
    EditEventPage,
    EventListPage,
    SettingPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    SettingService
  ]
})
export class AppModule {
}
