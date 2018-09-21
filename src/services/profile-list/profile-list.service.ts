import { Injectable } from "@angular/core";
import { AngularFireDatabase } from "angularfire2/database";
import { Profile } from "../../models/profile";

@Injectable()
export class ProfileListService {

    private profileListRef = this.db.list<Profile>('profile-list');

  constructor(private db: AngularFireDatabase){

    }
    getProfileList() {
      return this.profileListRef;

  }
}
