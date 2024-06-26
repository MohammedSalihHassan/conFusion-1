import { Component, OnInit } from '@angular/core';
import { Leader } from '../shared/leader';
import { LeaderService } from '../services/leader.service';
import { baseURL } from '../shared/baseurl';


@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent implements OnInit {
  leaders: Leader[] = [];
  baseURL =baseURL; 

  constructor(private leaderService : LeaderService) { }

  ngOnInit(): void {
    this.leaderService.getLeaders()
        .subscribe(leaders => this.leaders = leaders);
  }

}
