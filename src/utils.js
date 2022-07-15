//   ATTENTION!!!!!!!!!!!
//   I SWITCHED TO PERMANENT DOMAIN
//   DATA IS THE SAME JUST A DIFFERENT URL,
//   DOES NOT AFFECT PROJECT FUNCTIONALITY

const allProductsUrl = 'https://course-api.com/javascript-store-products'
// temporary single product
// 'https://course-api.com/javascript-store-single-product?id=rec43w3ipXvP28vog'
const singleProductUrl =
  'https://course-api.com/javascript-store-single-product'

const getElement = (selection) => {
  const element = document.querySelector(selection)
  if (element) return element
  throw new Error(`Please check "${selection}" selector, no such element exist`)
}

const formatPrice = (price) => {
  let formattedPrice=new Intl.NumberFormat('en-US',{
    style:'currency',
    currency:'USD'
  }).format((price / 100).toFixed(2))
  return formattedPrice;
}

const getStorageItem = (item) => {
  let storageItem=localStorage.getItem(item);
  if(storageItem){
    storageItem=JSON.parse(localStorage.getItem(item));
  } 
  else{
    storageItem=[]
  }
  return storageItem;
}
const setStorageItem = (name,item) => {
   localStorage.setItem(name,JSON.stringify(item))
}

export {
  allProductsUrl,
  singleProductUrl,
  getElement,
  formatPrice,
  getStorageItem,
  setStorageItem,
}


// <!-- single item -->
// <article class="cart-item">
//   <img src="./images/main-bcg.jpeg" class="cart-item-img" alt="">
// <!-- item info -->
//   <div>
//       <h4 class="cart-item-name">high-back bench</h4>
//     <p class="cart-item-price">$13.99</p>
//     <button class="cart-item-remove-btn">remove</button>
//     </div>
// <!-- amount toggle-->

// <div>
//      <button class="cart-item-increase-btn">
//       <i class="fas fa-chevron-up" ></i>
//      </button>
//      <p class="cart-item-amount">1</p>
//      <button class="cart-item-decrease-btn">
//       <i class="fas fa-chevron-down" ></i>
//      </button>
// </div>
// </article>