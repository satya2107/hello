import { Component } from '@angular/core';
import { FormGroup, FormArray, FormControl, ValidationErrors, Validators, FormBuilder } from '@angular/forms';

@Component({
  selector: 'new-course-form',
  templateUrl: './new-course-form.component.html',
  styleUrls: ['./new-course-form.component.css']
})
export class NewCourseFormComponent {
  form= new FormGroup({
    topics: new FormArray([])
  })

  form2=new FormGroup({
    name: new FormControl('', Validators.required),
    contact: new FormGroup({
      email : new FormControl(),
      phone: new FormControl()
    }),
    courses : new FormArray([])
  });
    
  form3;
  //THE ABOVE CODE CAN BE REWRITTEN USING A CONSTRUCTOR AND FORMBUILDER CLASS AS BELOW
  constructor( fb : FormBuilder){
    this.form3 = fb.group({
      name : ['', Validators.required],
      contact: fb.group({
        email : [],
        phone : []
      }),
      courses : fb.array([])
    });
  }


  addTopic(topic : HTMLInputElement) {
    this.topics.push(new FormControl(topic.value)); //value is property of html input element and we are adding it as form control under form array.
    topic.value='';
  }

  removeTopic(topic : FormControl){
    let index= this.topics.controls.indexOf(topic);
    this.topics.removeAt(index);
  }

  get topics(){
     return (this.form.get('topics') as FormArray); //this is a abstract control object. it wont have any push method. Push method is only defined in a form array class. so we used as.
  }
  
}
