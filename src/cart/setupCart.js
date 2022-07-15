// import
import {
  getStorageItem,
  setStorageItem,
  formatPrice,
  getElement,
} from '../utils.js';
import { openCart } from './toggleCart.js';
import { findProduct } from '../store.js';
import addToCartDOM from './addToCartDOM.js';
// set items

const cartItemCountDOM=getElement('.cart-item-count');
const cartItemsDOM=getElement('.cart-items')
const cartTotalDOM=getElement('.cart-total')

let cart= getStorageItem('cart');

// console.log(getStorageItem('cart'))
export const addToCart = (id) => {
  let item=cart.find(cartItem => cartItem.id === id);

  if(!item){
    let product=findProduct(id);
    product= {... product, amount:1}
    cart=[...cart,product];
    addToCartDOM(product);
  }
  else{
     item.amount+=1;
     const articles=[...document.querySelectorAll('.cart-item')]
     const article=articles.find(a=> a.dataset.id===id)
     article.getElementsByClassName('cart-item-amount')[0].textContent=`${item.amount}`

  }
  // display amount of cart
  displayCartAmount();

  // display Total of cart
  displayCartTotal()

  // set cart  in storage
  setStorageItem('cart',cart);
  openCart()
};

const displayCartAmount = ()=>{
  const amount=cart.reduce ((total,cartItem)=>{
         total+=cartItem.amount;
         return total;
  },0)
  cartItemCountDOM.textContent=`${amount}`
}

const displayCartTotal = ()=>{
  const total=cart.reduce((total,cartItem)=>{
    total+=cartItem.price* cartItem.amount;
    return total;
  },0)
  cartTotalDOM.textContent=` Total: ${formatPrice(total)}`
}
const displayCartItems = ()=>{
  cart.forEach(cart=>{
    addToCartDOM(cart)
  })
}

const setUpCartFunctionality = ()=> {
    
  cartItemsDOM.addEventListener('click', (e)=> {
    const element=e.target;
    const parent=e.target.parentElement;
    const id=e.target.dataset.id;
    const parentId=e.target.parentElement.dataset.id
    const amounts=[...cartItemsDOM.querySelectorAll('.cart-item-amount')]
    if(element.classList.contains('cart-item-remove-btn')){
        removeItem(id);
        parent.parentElement.remove()
    }
    if(parent.classList.contains('cart-item-increase-btn')){
      increaseCart(parentId)
      const amount=amounts.find(m=> m.dataset.id===parentId)
      amount.textContent=parseInt(amount.textContent) +1;
    }
    if(parent.classList.contains('cart-item-decrease-btn')){
      decreaseCart(parentId)
      const amount=amounts.find(m=> m.dataset.id===parentId)
      if(parseInt(amount.textContent) -1>0){
        amount.textContent=parseInt(amount.textContent) -1;
      }
      else{
        parent.parentElement.parentElement.remove()
      }
     
    }

    displayCartAmount();
    displayCartTotal();
    setStorageItem('cart',cart);
    // console.log(element)
    // console.log(parent)
  })
}
const removeItem = (id)=> {
    cart=cart.filter(item=> item.id!==id)
}
const increaseCart = (parentId)=>{
  cart = cart.map((item)=> {
     if(item.id===parentId){
       item.amount+=1;
     }
     return item;
  })
}
const decreaseCart = (parentId)=>{
  cart = cart.map((item)=> {
     if(item.id===parentId){
       item.amount-=1;

     }
     return item;
  })
 cart=cart.filter(item=> item.amount>0);
}
const init = ()=>{
  displayCartAmount()
  displayCartTotal();
  displayCartItems();
  setUpCartFunctionality();
  
}

init();