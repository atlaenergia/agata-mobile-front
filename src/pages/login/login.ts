import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { LoadingController } from 'ionic-angular/components/loading/loading-controller';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';
import { RegisterPage } from '../register/register';
import { HomePage } from '../home/home';
import { ToastController } from 'ionic-angular/components/toast/toast-controller';
import { AlertController } from 'ionic-angular';

/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  loginForm: FormGroup;
  loading: any;
  data: any;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public formBuilder: FormBuilder,
    public loadingCtrl: LoadingController,
    public authService: AuthServiceProvider,
    public alertCtrl: AlertController,
    private toastCtrl: ToastController
  ) {
    this.loginForm = this.formBuilder.group({
      name: ['', Validators.compose([])],
      password: ['', Validators.compose([])]
    });
    if(localStorage.getItem('token')) {
      this.navCtrl.setRoot(HomePage);
      this.authService.enableMenu(true,'authenticated');
    } else {
      this.authService.enableMenu(true,'unauthenticated');
    }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  doLogin() {
    console.log('doLogin');

    this.showLoader();
    this.authService.login(this.loginForm.value).then((result) => {
      this.loading.dismiss();
      console.log(result);
      this.data = result;
      this.authService.enableMenu(true,'authenticated');
      this.navCtrl.setRoot(HomePage);
    },(err) => {
      console.log(err);
      this.loading.dismiss();
      this.presentToast(err);
    })
  }

  register() {
    console.log('register');
    this.navCtrl.push(RegisterPage);
  }

  help() {
    console.log('help');
    let alert = this.alertCtrl.create({
      title: 'Atla Ajuda',
      subTitle: '',
      buttons: ['OK']
    });
    alert.present();

  }

  showLoader(){
    this.loading = this.loadingCtrl.create({
      content: 'Autenticando...'
    });
    this.loading.present();
  }

  presentToast(msg) {
    let toast = this.toastCtrl.create({
      message: msg,
      duration: 3000,
      position: 'bottom',
      dismissOnPageChange: true
    });

    toast.onDidDismiss(() => {
      console.log('Dismissed toast');
    });

    toast.present();
  }

}
