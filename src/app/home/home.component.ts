import { Component, OnInit } from '@angular/core';
import { Dish } from '../shared/dish';
import { DishService } from '../services/dish.service';
import { Promotion } from '../shared/promotion';
import { PromotionService } from '../services/promotion.service';
import { Leader } from '../shared/leader';
import { LeaderService } from '../services/leader.service';
import { baseURL } from '../shared/baseurl';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  dish: Dish = new Dish;
  promotion: Promotion = new Promotion;
  leader : Leader = new Leader;

  dishErrMess!: string;

  baseURL =baseURL; 

  constructor(private dishService: DishService,
              private promotionService: PromotionService,
              private leaderService: LeaderService) { }

              // ngOnInit(): void {
              //   this.dishService.getDishes()
              //   .subscribe(dishes => this.dishes = dishes);
                
              // }
  ngOnInit(): void {
    this.dishService.getFeaturedDish()
        .subscribe(dish => this.dish = dish,
          errmess => this.dishErrMess = <any>errmess );
    this.promotionService.getFeaturedPromotion()
        .subscribe(promotion => this.promotion = promotion);
    this.leaderService.getFeaturedLeader()
        .subscribe(leader => this.leader = leader);
  }

}
