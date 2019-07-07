import {Component, ViewChild} from '@angular/core';
import {NavController, NavParams, ModalController, ViewController, AlertController} from 'ionic-angular';
import {Storage} from '@ionic/storage';
import {STORAGE_FLAG} from '../../shared/constant';
import {SettingModel} from '../../shared/interface';

@Component({
  selector: 'page-setting',
  templateUrl: 'setting.html'
})
export class SettingPage {

  setting: SettingModel = {
    yearSpeed: false
  };

  constructor(public viewCtrl: ViewController,
              private storage: Storage,
              public alertCtrl: AlertController) {
    this.getSettings();
  }

  ionViewDidEnter() {
    // this.getStorage();
  }

  showUpdateVersionConfirm() {
    const confirm = this.alertCtrl.create({
      title: '版本更新',
      message: '是否前往App Store获取最新版本？',
      buttons: [
        {
          text: '算了',
          handler: () => {
            console.log('Disagree clicked');
          }
        },
        {
          text: '快速前往',
          handler: () => {
            console.log('Agree clicked');
          }
        }
      ]
    });
    confirm.present();
  }

  getSettings() {
    this.storage.get(STORAGE_FLAG.setting).then(setting => {
      this.setting.yearSpeed = setting ? setting.yearSpeed : false;
    })
  }

  saveSettings() {
    this.storage.set(STORAGE_FLAG.setting, this.setting);
  }

  closeModal() {
    this.viewCtrl.dismiss();
  }

}
