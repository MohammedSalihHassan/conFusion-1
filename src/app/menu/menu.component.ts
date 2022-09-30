import { Component, OnInit, Inject } from '@angular/core';
import { Dish } from '../shared/dish';
// import { DISHES } from '../shared/dishes';
import { DishService } from '../services/dish.service';
import { baseURL } from '../shared/baseurl';




@Component({  
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})


export class MenuComponent implements OnInit {

  dishes: Dish[] = [];
  errMess!: string;

  baseURL =baseURL; 
  

  // selectedDish: Dish = new Dish;

  constructor(private dishService: DishService) { 
    
  }

  // ngOnInit(): void {
  //   this.dishes = this.dishService.getDishes();
  // }

  ngOnInit(): void {
    this.dishService.getDishes()
    .subscribe(dishes => this.dishes = dishes,
      errmess => this.errMess = <any> errmess);
    
  }

  // ngOnInit(): void {
  //   this.dishService.getDishes()
  //   .subscribe(dishes => this.dishes= this.dishes);
  // }

  // onSelect(dish: Dish) {
  //   this.selectedDish = dish;
  // }


}
