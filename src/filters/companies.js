import { getElement } from '../utils.js';
import display from '../displayProducts.js';

const setupCompanies = (store) => {
    const element=getElement('.companies')
    // const companies=store.reduce((acc,object)=>{
     
        
    //     if(!acc.includes(object.company)){
    //         acc.push(object.company)
    //     }
    //      return acc
    // },['all'])
    
    const companies= ['all',... new Set(store.map(product=> product.company))]
    element.innerHTML=companies.map(company =>{
        return `
              <button class="company-btn">${company}</button>
        `
    }).join('')

    const btns=document.querySelectorAll('.company-btn');
    let newStore=[]
    btns.forEach(btn=>{
       btn.addEventListener('click',()=>{
        let companyName=btn.innerHTML;
         
        if(companyName!=='all'){
            newStore=store.filter(product=> product.company===companyName);
        }
        else{
            newStore=[... store]
            
        }
        display(newStore,getElement('.products-container'))
        
       
       })
    })
};

export default setupCompanies;
