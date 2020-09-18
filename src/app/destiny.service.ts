import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AccountStats } from './models/AccountStats';

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
    var platformId = 0;
    switch (platform.toLowerCase()) {
      case "xbox":
        platformId = 1;
        break;

      case "psn":
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
    
    //var stats = "";

    return this.http.get<AccountStats>(
      this.destiny_platform_url + `${platformId}/Account/${membershipId}/Stats/`,
      {
        headers: new HttpHeaders({
          'X-API-key': this.api_key
        }),
        responseType: 'json',
        observe: 'body'
      });/*
    .toPromise()
    .then((res:{Response}) => {
      console.log(res);
      stats = res.Response;
      //JSON.stringify(res.Response);
      //console.log(stats);
      //console.log("No error. Returning stats");
    })
    .catch(err => {
      console.log("Error caught:")
      console.log(err);
    });

    return stats;*/
  }
}
