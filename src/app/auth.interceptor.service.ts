import { HttpInterceptor, HttpRequest, HttpHandler, HttpEventType } from '@angular/common/http'
import { tap } from 'rxjs/operators';
import { connectableObservableDescriptor } from 'rxjs/internal/observable/ConnectableObservable';

export class AuthInterceptorService implements HttpInterceptor {
    intercept(req: HttpRequest<any>, next: HttpHandler) {
        console.log("Request is on it's way.");
        console.log(req.method);
        const modifiedRequest = req.clone({ headers: req.headers.append('Auth', 'xyz') })
        return next.handle(modifiedRequest).pipe(
            tap((event) => {
                if (event.type === HttpEventType.Response) {
                    console.log("From Interceptor : Response arrived. Body Data. ");
                    console.log(event.body);
                }
            })
        );
    }
}
