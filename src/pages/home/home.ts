import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth';
import { Observable } from 'rxjs/Observable';
import { AngularFireDatabase, AngularFireObject } from 'angularfire2/database';
import { Profile } from '../../models/profile';

import { ProfileListService } from "../../services/profile-list/profile-list.service";
import { map } from 'rxjs/operators/map';


@IonicPage()
@Component({
  selector: "page-home",
  templateUrl: "home.html"
})
export class HomePage {

  public profileList$: Observable<Profile[]>;

  constructor(public profile: ProfileListService, private afAth: AngularFireAuth, public toast: ToastController, public navCtrl: NavController, public navParams: NavParams
  )  {
  }

  ngOnInit() {
    this.profileList$ = this.profile
    .getProfileList()
    .snapshotChanges()
    .pipe(
        map(items => { // this needs to be imported with: import { map } from 'rxjs/operators';
        return items.map(a => {
          const data = a.payload.val();
          const key = a.payload.key;
          return {key, ...data};
        });
    }));

  }


  ionViewWillLoad() {
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

