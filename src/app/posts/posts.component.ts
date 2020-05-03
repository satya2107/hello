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

  //optimistic appraoch
  createPost(inputTitle : HTMLInputElement){
    let post = { title : inputTitle.value };
    this.posts.splice(0,0,post);

    inputTitle.value ='';

    this.service.createOptimistic(post)
      .subscribe( 
        newPost => {
        post['id']= newPost; // if we dont keep id in square bracs it will throw error as we defined only title attribute for post object.
         
      }, 
        (error : AppError) => {
        this.posts.splice(0,1)

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

  //pessimistic approach
  createPostPessimistic(inputTitle : HTMLInputElement){
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

  //pessimistic delete approach
  deletePostPessimistic(post){
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
  
  //optmistic delete approach
  deletePost(post){
    //deleting in UI before server call
    let index = this.posts.indexOf(post); //finding the index of post
    this.posts.splice(index,1); //deleting using splice method.

    this.service.deleteOptimistic(345)
      .subscribe( null,
        (error : AppError) => { 
          this.posts.splice(index,0,post);
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
