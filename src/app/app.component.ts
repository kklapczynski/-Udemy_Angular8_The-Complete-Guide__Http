import { Component, OnInit, OnDestroy } from '@angular/core';
import { Post } from './post.model';
import { PostsService } from './posts.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
  loadedPosts = [];
  isFetching = false;
  error = null;
  errorSubscription = new Subscription();

  constructor(private postService: PostsService) {}

  ngOnInit() {
    this.errorSubscription = this.postService.error.subscribe(
      errorMessage => {
        this.error = errorMessage;
      }
    )
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
      this.isFetching = false;
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

  ngOnDestroy() {
    this.errorSubscription.unsubscribe();
  }

  onErrorhandling() {
    this.error = null;
  }
  
}
