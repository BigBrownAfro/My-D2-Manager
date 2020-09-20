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
  @Input() playerSearchName:string = "";
  @Input() platform:string = "Platform";
  
  users:Array<string>;
  errors:Array<string>; //user input errors for the user to see
  errored:boolean; //whether an input contains an error or not

  allPlatforms:string[];

  constructor(private destinyService:DestinyService) {
    this.users = new Array<string>();
    this.errors = new Array<string>();
    this.errored = false;
    this.allPlatforms = ["Steam", "Playstation", "Xbox", "Stadia"];
  }

  ngOnInit(): void {
  }

  searchForPlayer(){
    if(!this.validateInputs()){
      return;
    }

    this.users = new Array<string>();
    this.users.push("Seaching...");
    this.destinyService.getPlayerSearch(this.platform,this.playerSearchName)
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

  validateInputs():boolean{
    //clear errors
    this.errors = new Array<string>();
    this.errored = false;

    //check fields
    var isValid = true;
    isValid = this.validatePlayerSearchName() && isValid;
    isValid = this.validatePlatform() && isValid;;
    return isValid;
  }

  validatePlayerSearchName():boolean{
    var isValid = true;

    //check player search name field for length out of bounds
    if(this.playerSearchName.length < 1 || this.playerSearchName.length > 50){
      isValid = false;

      //update errors
      this.errors.push("Username length invalid.");
      this.errored = true;
    }

    return isValid;
  }

  validatePlatform():boolean{
    var isValid = false;

    //Check to see if entered platform is in the list of platforms
    if(this.allPlatforms.includes(this.platform)){
      isValid = true;
    }else{
      //update errors
      this.errors.push("Please select a platform.");
      this.errored = true;
    }
    
    return isValid;
  }
}
