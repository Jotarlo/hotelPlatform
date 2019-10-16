import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { UserModel } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})

export class SecurityService {

  userInfo = new BehaviorSubject<UserModel>(new UserModel());

  constructor() {
    this.verifyUserInSession();
  }

  verifyUserInSession() {
    let session = localStorage.getItem("activeUser");
    if(session != undefined){
      this.userInfo.next(JSON.parse(session));
    }
  }

  getUserInfo() {
    return this.userInfo.asObservable();
  }

  loginUser(username: String, pass: String) {
    let tb_user = JSON.parse(localStorage.getItem("tb_users"));
    let user = tb_user.find(u => u.email == username && u.password == pass);

    if (user != undefined) {
      user.isLogged = true;
      this.userInfo.next(user);
      localStorage.setItem("activeUser", JSON.stringify(user));
    }
    return user;
  }

  isActiveSession(){
    return this.userInfo.getValue().isLogged;
  }

  logoutUser(){
    localStorage.removeItem("activeUser");
    this.userInfo.next(new UserModel());
  }


}
