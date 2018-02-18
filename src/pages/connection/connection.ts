import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AlertController } from 'ionic-angular';

/**
 * Generated class for the ConnectionPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-connection',
  templateUrl: 'connection.html',
})
export class ConnectionPage {

  connectionForm: FormGroup;
  loading: any;
  data: any;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public formBuilder: FormBuilder,
    public alertCtrl: AlertController
  ) {
    this.connectionForm = this.formBuilder.group({
      name: ['', Validators.compose([])],
      password: ['', Validators.compose([])],
      secret: ['', Validators.compose([])]
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ConnectionPage');
  }

  doConnection() {
    console.log('connect');
    let alert = this.alertCtrl.create({
      title: '<h4 text-center> Confirmar Informações </h4>',
      message: '<br><strong>Rede: </strong>' + this.connectionForm.get('name').value + '<br><strong>Senha: </strong>' + this.connectionForm.get('password').value,
      buttons: [
      {
        text: 'Cancelar',
        role: 'cancelar',
        handler: () => {
          console.log('Cancel clicked');
        }
      },
      {
        text: 'Confirmar',
        handler: () => {
          console.log('Confirm clicked');
        }
      }
    ]
    });
    alert.present();
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

}
