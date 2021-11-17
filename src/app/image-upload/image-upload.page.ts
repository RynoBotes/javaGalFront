import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { BASE_API_URL } from 'src/environments/environment';

@Component({
  selector: 'app-image-upload',
  templateUrl: './image-upload.page.html',
  styleUrls: ['./image-upload.page.scss'],
})
export class ImageUploadPage {

  constructor(private modalController:ModalController, public http:HttpClient) {
    
   }

  addphoto= ()=>{
    // ev.preventDefault();
  let photo ={
    id:  (<HTMLInputElement>document.getElementById('memberId')).value,
   blobLocation: (<HTMLInputElement>document.getElementById('bloblocation')).value,
   photoName: (<HTMLInputElement>document.getElementById('photoName')).value,
   photoDiscription: (<HTMLInputElement>document.getElementById('photoDescription')).value
  }
    
  
    fetch(BASE_API_URL+"photo-map",{method:'POST',body: JSON.stringify(photo),headers: {
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
  
    console.warn(JSON.stringify(photo));
    
  
  }

  deletePhoto = () =>{
    let id;

    id = (<HTMLInputElement>document.getElementById('photoId')).value,


    fetch(BASE_API_URL+"photo-map/delete/"+id, {headers: {
    'Content-type': 'application/json; charset=UTF-8'
  }
})
.then(res => res.text()) // or res.json()
.then(res => console.log(res))
  }

}
