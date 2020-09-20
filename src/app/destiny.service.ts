import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AccountStats } from './models/AccountStats';
import { BungieResponse } from './models/BungieResponse';

@Injectable({
  providedIn: 'root'
})
export class DestinyService {
  private api_key:string;
  private bungie_platform_url:string;
  private destiny_platform_url:string;

  private httpOptions;

  constructor(private http:HttpClient) {
    this.api_key = "b213de31702a4919a1930db222b6ac2b";
    this.bungie_platform_url = "https://www.bungie.net/Platform/";
    this.destiny_platform_url = "https://www.bungie.net/Platform/Destiny2/";

    this.httpOptions = {
      headers: new HttpHeaders({
        'X-API-key': this.api_key
      }),
      responseType: 'json',
      observe: 'body'
    }
  }

  getAccountStats(platform:string, membershipId:string){
    const platformId = this.getPlatformCode(platform);

    return this.http.get<BungieResponse>(
      this.destiny_platform_url + `${platformId}/Account/${membershipId}/Stats/`,
      {
        headers: new HttpHeaders({
          'X-API-key': this.api_key
        }),
        responseType: 'json',
        observe: 'body'
      });
  }

  getUserSearch(platform:string, searchValue:string){
    const platformId = this.getPlatformCode(platform);

    return this.http.get<BungieResponse>(
      this.bungie_platform_url + `User/SearchUsers`,
      {
        headers: new HttpHeaders({
          'X-API-key': this.api_key
        }),
        responseType: 'json',
        observe: 'body',
        params:{
          q: searchValue
        }
      });
  }

  getPlayerSearch(platform:string, searchValue:string){
    const platformId = this.getPlatformCode(platform);

    return this.http.get<BungieResponse>(
      this.destiny_platform_url + `SearchDestinyPlayer/${platformId}/${searchValue}`,
      {
        headers: new HttpHeaders({
          'X-API-key': this.api_key
        }),
        responseType: 'json',
        observe: 'body',
        params:{
          returnOriginalProfile: "false"
        }
      });
  }

  private getPlatformCode(platform):number{
    //If the platform passed is already in id form
    if(Number.isInteger(platform)){
      return platform;
    }

    //Map the platform name to the correct bungie code
    var platformId = 0;
    switch (platform.toLowerCase()) {
      case "xbox":
        platformId = 1;
        break;

      case "psn":
        platformId = 2;
        break;

      case "playstation":
        platformId = 2;
        break;

      case "steam":
        platformId = 3;
        break;
      
      case "stadia":
        platformId = 5;
        break;
    
      default:
        platformId = 3;
        break;
    }
    return platformId;
  }
}
