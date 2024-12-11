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

import { cancelReservation } from '../fn/reservation-controller/cancel-reservation';
import { CancelReservation$Params } from '../fn/reservation-controller/cancel-reservation';
import { checkReservationAvailability } from '../fn/reservation-controller/check-reservation-availability';
import { CheckReservationAvailability$Params } from '../fn/reservation-controller/check-reservation-availability';
import { createReservation } from '../fn/reservation-controller/create-reservation';
import { CreateReservation$Params } from '../fn/reservation-controller/create-reservation';
import { getAllReservations } from '../fn/reservation-controller/get-all-reservations';
import { GetAllReservations$Params } from '../fn/reservation-controller/get-all-reservations';
import { getReservationById } from '../fn/reservation-controller/get-reservation-by-id';
import { GetReservationById$Params } from '../fn/reservation-controller/get-reservation-by-id';
import { getReservationListOfUser } from '../fn/reservation-controller/get-reservation-list-of-user';
import { GetReservationListOfUser$Params } from '../fn/reservation-controller/get-reservation-list-of-user';
import { getReservationStatistics } from '../fn/reservation-controller/get-reservation-statistics';
import { GetReservationStatistics$Params } from '../fn/reservation-controller/get-reservation-statistics';
import { ReservationResponse } from '../models/reservation-response';
import { ReservationStatisticsResponse } from '../models/reservation-statistics-response';

@Injectable({ providedIn: 'root' })
export class ReservationControllerService extends BaseService {
  constructor(config: ApiConfiguration, http: HttpClient) {
    super(config, http);
  }

  /** Path part for operation `createReservation()` */
  static readonly CreateReservationPath = '/api/reservations/create';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `createReservation()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  createReservation$Response(params: CreateReservation$Params, context?: HttpContext): Observable<StrictHttpResponse<ReservationResponse>> {
    return createReservation(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `createReservation$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  createReservation(params: CreateReservation$Params, context?: HttpContext): Observable<ReservationResponse> {
    return this.createReservation$Response(params, context).pipe(
      map((r: StrictHttpResponse<ReservationResponse>): ReservationResponse => r.body)
    );
  }

  /** Path part for operation `checkReservationAvailability()` */
  static readonly CheckReservationAvailabilityPath = '/api/reservations/check-availability';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `checkReservationAvailability()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  checkReservationAvailability$Response(params: CheckReservationAvailability$Params, context?: HttpContext): Observable<StrictHttpResponse<boolean>> {
    return checkReservationAvailability(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `checkReservationAvailability$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  checkReservationAvailability(params: CheckReservationAvailability$Params, context?: HttpContext): Observable<boolean> {
    return this.checkReservationAvailability$Response(params, context).pipe(
      map((r: StrictHttpResponse<boolean>): boolean => r.body)
    );
  }

  /** Path part for operation `getAllReservations()` */
  static readonly GetAllReservationsPath = '/api/reservations';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getAllReservations()` instead.
   *
   * This method doesn't expect any request body.
   */
  getAllReservations$Response(params?: GetAllReservations$Params, context?: HttpContext): Observable<StrictHttpResponse<Array<ReservationResponse>>> {
    return getAllReservations(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `getAllReservations$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getAllReservations(params?: GetAllReservations$Params, context?: HttpContext): Observable<Array<ReservationResponse>> {
    return this.getAllReservations$Response(params, context).pipe(
      map((r: StrictHttpResponse<Array<ReservationResponse>>): Array<ReservationResponse> => r.body)
    );
  }

  /** Path part for operation `getReservationById()` */
  static readonly GetReservationByIdPath = '/api/reservations/{id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getReservationById()` instead.
   *
   * This method doesn't expect any request body.
   */
  getReservationById$Response(params: GetReservationById$Params, context?: HttpContext): Observable<StrictHttpResponse<ReservationResponse>> {
    return getReservationById(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `getReservationById$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getReservationById(params: GetReservationById$Params, context?: HttpContext): Observable<ReservationResponse> {
    return this.getReservationById$Response(params, context).pipe(
      map((r: StrictHttpResponse<ReservationResponse>): ReservationResponse => r.body)
    );
  }

  /** Path part for operation `getReservationStatistics()` */
  static readonly GetReservationStatisticsPath = '/api/reservations/statistics/{MM-yyyy}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getReservationStatistics()` instead.
   *
   * This method doesn't expect any request body.
   */
  getReservationStatistics$Response(params: GetReservationStatistics$Params, context?: HttpContext): Observable<StrictHttpResponse<Array<ReservationStatisticsResponse>>> {
    return getReservationStatistics(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `getReservationStatistics$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getReservationStatistics(params: GetReservationStatistics$Params, context?: HttpContext): Observable<Array<ReservationStatisticsResponse>> {
    return this.getReservationStatistics$Response(params, context).pipe(
      map((r: StrictHttpResponse<Array<ReservationStatisticsResponse>>): Array<ReservationStatisticsResponse> => r.body)
    );
  }

  /** Path part for operation `getReservationListOfUser()` */
  static readonly GetReservationListOfUserPath = '/api/reservations/reservation-list';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getReservationListOfUser()` instead.
   *
   * This method doesn't expect any request body.
   */
  getReservationListOfUser$Response(params?: GetReservationListOfUser$Params, context?: HttpContext): Observable<StrictHttpResponse<Array<ReservationResponse>>> {
    return getReservationListOfUser(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `getReservationListOfUser$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getReservationListOfUser(params?: GetReservationListOfUser$Params, context?: HttpContext): Observable<Array<ReservationResponse>> {
    return this.getReservationListOfUser$Response(params, context).pipe(
      map((r: StrictHttpResponse<Array<ReservationResponse>>): Array<ReservationResponse> => r.body)
    );
  }

  /** Path part for operation `cancelReservation()` */
  static readonly CancelReservationPath = '/api/reservations/cancel/{id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `cancelReservation()` instead.
   *
   * This method doesn't expect any request body.
   */
  cancelReservation$Response(params: CancelReservation$Params, context?: HttpContext): Observable<StrictHttpResponse<ReservationResponse>> {
    return cancelReservation(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `cancelReservation$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  cancelReservation(params: CancelReservation$Params, context?: HttpContext): Observable<ReservationResponse> {
    return this.cancelReservation$Response(params, context).pipe(
      map((r: StrictHttpResponse<ReservationResponse>): ReservationResponse => r.body)
    );
  }

}
