/* tslint:disable */
/* eslint-disable */
/* Code generated by ng-openapi-gen DO NOT EDIT. */

import { HttpClient, HttpContext } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { BaseService } from '../base-service';
import { ApiConfiguration } from '../api-configuration';
import { StrictHttpResponse } from '../strict-http-response';

import { createVehicle } from '../fn/vehicle-controller/create-vehicle';
import { CreateVehicle$Params } from '../fn/vehicle-controller/create-vehicle';
import { deleteVehicle } from '../fn/vehicle-controller/delete-vehicle';
import { DeleteVehicle$Params } from '../fn/vehicle-controller/delete-vehicle';
import { getAllVehicles } from '../fn/vehicle-controller/get-all-vehicles';
import { GetAllVehicles$Params } from '../fn/vehicle-controller/get-all-vehicles';
import { getVehicleById } from '../fn/vehicle-controller/get-vehicle-by-id';
import { GetVehicleById$Params } from '../fn/vehicle-controller/get-vehicle-by-id';
import { getVehicleImage } from '../fn/vehicle-controller/get-vehicle-image';
import { GetVehicleImage$Params } from '../fn/vehicle-controller/get-vehicle-image';
import { updateVehicle } from '../fn/vehicle-controller/update-vehicle';
import { UpdateVehicle$Params } from '../fn/vehicle-controller/update-vehicle';
import { VehicleEntity } from '../models/vehicle-entity';
import { VehicleResponse } from '../models/vehicle-response';

@Injectable({ providedIn: 'root' })
export class VehicleControllerService extends BaseService {
  constructor(config: ApiConfiguration, http: HttpClient) {
    super(config, http);
  }

  /** Path part for operation `getVehicleById()` */
  static readonly GetVehicleByIdPath = '/api/vehicles/{id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getVehicleById()` instead.
   *
   * This method doesn't expect any request body.
   */
  getVehicleById$Response(params: GetVehicleById$Params, context?: HttpContext): Observable<StrictHttpResponse<VehicleResponse>> {
    return getVehicleById(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `getVehicleById$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getVehicleById(params: GetVehicleById$Params, context?: HttpContext): Observable<VehicleResponse> {
    return this.getVehicleById$Response(params, context).pipe(
      map((r: StrictHttpResponse<VehicleResponse>): VehicleResponse => r.body)
    );
  }

  /** Path part for operation `updateVehicle()` */
  static readonly UpdateVehiclePath = '/api/vehicles/{id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `updateVehicle()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  updateVehicle$Response(params: UpdateVehicle$Params, context?: HttpContext): Observable<StrictHttpResponse<VehicleEntity>> {
    return updateVehicle(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `updateVehicle$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  updateVehicle(params: UpdateVehicle$Params, context?: HttpContext): Observable<VehicleEntity> {
    return this.updateVehicle$Response(params, context).pipe(
      map((r: StrictHttpResponse<VehicleEntity>): VehicleEntity => r.body)
    );
  }

  /** Path part for operation `deleteVehicle()` */
  static readonly DeleteVehiclePath = '/api/vehicles/{id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `deleteVehicle()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteVehicle$Response(params: DeleteVehicle$Params, context?: HttpContext): Observable<StrictHttpResponse<void>> {
    return deleteVehicle(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `deleteVehicle$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteVehicle(params: DeleteVehicle$Params, context?: HttpContext): Observable<void> {
    return this.deleteVehicle$Response(params, context).pipe(
      map((r: StrictHttpResponse<void>): void => r.body)
    );
  }

  /** Path part for operation `getAllVehicles()` */
  static readonly GetAllVehiclesPath = '/api/vehicles';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getAllVehicles()` instead.
   *
   * This method doesn't expect any request body.
   */
  getAllVehicles$Response(params?: GetAllVehicles$Params, context?: HttpContext): Observable<StrictHttpResponse<Array<VehicleEntity>>> {
    return getAllVehicles(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `getAllVehicles$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getAllVehicles(params?: GetAllVehicles$Params, context?: HttpContext): Observable<Array<VehicleEntity>> {
    return this.getAllVehicles$Response(params, context).pipe(
      map((r: StrictHttpResponse<Array<VehicleEntity>>): Array<VehicleEntity> => r.body)
    );
  }

  /** Path part for operation `createVehicle()` */
  static readonly CreateVehiclePath = '/api/vehicles';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `createVehicle()` instead.
   *
   * This method sends `multipart/form-data` and handles request body of type `multipart/form-data`.
   */
  createVehicle$Response(params?: CreateVehicle$Params, context?: HttpContext): Observable<StrictHttpResponse<{
}>> {
    return createVehicle(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `createVehicle$Response()` instead.
   *
   * This method sends `multipart/form-data` and handles request body of type `multipart/form-data`.
   */
  createVehicle(params?: CreateVehicle$Params, context?: HttpContext): Observable<{
}> {
    return this.createVehicle$Response(params, context).pipe(
      map((r: StrictHttpResponse<{
}>): {
} => r.body)
    );
  }

  /** Path part for operation `getVehicleImage()` */
  static readonly GetVehicleImagePath = '/api/vehicles/image/{vehicleId}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getVehicleImage()` instead.
   *
   * This method doesn't expect any request body.
   */
  getVehicleImage$Response(params: GetVehicleImage$Params, context?: HttpContext): Observable<StrictHttpResponse<Blob>> {
    return getVehicleImage(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `getVehicleImage$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getVehicleImage(params: GetVehicleImage$Params, context?: HttpContext): Observable<Blob> {
    return this.getVehicleImage$Response(params, context).pipe(
      map((r: StrictHttpResponse<Blob>): Blob => r.body)
    );
  }

}
