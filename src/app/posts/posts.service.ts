import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';

import { Post } from './post.model';

@Injectable({providedIn: 'root'})
export class PostsService {
  private posts: Post[] = [];
  private postsUpdated = new Subject<Post[]>();
  constructor(private http: HttpClient, private router: Router) {}
  getPosts() {
  this.http.get<{message: string, posts: any}>('http://localhost:3000/api/posts/')
          .pipe(map((postData) => {
            return postData.posts.map(post => {
              return {
                title: post.title,
                content: post.content,
                id: post._id,
              };
            });
          }))
          .subscribe((tfData) => {
            this.posts = tfData;
            this.postsUpdated.next([...this.posts]);
          });
  }

  getPostUpdateListener() {
    return this.postsUpdated.asObservable();
  }
  getPostId(id: string) {
    return {...this.posts.find(p => p.id === id) };
  }
  deletePost(postId: string){
    this.http.delete('http://localhost:3000/api/posts/' + postId)
    .subscribe( () => {
      const updatedPost = this.posts.filter(post => post.id != postId);
      this.posts = updatedPost;
      this.postsUpdated.next([...this.posts]);
      console.log('Deleted!');
    });
  }
  updatePost(id: string, title: string, content: string) {
    const post: Post = {id: id, title: title, content: content};
    console.log('updated values:', post);
    this.http.put('http://localhost:3000/api/posts/' + id, post)
    .subscribe( (result) => {
      // console.log('updated: ', result);
      const updatedPost = [...this.posts];
      const updatedPostIndex = updatedPost.findIndex(p => p.id === post.id);
      updatedPost[updatedPostIndex] = post;
      this.posts = updatedPost;
      this.postsUpdated.next([...this.posts]);
      this.router.navigate(['/']);
    });
  }
  addPost(title: string, content: string) {
    const post: Post = {id: null, title: title, content: content};
    this.http.post<{message: string, postId: string}>('http://localhost:3000/api/posts/', post)
              .subscribe((response) => {
                console.log(response.postId);
                post.id = response.postId;
                this.posts.push(post);
                this.postsUpdated.next([...this.posts]);
                this.router.navigate(['/']);
              });

  }
}
