import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { LoadingController } from 'ionic-angular/components/loading/loading-controller';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';
import { HomePage } from '../home/home';
import { ToastController } from 'ionic-angular/components/toast/toast-controller';
import { AlertController } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-register',
  templateUrl: 'register.html'
})
export class RegisterPage {

  registerForm: FormGroup;
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
    this.registerForm = this.formBuilder.group({
      name: ['', Validators.compose([])],
      email: ['', Validators.compose([])],
      phone: ['', Validators.compose([])],
      username: ['', Validators.compose([])],
      password: ['', Validators.compose([])],
      confirmPassword: ['', Validators.compose([])]
    });
    //I didn't know what do here...
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  register() {
    console.log('doRegister');

    this.showLoader();
    console.log(this.registerForm.value);
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
