import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'contact-form',
  templateUrl: './contact-form.component.html',
  styleUrls: ['./contact-form.component.css']
})
export class ContactFormComponent{

  contactMethods= [
    {id:1, name: 'email'},
    {id:2, name: 'Phone'},
    {id:3, name: 'Text'},
  ];
  log(x){
    console.log(x);
  }

  submit(y){
    console.log(y);
  }
}
