import { Injectable } from "@angular/core";
import { AngularFireDatabase } from "angularfire2/database";
import { Profile } from "../../models/profile";

@Injectable()
export class ProfileListService {

  public profileListRef = this.db.list<Profile>('profile');

  constructor(private db: AngularFireDatabase){

    }
    getProfileList() {
      return this.profileListRef;

  }
}
