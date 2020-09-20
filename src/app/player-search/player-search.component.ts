import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { DestinyService } from '../destiny.service';
import { BungieResponse } from '../models/BungieResponse';
import { GeneralUser } from '../models/GeneralUser';

@Component({
  selector: 'app-player-search',
  templateUrl: './player-search.component.html',
  styleUrls: ['./player-search.component.css']
})
export class PlayerSearchComponent implements OnInit {
  @Input() accountSearchName:string = "";
  @Input() platform:string = "Platform";
  
  accounts:Array<string>;

  allPlatforms:string[];
  

  constructor(private destinyService:DestinyService) {
    this.accounts = new Array<string>();
    this.allPlatforms = ["Steam", "Playstation", "Xbox", "Stadia"];
  }

  ngOnInit(): void {
  }

  searchForAccount(){
    this.accounts = new Array<string>();
    this.accounts.push("Seaching...")
    /*this.destinyService.getUserSearch(this.platform,this.accountSearchName)
      .subscribe((res: BungieResponse) => {
        const accountSearchResults = res.Response as GeneralUser[];
        this.accounts.pop();

        for(let i = 0; i < accountSearchResults.length; i++){
          const account = accountSearchResults[i];

          this.accounts.push(account.displayName + ", id:" + account.membershipId);
        }
      })*/
    console.log(`would be searching for accounts based on ${this.accountSearchName} and ${this.platform}`);
  }

  selectPlatform(platform:string){
    this.platform = platform;
  }
}
