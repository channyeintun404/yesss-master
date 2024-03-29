/**
 * Notification Screen
 * @author    ThemesBuckets <themesbuckets@gmail.com>
 * @copyright Copyright (c) 2020
 * @license   AppsPlaces
 */

import { Component, OnInit } from '@angular/core';
import { NotificationsService } from '../../services/notifications.service';
import { CartComponent } from '../cart/cart.component';
import { ModalController } from '@ionic/angular';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { ReviewDetailsComponent } from 'src/app/review-details/review-details.component';
import { ShipmentDetailsComponent } from '../shipment-details/shipment-details.component';
import { ShipmentsService } from 'src/app/services/shipments.service';
@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.scss'],
})
export class NotificationComponent implements OnInit {
  orderid: string;
  currentShipment: any;
  currentShipmentId: any;
  notifications: any = [];
  noti_count: any =0;
  
  constructor(private notificationsService: NotificationsService,
    private modalController: ModalController, private router: Router,
    private cookieService: CookieService,
    private shipmentsService: ShipmentsService) { }

  ngOnInit() {
    this.getAllNotification();
  }

  // Get list of notification
  // getNotification() {
  //   this.notifications = this.notificationsService.getNotifications();
  // }

  getAllNotification(){
    this.notificationsService.getAllNotification().then(res=>{
      this.notifications=[];
      
      Object.values(res).forEach(element => {
           this.notifications.push(element)
      });
      console.log(this.notifications);
    })
  }

  godestionation(item_id, id,type){    
    this.notifications.forEach(element => {
      if(element.id==id){
        element.active = false;
        this.noti_count = this.noti_count+1;        
      } 
    });
    this.cookieService.delete('noti_count');
    this.cookieService.set('noti_count',this.noti_count);
    if(type=="order"){
      this.router.navigate([`/order-details/`+item_id]);
    }else if(type=="product"){
      this.goToReviewDetailsPage(item_id);
    }else if(type=="productInquery"){
      this.router.navigate([`/message`]);
    }else if(type=="shipment"){
      this.goShipmentDetailPage(item_id);
    }
   
  }


  // Go to review page
  async gotoCartPage() {
    // this.checkShipment();
    const modal = await this.modalController.create({
      component: CartComponent
    });
    return await modal.present();
  }  
  async goToReviewDetailsPage(pid) {
    // this.dismiss();  
    const modal = await this.modalController.create({
      component: ReviewDetailsComponent,
      componentProps:  { 
        id: pid
      }
    });
    // console.log(this.products)
    return await modal.present();
  }
  async goShipmentDetailPage(id) {
    console.log(id)
    const modal = await this.modalController.create({
      component: ShipmentDetailsComponent,
      componentProps: { id: id }
    });
    return await modal.present();
  }


}
