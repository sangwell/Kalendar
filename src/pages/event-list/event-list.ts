import {Component, ViewChild} from '@angular/core';
import {NavController, ViewController, NavParams} from 'ionic-angular';
import {Storage} from '@ionic/storage';

@Component({
  selector: 'page-event-list',
  templateUrl: 'event-list.html'
})
export class EventListPage {
  storageId: string;
  eventList = [];

  constructor(public navCtrl: NavController,
              public viewCtrl: ViewController,
              public params: NavParams,
              private storage: Storage) {
    this.storageId = params.get('storageId');
    this.getStorage(params.get('storageId'));
  }

  closeModal() {
    this.viewCtrl.dismiss();
  }

  getStorage(storageId) {
    this.storage.get(storageId).then(
      data => {
        if (data) {
          this.eventList = data;
        }
      }
    )
  }

  delete(index) {
    this.eventList.splice(index, 1);
    this.storage.set(this.storageId, this.eventList);
  }


}
