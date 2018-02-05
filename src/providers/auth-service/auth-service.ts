import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import { MenuController } from 'ionic-angular/components/app/menu-controller';

/*
  Generated class for the AuthServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
let apiUrl = 'api';

@Injectable()
export class AuthServiceProvider {

  constructor(
    public http: Http,
    public menuCtrl: MenuController
  ) {
    console.log('Hello AuthServiceProvider Provider');
  }

  login(credentials) {
    return new Promise((resolve, reject) => {
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');

        this.http.post(apiUrl+'/authenticate', JSON.stringify(credentials), {headers: headers})
          .subscribe(res => {
            if(res.json().success) {
              localStorage.setItem('token',res.json().token);
              resolve();
            } else {
              console.log('err: ' + res.json().msg);
              reject(res.json().msg);
            }
            resolve(res.json());
          }, (err) => {
            reject(err);
          });
    });
  }

  logout(){
    return new Promise((resolve, reject) => {
        let headers = new Headers();
        headers.append('Authorization', localStorage.getItem('token'));

        this.http.get(apiUrl+'/memberinfo', {headers: headers})
          .subscribe(res => {
            console.log(res.json());
            localStorage.clear();
            resolve(res.json());
          }, (err) => {
            console.log(err);
            reject(err);
          });
    });
  }

  enableMenu(state, name) {
    this.menuCtrl.enable(state, name);
  }

}
