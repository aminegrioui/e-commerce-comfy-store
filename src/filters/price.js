import { getElement } from '../utils.js';
import display from '../displayProducts.js';

const setupPrice = (store) => {
    const inputFilter=getElement('.price-filter')
    const inputValue=getElement('.price-value')

    let maxPrice=store.map(product=> product.price);
    maxPrice= Math.max(... maxPrice)
    maxPrice=Math.ceil(maxPrice / 100);

    inputFilter.value= maxPrice;
    inputFilter.max=maxPrice;
    inputFilter.min=0;
    inputValue.textContent = ` value : $${maxPrice}`
    
    inputFilter.addEventListener('input', ()=>{

        const price= parseInt(inputFilter.value)
        const newStore=store.filter((product)=> (product.price/100)<=price)
        // console.log(newStore)
      display(newStore, getElement('.products-container'),true)
      if(newStore.length< 1){
        getElement('.products-container').innerHTML=`<h3 class="filter-error">
              sorry, no produst matched your search !!
        </h3>`
      }
        inputValue.textContent = ` value : $ ${price}`
    })
};

export default setupPrice;
