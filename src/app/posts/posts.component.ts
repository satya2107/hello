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
    this.service.getPost()
      .subscribe(response =>{
        this.posts= response.json();
      })
  }

  createPost(inputTitle : HTMLInputElement){
    let post = { title : inputTitle.value };
    inputTitle.value ='';
    this.service.createPost(post)
      .subscribe( 
        response => {
        post['id']= response.json().id; // if we dont keep id in square bracs it will throw error as we defined only title attribute for post object.
        this.posts.splice(0,0,post); 
      }, 
        (error : Response) => {
        if(error.status===400){
          // this.form.setErrors(error.json());
        }
        else{
        alert('Unexpected error');
        console.log(error)
        }
      });
  }

  updatePost(post){
    this.service.updatePost(post)
      .subscribe (
        response =>{
        console.log(response.json())
      }, 
        error => {
        alert('Unexpected error');
        console.log(error)
      });
   // this.http.put(this.url, JSON.stringify(post))
  }

  deletePost(post){
    this.service.deletePost(post)
      .subscribe(
        response => {
        let index = this.posts.indexOf(post); //finding the index of post
        this.posts.splice(index,1); //deleting using splice method.
      }, 
        (error : Response) => { 
        if(error.status === 404){
          alert('Post already deleted')
        }
        else{
        alert('Unexpected error');
        console.log(error)
        }
      });
  }
  

}
