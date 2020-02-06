import { HttpInterceptor, HttpRequest, HttpHandler } from '@angular/common/http';

// interceptor need to be provided in app module
export class AuthInterceptorService implements HttpInterceptor {
    intercept(req: HttpRequest<any>, next: HttpHandler) {
        // here we can add code run before every or selected http request is send
        if(req.url === 'https://ng-udemy-complete-guide.firebaseio.com/posts.json') {
            console.log('Request sending');
        }
        // changing url is possible by replacing it with modified clone of it
        const modifiedRequest = req.clone({
            headers: req.headers.append('auth', 'xyx')
        });

        // return next.handle(req);
        return next.handle(modifiedRequest);
    }
}