import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse,
} from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { Injectable } from '@angular/core';

import { environment } from '../../../environments/environment';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  private baseUrl = environment.baseUrl;

  private modifyBody(body: any) {
    // console.log(body);
  }

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    request = request.clone({
      url: `${this.baseUrl}${request.url}`,
      setHeaders: {
        Authorization: `Bearer test_token`,
      },
    });

    return next.handle(request).pipe(
      map((event: HttpEvent<any>) => {
        console.log(event);
        if (event instanceof HttpResponse) {
          event = event.clone({ body: this.modifyBody(event.body) });
        }
        return event;
      })
    );
  }
}
