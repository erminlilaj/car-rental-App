/* tslint:disable */
/* eslint-disable */
/* Code generated by ng-openapi-gen DO NOT EDIT. */

import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { VehicleEntity } from '../../models/vehicle-entity';

export interface GetVehicleById$Params {
  id: number;
}

export function getVehicleById(http: HttpClient, rootUrl: string, params: GetVehicleById$Params, context?: HttpContext): Observable<StrictHttpResponse<VehicleEntity>> {
  const rb = new RequestBuilder(rootUrl, getVehicleById.PATH, 'get');
  if (params) {
    rb.path('id', params.id, {});
  }

  return http.request(
    rb.build({ responseType: 'blob', accept: '*/*', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<VehicleEntity>;
    })
  );
}

getVehicleById.PATH = '/api/vehicles/{id}';
