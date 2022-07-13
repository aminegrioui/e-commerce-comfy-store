// global imports
import '../toggleSidebar.js';
import '../cart/toggleCart.js';
import '../cart/setupCart.js';
// specific
import { addToCart } from '../cart/setupCart.js';
import { singleProductUrl, getElement, formatPrice } from '../utils.js';
import { store } from '../store.js';


// selections
const loading = getElement('.page-loading');
const centerDOM = getElement('.single-product-center');
const pageTitleDOM = getElement('.page-hero-title');
// const imgDOM = getElement('.single-product-img');
// const titleDOM = getElement('.single-product-title');
// const companyDOM = getElement('.single-product-company');
// const priceDOM = getElement('.single-product-price');
// const colorsDOM = getElement('.single-product-colors');
// const descDOM = getElement('.single-product-desc');


// cart product
 let productID;

// productID=productID.substring(4)
const section=getElement('.section-center')


const fetchProduct = async ()=>{
    const response=await fetch(singleProductUrl+productID)
    return response.json()
}

// const init =  async ()=>{
//     console.log(productID)
//     const product= await fetchProduct();
//     const {id,fields}=product;
//     const {name,colors,image,description,price}=fields;
//     const {thumbnails}=image[0];
//     const {img}=thumbnails.large.url
//     // console.log(product)
//     console.log(thumbnails.large.url)
//      section.innerHTML= `
       
//      <img src="${thumbnails.large.url}"
//      alt="">

//      <article class="single-product-info">
//       <div>
//         <h2 class="single-product-title">${name}</h2>
//         <p class="single-product-company text-slanted"> ${name}</p>
//         <p class="single-product-price"> $ ${price}</p>
//         <div class="single-product-colors">

//         $
//         </div>
//         <p class="single-product-desc">
//            ${description}
//         </p>
//         <button class="addToCartBtn btn" data-id="id">

//           add to cart
//         </button>
//       </div>
//      </article>
//      `
// }
// init()
window.addEventListener('DOMContentLoaded', async ()=>{
    const urlId= window.location.search;
     console.log(urlId)
    try {
        const response=await fetch(singleProductUrl+urlId)
       
        if(response.status>=200 && response.status<=299){
        const product=await response.json()
        const {id,fields}=product;
        productID=id;
    
        const {name,colors,image,description,price,company}=fields;
        const {thumbnails}=image[0];
        const img=thumbnails.large.url
        document.title=`${name.toLowerCase()} | comfy `
        pageTitleDOM.innerHTML=`Home / ${name}`
            centerDOM.innerHTML= `
                 <img src="${img}"
                 alt="">
            
                 <article class="single-product-info">
                  <div>
                    <h2 class="single-product-title">${name}</h2>
                    <p class="single-product-company text-slanted"> ${company}</p>
                    <p class="single-product-price">  ${formatPrice(price)}</p>
                    <div class="single-product-colors">

                    ${
                        colors.map(color=>{
                            return `
                            <span style="background-color:${color};" class="product-color" ></span>
                            `
                        }).join('')
                    }
                    </div>
                    <p class="single-product-desc">
                       ${description}
                    </p>
                    <button class="addToCartBtn btn" data-id="id">
            
                      add to cart
                    </button>
                  </div>
                 </article>
                 `
                 const cartBtn = getElement('.addToCartBtn');
                 cartBtn.addEventListener('click', (e)=>{
                        addToCart(productID);
                    
                 })
        }
        else{
            centerDOM=`
            <div>
                 <h3 class="error"> sorry, somthing went wrong</h3>
                 <a href="index.html" class="btn"> back home </a>
                 </div>
            `
        }
    } catch (error) { 
         console.log(error)
    }
    loading.style.display='none'

})


// show product when page loads
