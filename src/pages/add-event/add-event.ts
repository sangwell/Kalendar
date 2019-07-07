import {Component, ViewChild} from '@angular/core';
import {NavController, ViewController, NavParams} from 'ionic-angular';
import {Storage} from '@ionic/storage';

@Component({
  selector: 'page-add-event',
  templateUrl: 'add-event.html'
})
export class AddEventPage {

  @ViewChild('eventInput') eventInput;
  text: string;
  storageId: string;

  constructor(public navCtrl: NavController,
              public viewCtrl: ViewController,
              public params: NavParams,
              private storage: Storage) {
    this.storageId = params.get('storageId');
  }

  ionViewDidEnter() {
    setTimeout(() => {
      this.eventInput.setFocus();//为输入框设置焦点
    },0);
  }

  closeModal() {
    this.viewCtrl.dismiss();
  }

  save() {
    this.storage.get(this.storageId).then(data => {
      let storageContent;
      if (data) {
        storageContent = data;
      } else {
        storageContent = [];
      }
      if (this.text) {
        storageContent.unshift({
          text: this.text,
          time: new Date().getTime()
        });
        this.storage.set(this.storageId, storageContent).then(() => {
          this.viewCtrl.dismiss();
        });
      }
    })
  }


}
