import { Component, OnInit, ViewChild } from '@angular/core';
import { Params, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { Dish } from '../shared/dish';
import { DishService } from '../services/dish.service';
import { switchMap } from 'rxjs';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Comment } from '../shared/comment';
import { MatSliderChange } from '@angular/material/slider';
import { rateValue } from '../shared/rate';
import { baseURL } from '../shared/baseurl';




@Component({
  selector: 'app-dishdetail',
  templateUrl: './dishdetail.component.html',
  styleUrls: ['./dishdetail.component.scss']
})
export class DishdetailComponent implements OnInit {

  @ViewChild('fform') feedbackFormDirective: any;
  
  commitForm!: FormGroup;
  commit: Comment = new Comment;
  rating = rateValue;
  date = Date.now();

  min=1;
  max=5;
  step= 1;

    formErrors: any = 
    {
    author: '',
    comment: '',
    };

    validationMessages : any = 
    {
      author : {
        'required':      'First Name is required.',
        'minlength':     'First Name must be at least 2 characters long.',
        'maxlength':     'FirstName cannot be more than 25 characters long.',
        'pattern' :      'First name in valid format.'
      },
      comment : {
        'required':      'First Name is required.',
        'minlength':     'First Name must be at least 2 characters long.',
        'maxlength':     'FirstName cannot be more than 25 characters long.'
      }
    };

    onSliderChange(event: MatSliderChange) {
      // console.log(event.value);
    }

    dish: Dish = new Dish;
    dishIds: string[] = [];
    'prev' : string ;
    'next': string;

    errMess!: string;
    dishcopy: Dish =new Dish;

    baseURL =baseURL; 

    

  constructor(private dishService: DishService,
              private formBuilder:FormBuilder,
              private route: ActivatedRoute,
              private location: Location
              ) { 
                this.createForm();
              }

  // ngOnInit(): void {
  //   let id = this.route.snapshot.params['id'];
  //   this.dishService.getDish(id)
  //     .subscribe(dish => this.dish = dish);
  // }
  ngOnInit(): void {
    this.dishService.getDishIds()
      .subscribe((dishIds) => this.dishIds = dishIds);
    this.route.params.
       pipe(switchMap((prams: Params) => this.dishService.getDish(prams['id'])))
      .subscribe(dish => { this.dish = dish; this.dishcopy = dish; this.setPrevNext(dish.id); },
      errmess=> this.errMess = <any>errmess);

  }
  
  setPrevNext(dishId: string) {
    const index = this.dishIds.indexOf(dishId);
    this.prev = this.dishIds[(this.dishIds.length + index - 1) % this.dishIds.length];
    this.next = this.dishIds[(this.dishIds.length + index + 1) % this.dishIds.length];
  }

  goBack(): void{
    this.location.back();
  }

  createForm(){
    this.commitForm = this.formBuilder.group({
      author: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(25), Validators.pattern]],
      comment: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(25)]],
      rating: 1,
      date : Date.now()
    });

    this.commitForm.valueChanges
      .subscribe(data => this.onValueChanged(data));

    this.onValueChanged(); // (re)set validation messages now
  }

  onValueChanged(data?: any) {
    if (!this.commitForm) { return; }
    const form = this.commitForm;
    for (const field in this.formErrors) {
      if (this.formErrors.hasOwnProperty(field)) {
        // clear previous error message (if any)
        this.formErrors[field] = '';
        const control = form.get(field);
        if (control && control.dirty && !control.valid) {
          const messages = this.validationMessages[field];
          for (const key in control.errors) {
            if (control.errors.hasOwnProperty(key)) {
              this.formErrors[field] += messages[key] + ' ';
            }
          }
        }
      }
    }
  }


  onSubmit(){
    
    this.commit = this.commitForm.value;
    const date = Date.now();
    console.log(date);
    // this.dish.comments.push(this.commit);
    this.dishcopy.comments.push(this.commit);
    this.dishService.putDish(this.dishcopy)
        .subscribe(dish => {
          this.dish = dish;
          this.dishcopy = dish;
        },
        errmess => { this.dish = <any>null; this.dishcopy= <any>null; this.errMess = <any>(errmess);});
    this.commitForm.reset({
      author:'',
      rating: 'None',
      comment:'',
      date : Date.now()
    });
    
    this.feedbackFormDirective.resetForm({date : Date.now()});
  }
}
