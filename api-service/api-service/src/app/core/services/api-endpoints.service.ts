import { QueryStringParameters } from './../../shared/classes/query-string-parameters';
import { UrlBuilder } from './../../shared/classes/url-builder';
import { Constants } from './../../config/constants';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiEndpointsService {

  constructor(
    private constants: Constants
  ) { }

  // URL
  private createUrl(action: string, isMockAPI: boolean = false): string {
    const urlBuilder: UrlBuilder = new UrlBuilder(
      isMockAPI ? this.constants.API_MOCK_ENDPOINT : this.constants.API_ENDPOINT, action
    );
    return urlBuilder.toString();
  }

  //URL with Query Parameters
  private createUrlWithQueryParameters(
    action: string, 
    queryStringHandler?: (queryString: QueryStringParameters) => void): string {
      const urlBuilder: UrlBuilder = new UrlBuilder(
        this.constants.API_ENDPOINT, action
      );
      if (queryStringHandler) {
        queryStringHandler(urlBuilder.queryString);
      }
      return urlBuilder.toString();
  }

  //URL with Path Variables
  private createUrlWithPAthVariables(
    action: string,
    pathVariables: any[] = []
  ): string {
    let encodedPathVariablesUrl: string = '';
    for (const pathVariable of pathVariables) {
      if (pathVariable !== null) {
        encodedPathVariablesUrl += `/${encodeURIComponent(pathVariable.toString())}`;
      }
    }
    const urlBuilder: UrlBuilder = new UrlBuilder(this.constants.API_ENDPOINT, `${action}${encodedPathVariablesUrl}`);
    return urlBuilder.toString();
  }
}
