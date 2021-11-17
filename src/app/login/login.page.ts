import { Component } from '@angular/core';
import {  FormControl, FormGroup, Validators } from '@angular/forms';
import { ModalController, NavController, NavParams,ToastController } from '@ionic/angular';
import { BASE_API_URL } from 'src/environments/environment';
import { GalleryPage } from '../gallery/gallery.page';
import { RegisterPage } from '../register/register.page';



const username = document.getElementById("username");
const usernameText = document.getElementById("usernameText");
const password = (document.getElementById("password") as HTMLInputElement);


// var formattedEmail
let members = [];
let availableMembers = [];
let currValArr = [];
let currVal = "";
let passwordInsert = "";

fetch(BASE_API_URL+"/member-info/all")

.then(res =>{
  return res.json();
}).then(loadedMembers =>
{  
  members =  loadedMembers.payload.map( loadedMember =>
  {
     const formattedEmail = 
    {
      memberEmail: loadedMember.memberEmail
            
    };
    for (var memberEmail in loadedMember) {
      availableMembers.push(loadedMember[memberEmail]);
      // console.log(availableMembers);
  }
    // availableMembers.push(formattedEmail)
    
    
  });  
}).catch(err =>{
  // console.log(err);
});
// console.log(members);


@Component({
  selector: 'app-login',
  templateUrl: 'login.page.html',
  styleUrls: ['login.page.scss'],
})
export class LoginPage {
  
  myform: FormGroup;


  constructor(private modalController:ModalController , public navParams: NavParams, private toastCtrl:ToastController){
    this.myform = new FormGroup({
      
        email: new FormControl('',Validators.email),
        password: new FormControl('',[Validators.required,Validators.minLength(6)])

      
    })
    }


  back(){
   this.modalController.dismiss();
 }
 
 async gallery(){
 
  const modal = await this.modalController.create({
    component: GalleryPage,
    cssClass:'modal-fullscreen',
    id:'GalleryPage'
  });
  this.presentSuccessToast();
return await modal.present();

}
async Register(){
 
  const modal = await this.modalController.create({
    component: RegisterPage,
    cssClass:'modal-fullscreen',
    id:'RegisterPage'
  });
return await modal.present();

}

async presentErrorToast() {
  let toast = this.toastCtrl.create({
    message: 'Email or password invalid!',
    duration: 3000,
    position: 'bottom',
    color: "danger"
  });
  return (await toast).present();
}
async presentSuccessToast() {
  let toast = this.toastCtrl.create({
    message: 'Logged in!',
    duration: 3000,
    position: 'bottom',
    color: "success"
  });
  return (await toast).present();
}


 getMemberEmail(username: string, password: string){
  let loggedin: boolean = false;
   currValArr.length = 0;
   currVal = username;
   passwordInsert = password;
   currValArr.push(""+currVal);
   currValArr.push(""+passwordInsert);
   console.dir(currValArr);

   for (let index = 3; index < availableMembers.length; index = index+4) {
    const element = availableMembers[index];
    console.log(JSON.stringify(element));
    

    if(currValArr[0] == availableMembers[index] && password == "Romeo")
   {
     loggedin = true;
    this.gallery();
   }

   }
   if(!loggedin)
   {
     this.presentErrorToast();
   }
  }

   
}
