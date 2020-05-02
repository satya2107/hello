import { CoursesService } from './course/courses.service';
//import component from angular core
import {Component} from '@angular/core';
//define component decorator
@Component({
selector:'courses', //rendered in html, name of the component, ex: <div id="#courses">
// template: '<h2>{{"Title: " + getTitle()}}<h2>' //string interpolation
/*template: `
    <h2>{{title}}</h2> // string interpolation 
    <button class="btn btn-primary">Save</button> //bootsrap button
    <button [style.backgroundColor]="isActive ? 'Blue' : 'Red'">Click</button> //style binding
    <ul> 
        <li *ngFor="let course of courses">
        {{course}}
        </li>
    </ul>
    <input (keyup.enter)="onKeyUp($event)"/> //event binding
    <input #email (keyup.enter)="onKeyNewUp(email.value)"/> 
    <input [value]="myemail" (keyup.enter)="myemail = $event.target.value; onKeyUptwowaybinding()"/>
    <input [(ngModel)]="myemail" (keyup.enter)="onKeyUptwowaybinding()"/>
    <img src="{{ imageUrl }}" />
    <img [src]="title"/>

`*/
template:`
    {{course.title | uppercase | lowercase}} <br/>
    {{course.students | number}} <br/>
    {{course.rating | number:'2.1-2'}} <br/>
    {{course.releaseDate | date:'shortDate'}} <br/>
    {{course.price | currency:'INR':true:'3.2-2'}} <br/>
    {{course.text | summary:10}}
`
})
//define class written in ts
export class CoursesComponent{
    /*
    set 1 example
    title="List of courses";
    courses;
    isActive=true;
    myemail="me@ex.com";
    imageUrl="https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885_1280.jpg";

    //Decoupled courses component from courses service
    
    constructor(service: CoursesService) {
        this.courses=service.getCourses();
    }
    onKeyNewUp(email){
        console.log("enter clicked");
        console.log(email); //usage of template variables to get value from template
        //to get input value of variable passed type 1
    }
    onKeyUp($event){
        console.log("enter clicked");
        console.log($event.target.value); //to get input value of variable passed type 1
    }

    onKeyUptwowaybinding(){
        console.log(this.myemail);
    }
    //getTitle(){
   //     return  this.title;
//    }
*/

//pipes example - system pipes
course={
    title: "The complete Angular",
    rating:4.6754,
    students:45689,
    price:201.34,
    releaseDate: new Date(2016,3,1),
    text: "Leela Naga Satyanarayana Singh Kshatri"
}
}