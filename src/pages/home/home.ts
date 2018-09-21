import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth';
import { Observable } from 'rxjs/Observable';
import { AngularFireDatabase, AngularFireObject } from 'angularfire2/database';
import { Profile } from '../../models/profile';


import { Profile } from "../../models/profile";
import { ProfileListService } from "../../services/profile-list/profile-list.service";

@IonicPage()
@core.Component({
  selector: "page-home",
  templateUrl: "home.html"
})
export class HomePage {
  profileList$: Observable<Profile[]>;

  constructor(
    private profile: ProfileListService,
    private afAth: AngularFireAuth,
    public toast: ToastController,
    public navCtrl: NavController,
    public navParams: NavParams
  ) {this.profileList$ = this.profile
    .getProfileList()
    .valueChanges()}

  ionViewDidLoad() {
    this.afAth.authState.subscribe(data => {
      if (data && data.email && data.uid)
      {
        this.toast
          .create({
            message: `Welcome to your profile  ${data.email}`,
            duration: 4000
          })
          .present();



      } else {
        this.toast
          .create({
            message: "You are not authenticated",
            duration: 4000
          })
          .present();
      }
    });
  }
}
