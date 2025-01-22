/* tslint:disable */
/* eslint-disable */
/* Code generated by ng-openapi-gen DO NOT EDIT. */

import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { CreateReservationRequest } from '../../models/create-reservation-request';

export interface CheckReservationAvailability$Params {
      body: CreateReservationRequest
}

export function checkReservationAvailability(http: HttpClient, rootUrl: string, params: CheckReservationAvailability$Params, context?: HttpContext): Observable<StrictHttpResponse<boolean>> {
  const rb = new RequestBuilder(rootUrl, checkReservationAvailability.PATH, 'post');
  if (params) {
    rb.body(params.body, 'application/json');
  }

  return http.request(
    rb.build({ responseType: 'json', accept: 'application/json', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return (r as HttpResponse<any>).clone({ body: String((r as HttpResponse<any>).body) === 'true' }) as StrictHttpResponse<boolean>;
    })
  );
}

checkReservationAvailability.PATH = '/api/reservations/check-availability';
