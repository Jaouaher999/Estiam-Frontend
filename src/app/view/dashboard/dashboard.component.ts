import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../../service/products/products.service';
import { UserServiceService } from '../../service/users/user-service.service';

@Component({
  selector: 'app-dashboard',
  imports: [],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit {
  totalProducts: number = 0;
  totalPrice: number = 0;
  totalUsers: number = 0;

  constructor(private productsService: ProductsService, private userService: UserServiceService) {

  }
  ngOnInit(): void {
    this.productsService.getProducts().subscribe(products => {
      this.totalProducts = products.length;
      this.totalPrice = products.reduce((sum, product) => sum + product.price, 0);
    });
    this.userService.getUsers().subscribe(users => {
      this.totalUsers = users.length;
    })
  }

}
