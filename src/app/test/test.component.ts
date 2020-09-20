import { Identifiers } from '@angular/compiler';
import { Component, Input, OnInit } from '@angular/core';
import { DestinyService } from '../destiny.service';
import { AccountStats } from '../models/AccountStats';
import { BungieResponse } from '../models/BungieResponse';
import { GeneralUser } from '../models/GeneralUser';
import { UserInfoCard } from '../models/UserInfoCard';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css']
})
export class TestComponent implements OnInit {
  @Input() accountPlatform:string = "steam";
  @Input() platform:string = "steam";
  @Input() id:string = "4611686018475885562";
  @Input() accountSearchName:string = "";

  //accountStats:string = "hi\ncarl";
  accountStats:Array<string>;
  accounts:Array<string>;

  constructor(private destinyService:DestinyService) {
    this.accountStats = new Array<string>();
    this.accounts = new Array<string>();
  }

  ngOnInit(): void {
  }

  searchForPlayer(){
    this.accounts = new Array<string>();
    this.accounts.push("Seaching...")
    this.destinyService.getPlayerSearch(this.accountPlatform,this.accountSearchName)
      .subscribe((res: BungieResponse) => {
        const accountSearchResults = res.Response as UserInfoCard[];
        this.accounts.pop();

        for(let i = 0; i < accountSearchResults.length; i++){
          const account = accountSearchResults[i];

          this.accounts.push(account.displayName + ", id:" + account.membershipId)
        }
      });
    console.log(`would be searching for accounts on ${this.accountPlatform} with username ${this.accountSearchName}`);
    
  }

  getAccountStats(){
    this.accountStats = new Array<string>();
    this.accountStats.push("Collecting Data...");
    //this.accountStats = await this.destinyService.getAccountStats(this.platform,this.id);
    this.destinyService.getAccountStats(this.platform,this.id)
      .subscribe((res: BungieResponse) => {
        const accountStatsRes = res.Response as AccountStats;
        this.accountStats.pop();
        const characters = accountStatsRes.characters;
        for (let i = 0; i < characters.length; i++) {
          const character = characters[i];
          this.accountStats.push(`Character ${i + 1} (aka: ${character.characterId}) has ${character.merged.allTime.kills.basic.displayValue} kills`);
          //this.accountStats += "\n>";
        }
      });
  }
}

