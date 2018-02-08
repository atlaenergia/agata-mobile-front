import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { HttpClientModule } from '@angular/common/http';
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { LoginPage } from '../pages/login/login';
import { LoginPageModule } from '../pages/login/login.module';
import { AuthServiceProvider } from '../providers/auth-service/auth-service';
import { HttpModule} from '@angular/http';
import { RegisterPageModule } from '../pages/register/register.module';
import { RegisterPage } from '../pages/register/register';
// import { HelpPage } from '../pages/help/help';
import { AlertServiceProvider } from '../providers/alert-service/alert-service';

@NgModule({
  declarations: [
    MyApp,
    HomePage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp,{
      platforms: {
        ios: {
          backButtonText: 'Voltar',
        }
      }
    }),
    LoginPageModule,
    HttpModule,
    HttpClientModule,
    RegisterPageModule
    // HelpPageModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    LoginPage,
    RegisterPage
    // HelpPage    
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    AuthServiceProvider,
    AlertServiceProvider
  ]
})
export class AppModule {}
