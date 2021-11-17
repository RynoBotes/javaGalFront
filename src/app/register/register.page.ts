import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { HomePage } from '../home/home.page';
import { BASE_API_URL } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';


let members = [];



@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage {
  

  constructor(private modalController:ModalController, public http:HttpClient){}
  


  back(){
   this.modalController.dismiss();
 }
 async home(){
  const modal = await this.modalController.create({
    component: HomePage,
    cssClass:'modal-fullscreen',
    id:'HomePage'
  });
  return await modal.present();
}
addmember= ()=>{
  // ev.preventDefault();
let member ={
  memberId:  (<HTMLInputElement>document.getElementById('memberId')).value,
 memberFName: (<HTMLInputElement>document.getElementById('memberFName')).value,
 memberLName: (<HTMLInputElement>document.getElementById('memberLName')).value,
 memberEmail: (<HTMLInputElement>document.getElementById('memberEmail')).value
}
  

  fetch(BASE_API_URL+"member-info",{method:'POST',body: JSON.stringify(member),headers: {
		'Content-type': 'application/json; charset=UTF-8'
	}
}).then(function (response) {
	if (response.ok) {
		return response.json();
	}
	return Promise.reject(response);
}).then(function (data) {
	console.log(data);
}).catch(function (error) {
	console.warn('Something went wrong.', error);
});;
  // members.push(member);
  document.forms[0].reset();

  console.warn(JSON.stringify(member));
  

}

}



// document.addEventListener('DOMContentLoader', () =>{
//   document.getElementById('registerbtn').addEventListener('click',addmember);
// });
