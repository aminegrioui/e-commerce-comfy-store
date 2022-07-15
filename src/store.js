import { getStorageItem, setStorageItem } from './utils.js';
let store = getStorageItem('store');
const setupStore = (products) => {
    store=products.map((product)=>{
        const {id,fields:{featured,name,image:img,price,colors,company}}=product;
        const image=img[0].thumbnails.large.url;
        return {id,featured,name,image,price,company,colors}
    })

    setStorageItem('store',store)

};

const findProduct = (id) => {
    return store.find(product=> product.id=== id);
};
export { store, setupStore, findProduct };
