import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse,
} from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { isPlatformBrowser } from '@angular/common';
import { inject, Injectable, PLATFORM_ID } from '@angular/core';

import { environment } from '../../../environments/environment';
import { AuthCoreService } from '../services/auth-core.service';

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
    const platformId = inject(PLATFORM_ID);
    const accessToken = isPlatformBrowser(platformId)
      ? AuthCoreService.getAccessToken()
      : '';
    // request = request.clone({
    //   url: `${this.baseUrl}${request.url}`,
    //   setHeaders: {
    //     Authorization: `Bearer ${accessToken}`,
    //   },
    // });

    return next.handle(request).pipe(
      map((event: HttpEvent<any>) => {
        if (event instanceof HttpResponse) {
          event = event.clone({ body: this.modifyBody(event.body) });
        }
        return event;
      })
    );
  }
}
