
import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { LoginPage } from '../login/login.page';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage {

  constructor(private modalController:ModalController){}


 async login(){
  const modal = await this.modalController.create({
    component: LoginPage,
    cssClass:'modal-fullscreen',
    id:'LoginPage'
  });
  return await modal.present();
}
}


