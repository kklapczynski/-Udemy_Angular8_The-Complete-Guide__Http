import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Post } from './post.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  loadedPosts = [];

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.fetchPosts();
  }

  onCreatePost(postData: Post) {
    // Send Http request
    this.http
      .post<{name: string}>(                                          // as in http.get and all http methods we can pass here type of response 
        'https://ng-udemy-complete-guide.firebaseio.com/posts.json',
        postData
      )
      .subscribe(responseData => {
        console.log(responseData);
      });
  }

  onFetchPosts() {
    // Send Http request
    this.fetchPosts();
  }

  onClearPosts() {
    // Send Http request
  }

  private fetchPosts() {
    this.http.get<{ [key: string]: Post }>('https://ng-udemy-complete-guide.firebaseio.com/posts.json')     // http.get is generic method, so we can pass type of returned response as a body - this is optional, but recommended
      .pipe(map( (postsObject) => {                                                                       // thanks to above "postObject" type is known - was attached to "http.get" method
        const postsArray: Post[] = [];
        for ( const key in postsObject) {
          if(postsObject.hasOwnProperty(key))
            postsArray.push({...postsObject[key], id: key})
        }
        return postsArray;
      }))
      .subscribe( (posts: Post[]) => console.log(posts));
  }
}
