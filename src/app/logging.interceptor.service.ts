import { HttpInterceptor, HttpRequest, HttpHandler } from '@angular/common/http';

export class LoggingInterceptorService implements HttpInterceptor {

    intercept(req: HttpRequest<any>, next: HttpHandler) {

        if (req.method === "DELETE") {
            console.log("From Logging Interceptor : Delete triggerred");

        }
        return (next.handle(req));
    }
}