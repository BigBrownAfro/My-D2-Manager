import { Identifiers } from '@angular/compiler';
import { Component, Input, OnInit } from '@angular/core';
import { DestinyService } from '../destiny.service';
import { AccountStats } from '../models/AccountStats';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  @Input() platform:string = "steam";
  @Input() id:string = "4611686018475885562";

  //accountStats:string = "hi\ncarl";
  accountStats:Array<string>;

  constructor(private destinyService:DestinyService) { }

  ngOnInit(): void {
  }

  getAccountStats(){
    this.accountStats = new Array<string>();
    this.accountStats.push("Waiting...");
    //this.accountStats = await this.destinyService.getAccountStats(this.platform,this.id);
    this.destinyService.getAccountStats(this.platform,this.id)
      .subscribe((res: AccountStats) => {
        this.accountStats.pop();
        const characters = res.Response.characters;
        for (let i = 0; i < characters.length; i++) {
          const character = characters[i];
          this.accountStats.push(`Character ${i + 1} (aka: ${character.characterId}) has ${character.merged.allTime.kills.basic.displayValue} kills`);
          //this.accountStats += "\n>";
        }
      })
  }
}
