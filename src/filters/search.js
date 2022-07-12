import { getElement } from '../utils.js';
import display from '../displayProducts.js';

const form=getElement('.input-form')
const input=getElement('.search-input')

console.log(input.value)
const setupSearch = (store) => {
    form.addEventListener('keyup',(e)=>{
        const value=input.value
       
        const element=getElement('.products-container');
        if(value){
             const newStore=store.filter(product=> product.name.includes(value));
            if(newStore.length>0){
                display(newStore,element)
            }
            else{
                element.innerHTML=`<h3 class="filter-error">
                    sorry, no products matched your search
                </h3>`
            }
        }
       
      

        
    })
};

export default setupSearch;
