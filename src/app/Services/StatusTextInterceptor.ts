import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from "@angular/common/http";
import { Observable, catchError, throwError } from "rxjs";

export class CustomErrorHttpInterceptor implements HttpInterceptor {

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      catchError((httpErrorResponse: HttpErrorResponse) => {
        const newHttpErrorResponse = new HttpErrorResponse({
          error: httpErrorResponse.error,
          headers: httpErrorResponse.headers,
          status: httpErrorResponse.status,
          statusText: 'Failed Attempt',
        });

        return throwError(() => newHttpErrorResponse); 
      }));
  }
}
