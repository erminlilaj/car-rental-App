/* tslint:disable */
/* eslint-disable */
/* Code generated by ng-openapi-gen DO NOT EDIT. */

import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { ReservationStatisticsResponse } from '../../models/reservation-statistics-response';

export interface GetReservationStatistics$Params {
  'MM-yyyy': string;
}

export function getReservationStatistics(http: HttpClient, rootUrl: string, params: GetReservationStatistics$Params, context?: HttpContext): Observable<StrictHttpResponse<Array<ReservationStatisticsResponse>>> {
  const rb = new RequestBuilder(rootUrl, getReservationStatistics.PATH, 'get');
  if (params) {
    rb.path('MM-yyyy', params['MM-yyyy'], {});
  }

  return http.request(
    rb.build({ responseType: 'json', accept: 'application/json', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<Array<ReservationStatisticsResponse>>;
    })
  );
}

getReservationStatistics.PATH = '/api/reservations/statistics/{MM-yyyy}';
