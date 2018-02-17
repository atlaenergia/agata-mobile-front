import { Component, ViewChild } from '@angular/core';
import { Platform, Nav } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../pages/home/home';
import { LoginPage } from '../pages/login/login';
import { AuthServiceProvider } from '../providers/auth-service/auth-service';
import { AlertServiceProvider } from '../providers/alert-service/alert-service';
import { DevicesPage } from '../pages/devices/devices';
@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;


  nome: string = "Savio"
  rootPage:any = LoginPage;
  publicPages: Array<{title: string, component: any, alert?:any, icon: string}>;
  privatePages: Array<{title: string, component: any, icon: string}>;

  constructor(
    platform: Platform, 
    statusBar: StatusBar, 
    splashScreen: SplashScreen,
    public authService: AuthServiceProvider,
    public alertService: AlertServiceProvider
  ) {
    this.privatePages = [
      {title: 'Dispositivos', component: DevicesPage, icon:'outlet'}
    ]

    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });
  }

  ionOpen() {
    console.log('ionOpen');
  }

  openPage(page) {
    this.nav.push(page.component);
  }

  logout() {
    this.alertService.showLoader('Encerrando sessão...');
    this.authService.enableMenu(true, 'unauthenticated');
    this.authService.logout().then((result) => {
      this.alertService.loading.dismiss();
      this.nav.setRoot(LoginPage);
    }, (err) => {
      this.alertService.loading.dismiss();
      this.alertService.presentToast(err);
    });
  }
}

