import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpResponse,
  HttpHandler,
  HttpEvent,
  HttpErrorResponse, HttpHeaders
} from '@angular/common/http';

import { Observable, throwError } from 'rxjs';
import {map, catchError, retry, tap} from 'rxjs/operators';
import {error} from 'util';
import {Router} from '@angular/router';

@Injectable()
export class HttpconfigInterceptor implements HttpInterceptor {

  constructor(
    private router: Router
  ) {}
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // Clone the request to add the new header
    let headers = new HttpHeaders({
      clientId: '175'
    });
    if (localStorage.getItem('idtableUserId')) {
      headers = headers.set('userid', localStorage.getItem('idtableUserId'));
    }
    const cloneReq = req.clone({headers});
    // Pass the cloned request instead of the original request to the next handle
    return next.handle(cloneReq).pipe(catchError(err => {
      if (err && err.status === 400) {
       localStorage.removeItem('idtableUserId');
       this.router.navigate(['/login']);
      }
      const errorMessage = err.error.message || err.statusText;
      return throwError(errorMessage);
    }))
    ;
  }
}




