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
    });
  }

  onClearPosts() {
    // Send Http request
  }

  
}
