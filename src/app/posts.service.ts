import { Injectable } from '@angular/core';
import { Post } from './post.model';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PostsService {
  
  constructor( private http: HttpClient) { }

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
  
  fetchPosts() {
    
    return this.http.get<{ [key: string]: Post }>('https://ng-udemy-complete-guide.firebaseio.com/posts.json')     // http.get is generic method, so we can pass type of returned response as a body - this is optional, but recommended
      .pipe(map( (postsObject) => {  
        console.log(postsObject);                                                                     // thanks to above "postObject" type is known - was attached to "http.get" method
        const postsArray: Post[] = [];
        for ( const key in postsObject) {
          if(postsObject.hasOwnProperty(key))
            postsArray.push({...postsObject[key], id: key})
        }
        return postsArray;
      }));
      
  }
}
