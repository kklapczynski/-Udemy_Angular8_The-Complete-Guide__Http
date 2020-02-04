import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Post } from './post.model';
import { PostsService } from './posts.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  loadedPosts = [];
  isFetching = false;
  error = null;

  constructor(private postService: PostsService) {}

  ngOnInit() {
  }

  onCreatePost(postData: Post) {
    this.postService.onCreatePost(postData);
  }

  onFetchPosts() {
    this.isFetching = true;
    // Send Http request
    this.postService.fetchPosts().subscribe( (posts: Post[]) => {
        this.isFetching = false;
        this.loadedPosts = posts;
    },
    error => {
      this.error = error.message;
      console.log(error);
    }
    );
  }

  onClearPosts() {
    // Send Http request
    this.postService.clearPosts().subscribe( () => {  // here we just care that delete succeeds - don't do anything with response
      this.loadedPosts = [];
    });
  }

  
}
