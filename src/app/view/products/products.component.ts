import { Component, OnInit, ViewChild } from '@angular/core';
import { Table, TableModule } from 'primeng/table';
import { ConfirmationService, MessageService, SortEvent } from 'primeng/api';
import { Product } from '../../model/product/product';
import { Category } from '../../model/category/category';
import { ProductsService } from '../../service/products/products.service';
import { CommonModule } from '@angular/common';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { FormsModule } from '@angular/forms';
import { AvatarModule } from 'primeng/avatar';
import { PaginatorModule } from 'primeng/paginator';
import { FloatLabelModule } from 'primeng/floatlabel';
import { Dialog } from 'primeng/dialog';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ToastModule } from 'primeng/toast';
import { DropdownModule } from 'primeng/dropdown';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';


@Component({
  selector: 'app-products',
  imports: [CommonModule, CardModule, ButtonModule, FormsModule, AvatarModule, PaginatorModule, TableModule, FloatLabelModule, Dialog, ConfirmDialogModule, ToastModule, DropdownModule],
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
  providers: [ConfirmationService, MessageService],
})

export class ProductsComponent implements OnInit {
  @ViewChild('dt') dt!: Table;
  initialValue: Product[] = [];
  categories: Category[] = [];
  visibleCreate: boolean = false;
  visibleEdit: boolean = false;
  isSorted: boolean | null = null;
  public validateTitle!: boolean;
  public validatePrice!: boolean;
  public validateDescription!: boolean;
  public validateCategoryId!: boolean;
  public validateImages!: boolean;
  selectedCategory: Category = new Category;


  constructor(
    private productsService: ProductsService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService,
    private sanitizer: DomSanitizer
  ) { }

  ngOnInit(): void {
    this.getProducts();
    this.getCategories();
    this.resetValidationFlags();
  }


  resetValidationFlags(): void {
    this.validateTitle = true;
    this.validatePrice = true;
    this.validateDescription = true;
    this.validateCategoryId = true;
    this.validateImages = true;
  }

  showDialogCreate() {
    this.item = new Product();
    this.visibleCreate = true;
  }

  public showDialogEdit(product: Product): void {
    this.item = { ...product };
    this.visibleEdit = true;
  }

  closeCreate() {
    this.item = new Product();
    this.resetValidationFlags();
    this.visibleCreate = false;
  }

  closeEdit() {
    this.item = new Product();
    this.resetValidationFlags();
    this.visibleEdit = false;
  }

  public save(): void {
    if (!this.validateForm(this.item)) {
      this.messageService.add({
        severity: 'error',
        summary: 'Validation Error',
        detail: 'Please fix the validation errors.',
        styleClass: 'rounded-message error-message',
        life: 3000,
      });
      return;
    }

    if (!this.item.category) {
      this.messageService.add({
        severity: 'error',
        summary: 'Validation Error',
        detail: 'Please select a valid category.',
        styleClass: 'rounded-message error-message',
        life: 3000,
      });
      return;
    }

    const images = [this.item.imagesInput.trim()];

    if (!this.isValidUrl(images[0])) {
      this.messageService.add({
        severity: 'error',
        summary: 'Validation Error',
        detail: 'Please provide a valid image URL.',
        styleClass: 'rounded-message error-message',
        life: 3000,
      });
      return;
    }

    const payload = {
      title: this.item.title,
      price: this.item.price,
      description: this.item.description,
      categoryId: this.item.category.id,
      images: images,
    };

    this.productsService.createProduct(payload).subscribe({
      next: (createdProduct) => {
        this.items = [...this.items, createdProduct];
        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: 'Product added successfully!',
          styleClass: 'rounded-message success-message',
          life: 3000,
        });
        this.closeCreate();
      },
      error: (err) => {
        console.error(err);
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'An error occurred while adding the product.',
          styleClass: 'rounded-message error-message',
          life: 3000,
        });
      },
    });
  }

  public edit(product: Product): void {
    if (!this.validateForm(product)) {
      this.messageService.add({
        severity: 'error',
        summary: 'Validation Error',
        detail: 'Please fix the validation errors.',
        styleClass: 'rounded-message error-message',
        life: 3000,
      });
      return;
    }

    const images = [this.item.imagesInput.trim()];

    if (!this.isValidUrl(images[0])) {
      this.messageService.add({
        severity: 'error',
        summary: 'Validation Error',
        detail: 'Please provide a valid image URL.',
        styleClass: 'rounded-message error-message',
        life: 3000,
      });
      return;
    }

    const payload = {
      id: product.id,
      title: product.title,
      price: product.price,
      description: product.description,
      categoryId: product.category.id,
      images: images,
    };

    this.productsService.updateProduct(payload).subscribe({
      next: (updatedProduct) => {
        const index = this.items.findIndex((p) => p.id === updatedProduct.id);
        if (index !== -1) {
          this.items[index] = { ...updatedProduct };
        }
        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: 'Product updated successfully!',
          styleClass: 'rounded-message success-message',
          life: 3000,
        });
        this.closeEdit();
      },
      error: (err) => {
        console.error(err);

        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'An error occurred while updating the product.',
          styleClass: 'rounded-message error-message',
          life: 3000,
        });
      },
    });
  }

  public delete(item: Product): void {
    this.confirmationService.confirm({
      message: 'Are you sure you want to delete this product?',
      header: 'Confirmation',
      icon: 'pi pi-exclamation-triangle',
      rejectButtonStyleClass: 'p-button-danger p-button-sm',
      acceptButtonStyleClass: 'p-button-info p-button-sm',
      acceptLabel: 'Yes',
      rejectLabel: 'No',
      accept: () => {
        this.productsService.deleteProduct(item).subscribe(data => {
          if (data == true) {
            const position = this.items.indexOf(item);
            if (position > -1) {
              this.items.splice(position, 1);
            }
          }
          this.messageService.add({
            severity: 'success',
            summary: 'Success',
            detail: 'Product deleted',
            styleClass: 'rounded-message success-message',
            life: 3000,
          });
        });
      },
    });
  }

  public getProducts(): void {
    this.productsService.getProducts().subscribe({
      next: (data) => {
        this.items = data;
        this.initialValue = [...data];
      },
      error: (error) => {
        console.error(error);
      },
    });
  }

  getCategories(): void {
    this.productsService.getCategories().subscribe({
      next: (data) => {
        this.categories = data;
      },
      error: (error) => {
        console.error('Error fetching categories:', error);
      },
    });
  }

  validateForm(item: any): boolean {
    this.validateTitle = !!item.title;
    this.validatePrice = item.price > 0;
    this.validateDescription = !!item.description;
    this.validateCategoryId = !!this.selectedCategory;
    this.validateImages = !!item.images || this.isValidUrl(item.images);

    return (
      this.validateTitle &&
      this.validatePrice &&
      this.validateDescription &&
      this.validateCategoryId &&
      this.validateImages
    );
  }

  private isValidUrl(url: string): boolean {
    const urlPattern = /^(https?:\/\/)?([a-z0-9-]+\.)+[a-z]{2,}(:\d+)?(\/[^\s]*)?$/i;
    return urlPattern.test(url);
  }

  customSort(event: SortEvent) {
    if (this.isSorted == null || this.isSorted === undefined) {
      this.isSorted = true;
      this.sortTableData(event);
    } else if (this.isSorted == true) {
      this.isSorted = false;
      this.sortTableData(event);
    } else if (this.isSorted == false) {
      this.isSorted = null;
      this.items = [...this.initialValue];
      this.dt.reset();
    }
  }

  sortTableData(event: SortEvent) {
    if (!event.field || event.order === undefined) return;
    const field = event.field as keyof typeof this.items[0];

    this.items.sort((data1, data2) => {
      let value1 = data1[field];
      let value2 = data2[field];
      let result = 0;

      if (value1 == null && value2 != null) result = -1;
      else if (value1 != null && value2 == null) result = 1;
      else if (value1 == null && value2 == null) result = 0;
      else if (typeof value1 === 'string' && typeof value2 === 'string') {
        result = value1.localeCompare(value2);
      } else if (value1 !== undefined && value2 !== undefined) {
        result = value1 < value2 ? -1 : value1 > value2 ? 1 : 0;
      }

      return (event.order || 1) * result;
    });
  }

  onGlobalFilter(table: Table, event: Event) {
    table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
  }

  get item(): Product {
    return this.productsService.item;
  }

  set item(value: Product) {
    this.productsService.item = value;
  }

  get items(): Array<Product> {
    return this.productsService.items;
  }

  set items(value: Array<Product>) {
    this.productsService.items = value;
  }
}
