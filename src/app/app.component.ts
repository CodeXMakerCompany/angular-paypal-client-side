import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';

declare var paypal;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
   
  @ViewChild('paypal', { static: true }) paypalElement : ElementRef;

  producto = {
    descripcion : 'producto en venta',
    precio      : 599.99,
    img         : 'imagen de tu producto'
  }
  title = 'angular-paypal-payment';

  ngOnInit(){

    paypal
    .Buttons({
      createOrder: (data, actions) => {
        return actions.order.create({
          purchase_units: [
            {
              description: this.producto.descripcion,
              amount     :{
                currency_code: 'MXN',
                value        : this.producto.precio
              }
            }
          ]
        })
      },
      onApprove: async (data, actions) => {
        const order = await actions.order.capture();
        console.log(order);
        
      },
      onError: err =>{
        console.log(err);
        
      }
    })
    .render( this.paypalElement.nativeElement );

  }
}
