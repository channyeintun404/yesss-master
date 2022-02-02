/**
 * Product Details Screen
 * @author    ThemesBuckets <themesbuckets@gmail.com>
 * @copyright Copyright (c) 2020
 * @license   AppsPlaces
 */

 import { Component, OnInit, Input } from '@angular/core';
 import { Product } from '../../models/product.model';
 import { StorageService } from '../../services/storage.service';
 import { CartComponent } from '../cart/cart.component';
 import { ModalController } from '@ionic/angular';
 import { ProductEditComponent } from '../product-edit/product-edit.component';
 import { ProductsService } from '../../services/products.service';
 import { OptionsService } from 'src/app/services/options.service';
 import { ReviewDetailsComponent } from 'src/app/review-details/review-details.component';
 import { Router } from '@angular/router';
 import { ProductMessagesComponent } from '../product-messages/product-messages.component';
 @Component({
   selector: 'app-product-details',
   templateUrl: './product-details.component.html',
   styleUrls: ['./product-details.component.scss'],
 })
 export class ProductDetailsComponent implements OnInit {
 
   @Input() id: number;
   name: String;
   description: String;
   price: number;
   discountPrice: number;
   images: Array<String>;
   size: Array<String>;
   color: Array<String>;
   isWishlist: boolean;
 
   products: Product;
   options : any[];
   variants_size : any[];
   variants_color : any[];
   variantSizeIdArray: any[];
   variantSizeNameArray: any[];
   variantSizePositionArray: any[];
   variantSizeStatusArray: any[];
   variantColorIdArray: any[];
   variantColorNameArray: any[];
   variantColorPositionArray: any[];
   variantColorStatusArray: any[];
   optionIdArray: any[]=[];
   optionSizeId: any;
   optionColorId: any;

   comment: any; 
   rate: any;
 
 
   // Slider Options
   slideOpts = {
     initialSlide: 0,
     loop: true,
     autoplay: true,
     speed: 400,
     pagination: {
       el: '.swiper-pagination',
       dynamicBullets: true,
     },
   };
   discussions: any[];
   discussionLength: number;
   full_description: any;
   option_array: unknown[];
   variants_array: any[];
   constructor(public modalController: ModalController,
     public storageService: StorageService,
     private optionsService : OptionsService,
     private productsService : ProductsService,
     private router: Router) {
   }
 
   ngOnInit() {    
     this.getProductById();
     this.getProductOptions();
     this.getDiscussionById();
     this.addToCart();
   }
 
   // Add to Cart Function
   addToCart() {
     this.products = {
       id: this.id,
       name: this.name,
       description: this.description,
       price: this.price,
       discountPrice: this.discountPrice,
       images: this.images,
       size: this.size,
       color: this.color,
       quantity: 1,
       isWishlist: this.isWishlist
     }
 
     // Save cart product in storage
     this.storageService.setStorageValue(this.products, 'my-cart');
   }
 
   // Go to cart page
   async gotoCartPage() {
     this.dismiss();
     const modal = await this.modalController.create({
       component: CartComponent
     });
     return await modal.present();
   }
 
   async goToProductEditPage(){
     const modal = await this.modalController.create({
       component: ProductEditComponent,
       componentProps: this.products
     });
     return await modal.present();
   }

   async goToProductMessage(){
    const modal = await this.modalController.create({
      component: ProductMessagesComponent,
      // componentProps:  { 
      //   order_id: this.orderid
      // }
    });
    return await modal.present();
  }

  async goToReviewDetailsPage() {
    // this.dismiss();  
    const modal = await this.modalController.create({
      component: ReviewDetailsComponent,
      componentProps:  { 
        id: this.id
      }
    });
    // console.log(this.products)
    return await modal.present();
  }

  clickTab(event: Event, tabPath: string) {
    event.stopImmediatePropagation();
    console.log( event, tabPath );
    this.router.navigate([`${tabPath}`]);
  }

   // get product by id
   getProductById(){
     console.log("id is ="+this.id)
   
     this.productsService.getProductById(this.id).then( res=>{
       console.log(res);
       this.name = res['product']
       this.price = res['price'] 
       this.full_description = res['full_description']
     })
   }
   //getproductOption
   getProductOptions(){
     this.optionsService.getProductsOptions(this.id).then((resp: any) => {
   console.log(Object.values(resp))
   this.option_array = Object.values(resp)   
   this.variants_array = [];
       for (const variants of Object.values(resp)) {
         this.optionIdArray.push(variants['option_id'])
         this.variants_array.push(Object.values(variants['variants']))              
       }
       console.log(this.optionIdArray)
       this.optionSizeId = this.optionIdArray[0]
       this.optionColorId = this.optionIdArray[1]
         this.getOptionsSizeById(this.optionSizeId);
         this.getOptionsColorById(this.optionColorId);
     })
     
   }
 
  //resetData
  resetPage(){
   this.getProductById()
 }
 
   refreshPage(event){
     this.getProductById()
     setTimeout(() => {
       console.log('Async operation has ended');
       event.target.complete();
     }, 2000);
   }
     
   //getOptionSizeById
   getOptionsSizeById(option_id){
     this.optionsService.getOptionsById(option_id).then((res: any) => {
       this.options=[];
       
       this.variants_size=[]
       this.variantSizeIdArray=[]
       this.variantSizeNameArray=[]
       this.variantSizePositionArray=[]
       this.variantSizeStatusArray=[]
       for (const variant of Object.values(res['variants'])) {
           this.variantSizeNameArray.push(variant['variant_name'])
           this.variantSizePositionArray.push(variant['position'])
           this.variantSizeStatusArray.push(variant['status'])
           this.variantSizeIdArray.push(variant['variant_id'])
           console.log("variant are "+this.variantSizeNameArray)
         }  
   
       this.options.push({
           option_id : parseInt( res['option_id']),
           option_name:  res['option_name'],
           product_id:parseInt( res['product_id']),
           variant_id:this.variantSizeIdArray,
           position: this.variantSizePositionArray,
           status:this.variantSizeStatusArray,
           variant_name:this.variantSizeNameArray
       })
   
       for(var i =0; i<this.variantSizeNameArray.length; i++){
         this.variants_size.push({
           "id":this.variantSizeIdArray[i],
           "variant_name":this.variantSizeNameArray[i],
           "position":this.variantSizePositionArray[i],
           "status": this.variantSizeStatusArray[i]
         })  
       }  
       console.log(this.variants_size)
     })
   }  

   //getOtionsColorById
   getOptionsColorById(option_id){
     this.optionsService.getOptionsById(option_id).then((res: any) => {
       this.variants_color=[]
       this.variantColorIdArray=[]
       this.variantColorNameArray=[]
       this.variantColorPositionArray=[]
       this.variantColorStatusArray=[]
       for (const variant of Object.values(res['variants'])) {
           this.variantColorNameArray.push(variant['variant_name'])
           this.variantColorPositionArray.push(variant['position'])
           this.variantColorStatusArray.push(variant['status'])
           this.variantColorIdArray.push(variant['variant_id'])
           console.log("variant are "+this.variantColorNameArray)
         }  
   
       for(var i =0; i<this.variantColorNameArray.length; i++){
         this.variants_color.push({
           "id":this.variantColorIdArray[i],
           "variant_name":this.variantColorNameArray[i],
           "position":this.variantColorPositionArray[i],
           "status": this.variantColorStatusArray[i]
         })  
       }  
       console.log(this.variants_color)
     })
   }

    // get product by id
   getDiscussionById(){
     this.rate=0;
     console.log("id is ="+this.id);
     this.productsService.getDiscussionById(256).then( res=>{
       console.log(res);
       this.discussions = [];
       for (const discussion of Object.values(res['discussions'])){
        console.log(discussion)
        this.discussions.push(discussion)
      }
      this.discussionLength = this.discussions.length
     })
   }
   
   

   // Back to previous page function
   dismiss() {
     this.modalController.dismiss({
       'dismissed': true
     })
   }
 }
 