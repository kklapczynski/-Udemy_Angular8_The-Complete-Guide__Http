import { Injectable } from '@angular/core';
import { Post } from './post.model';
import { HttpClient, HttpHeaders, HttpParams, HttpEventType } from '@angular/common/http';
import { map, catchError, tap } from 'rxjs/operators';
import { Subject, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PostsService {
  error = new Subject<string>();

  constructor( private http: HttpClient) { }

  onCreatePost(postData: Post) {
    // Send Http request
    this.http
      .post<{name: string}>(                                          // as in http.get and all http methods we can pass here type of response 
        'https://ng-udemy-complete-guide.firebaseio.com/posts.json',
        postData,
        {
          observe: 'response' // with observe we can set observable=data returned by request method, 'body' is a default
        }
      )
      .subscribe(
        responseData => {
          // console.log(responseData);
        },
        error => {
          this.error.next(error.message);
        }
      );
  }
  
  fetchPosts() {
    let httpParams = new HttpParams();
    httpParams = httpParams.append('print', 'pretty');
    httpParams = httpParams.append('customParam', 'customParamValue');
    return this.http
      .get<{ [key: string]: Post }>(
        'https://ng-udemy-complete-guide.firebaseio.com/posts.json',       // http.get is generic method, so we can pass type of returned response as a body - this is optional, but recommended
        {
          headers: new HttpHeaders({'Custom-Header': 'Hello'}),
          // params: new HttpParams().set('print', 'pretty') // = 'https://ng-udemy-complete-guide.firebaseio.com/posts.json?print=pretty'
          params: httpParams,  // check out request URL in 'Networks' tab of browser console with params
          responseType: 'json'  // other types: arraybuffer, blob, text - but they need to match declared data type in get method, here <{js object}>, so only json accepted
        }
      )
      .pipe(
        map( (postsObject) => {  
          const postsArray: Post[] = [];
          for ( const key in postsObject) {
            if(postsObject.hasOwnProperty(key))
              postsArray.push({...postsObject[key], id: key})
          }
          return postsArray;
        }),
        catchError( errorResponse => {
          // some generic error handling in the backgound like sending to analytics server, logging server etc.
          return throwError(errorResponse);
        })
      );
      
  }

  clearPosts() {
    return this.http
      .delete(
        'https://ng-udemy-complete-guide.firebaseio.com/posts.json',
        {
          observe: 'events'
        }
      ).pipe(tap(event => {   // 'tap' is rxjs operator that allows for some code without changing observable
        console.log(event);
        if(event.type === HttpEventType.Sent) {
          // ...
        }

        if(event.type === HttpEventType.Response) {
          console.log(event.body)
        }
      }));
      
  }
}
