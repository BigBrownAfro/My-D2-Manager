import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { DestinyService } from '../destiny.service';
import { BungieResponse } from '../models/BungieResponse';
import { GeneralUser } from '../models/GeneralUser';
import { UserInfoCard } from '../models/UserInfoCard';

@Component({
  selector: 'app-player-search',
  templateUrl: './player-search.component.html',
  styleUrls: ['./player-search.component.css']
})
export class PlayerSearchComponent implements OnInit {
  @Input() accountSearchName:string = "";
  @Input() platform:string = "Platform";
  
  users:Array<string>;

  allPlatforms:string[];
  

  constructor(private destinyService:DestinyService) {
    this.users = new Array<string>();
    this.allPlatforms = ["Steam", "Playstation", "Xbox", "Stadia"];
  }

  ngOnInit(): void {
  }

  searchForPlayer(){
    this.users = new Array<string>();
    this.users.push("Seaching...");
    this.destinyService.getPlayerSearch(this.platform,this.accountSearchName)
      .subscribe((res: BungieResponse) => {
        const playerSearchResults = res.Response as UserInfoCard[];
        this.users.pop();

        for(let i = 0; i < playerSearchResults.length; i++){
          const user = playerSearchResults[i];

          this.users.push(user.displayName + ", id:" + user.membershipId)
        }
      });
  }

  selectPlatform(platform:string){
    this.platform = platform;
  }
}
