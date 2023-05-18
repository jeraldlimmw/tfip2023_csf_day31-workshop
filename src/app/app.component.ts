import { Component } from '@angular/core';
import { InventoryComponent } from './components/inventory.component';
import { CartAction, CartItem } from './models';
import { findIndex } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'day31-workshop';

  cart: CartItem[] = []

  process(action: CartAction) {
    // loop using for (let i = 0; i < this.cart.length; i++) OR
    // find the CartItem in cart where the fruit(item) is the same as that in CartAction
    let i = this.cart.find(item => item.item == action.item) //stream
    // Add
    if (action.quantity > 0) {
      // if (i != undefined) means that if i can be found
      if (!i) { //if falsey values (0, undefined, empty string)
        /* 
          let newItem: CartItem = {
             item: action.item,
             quantity: action.quantity
           }
           this.cart.push(newItem)
        /*
        /*
          let newItem: CartItem = { ...action } 
          this.cart.push(newItem)
        */
        this.cart.push({ ...action} as CartItem) //copies values to that with same name
      } else {
        i.quantity += action.quantity
        return
      }
    }
    if (action.quantity < 0) {
      if (!i) {
        return
      }
      if (i.quantity === 1) { 
        let index = this.cart.findIndex(item => item.item == action.item)
        this.cart.splice(index, 1)
      } else {
        i.quantity += action.quantity
        return
      }
    }
    console.info('cart', this.cart)
  }

  // Optional in typescript: findCat: cat|undefined(){}
  // null is a value, undefined is means there is nothing there

  
  
}
