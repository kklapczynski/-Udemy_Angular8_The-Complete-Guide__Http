import { HttpInterceptor, HttpRequest, HttpHandler } from '@angular/common/http';
import { tap } from 'rxjs/operators';

export class LoggingInterceptorService implements HttpInterceptor {
    intercept(req: HttpRequest<any>, next: HttpHandler) {
        // here we can do something with request before it'send out of app
        // ...
        console.log('Hey! logging interceptor here in request area!');
        return next
            .handle(req)
            .pipe(
                tap( event => {
                    console.log('Logging interceptor in response');
                })
            );
    }

}