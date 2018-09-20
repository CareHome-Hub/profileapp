import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth'

import { AngularFireDatabase, AngularFireObject } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';
import { Profile } from '../../models/profile';

/**
 * Generated class for the HomePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage {

  profileData: AngularFireObject<Profile>

  constructor(private afAth: AngularFireAuth, private afDatabase:AngularFireDatabase, public toast: ToastController,
    public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    this.afAth.authState.subscribe(data => {
      if (data && data.email && data.uid) {
        this.toast.create({
          message: `Welcome to your profile, ${data.email}`,
          duration: 4000
        }).present();
        this.profileData = this.afDatabase.object(`profile/${data.uid}`)
      }
      else {
        this.toast.create({
          message: 'You are not authenticated',
          duration: 4000
        }).present();
      }
    }
    );
  }
}
