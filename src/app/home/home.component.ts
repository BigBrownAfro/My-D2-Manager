import { Identifiers } from '@angular/compiler';
import { Component, Input, OnInit } from '@angular/core';
import { DestinyService } from '../destiny.service';
import { AccountStats } from '../models/AccountStats';
import { BungieResponse } from '../models/BungieResponse';
import { GeneralUser } from '../models/GeneralUser';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  @Input() platform:string = "steam";
  @Input() id:string = "4611686018475885562";

  accountStats:Array<string>;

  constructor(private destinyService:DestinyService) {
    this.accountStats = new Array<string>();
  }

  ngOnInit(): void {
  }

  

  getAccountStats(){
    this.accountStats = new Array<string>();
    this.accountStats.push("Collecting Data...");
    this.destinyService.getAccountStats(this.platform,this.id)
      .subscribe((res: BungieResponse) => {
        const accountStatsRes = res.Response as AccountStats;
        this.accountStats.pop();
        const characters = accountStatsRes.characters;
        for (let i = 0; i < characters.length; i++) {
          const character = characters[i];
          this.accountStats.push(`Character ${i + 1} (aka: ${character.characterId}) has ${character.merged.allTime.kills.basic.displayValue} kills`);
        }
      })
  }
}
