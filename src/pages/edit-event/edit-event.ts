import {Component, ViewChild} from '@angular/core';
import {NavController, ViewController, NavParams} from 'ionic-angular';
import {Storage} from '@ionic/storage';

@Component({
  selector: 'page-edit-event',
  templateUrl: 'edit-event.html'
})
export class EditEventPage {
  text: string;
  storageId: string;
  index: number;

  constructor(public navCtrl: NavController,
              public viewCtrl: ViewController,
              public params: NavParams,
              private storage: Storage) {
    this.storageId = params.get('storageId');
    this.text = params.get('text');
    this.index = params.get('index');
  }

  closeModal() {
    this.viewCtrl.dismiss();
  }

  save() {
    const storage = this.params.get('storage');
    storage[this.index].text=this.text;
    storage[this.index].time=new Date().getTime();
    this.storage.set(this.storageId, storage).then(() => {
      this.viewCtrl.dismiss();
    });
  }


}
