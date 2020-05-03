import { BadInput } from './../common/validators/bad-input';
import { NotFoundError } from './../common/validators/not-found-error';
import { AppError } from './../common/validators/app-error';
import { Component, OnInit } from '@angular/core';
import { ThrowStmt } from '@angular/compiler';
import { PostService } from '../services/post.service';

@Component({
  selector: 'posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
})
export class PostsComponent implements OnInit {
  posts: any;
  constructor(private service: PostService ) { 
    
  }

  ngOnInit(): void {
    this.service.getAll()
      .subscribe(posts => this.posts= posts);
      // error => {
      //   alert('unexpected error')
      //   console.log(error)
  }

  createPost(inputTitle : HTMLInputElement){
    let post = { title : inputTitle.value };
    inputTitle.value ='';
    this.service.create(post)
      .subscribe( 
        newPost => {
        post['id']= newPost.id; // if we dont keep id in square bracs it will throw error as we defined only title attribute for post object.
        this.posts.splice(0,0,post); 
      }, 
        (error : AppError) => {
        if(error instanceof BadInput){
           //this.form.setErrors(error.originalError);
        }
        else{
        //alert('Unexpected error');
        //console.log(error)
        throw error;
        }
      });
  }

  updatePost(post){
    this.service.update(post)
      .subscribe (
        updatedPost =>{
        console.log(updatedPost)
      }); 
        // error => {
        // alert('Unexpected error');
        // console.log(error)
      //});
   // this.http.put(this.url, JSON.stringify(post))
  }

  deletePost(post){
    this.service.delete(345)
      .subscribe(
        () => { //the empty paranthesis is due to the fact that deletePost will not return any object/response.
        let index = this.posts.indexOf(post); //finding the index of post
        this.posts.splice(index,1); //deleting using splice method.
      }, 
        (error : AppError) => { 
        if(error instanceof NotFoundError){
          alert('Post already deleted')  //catching a response object and thrwoing an AppError or NotFoundError(which is also derived from AppError) through the observable of service.
        }
        else{
        //alert('Unexpected error');
        //console.log(error)
        throw error;
        }
      });
  }
  

}
