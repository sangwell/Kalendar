import {Injectable} from '@angular/core';
import {BehaviorSubject} from "rxjs/BehaviorSubject";

@Injectable()
export class SettingService {
  theme: BehaviorSubject<string>;

  constructor() {
    //默认初始值
    this.theme = new BehaviorSubject('default-theme');
  }

  setActiveTheme(val) {
    //新值
    this.theme.next(val);
  }

  getActiveTheme() {
    //观察
    return this.theme.asObservable();
  }
}
