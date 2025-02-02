import { Component, OnInit, ViewChild } from '@angular/core';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { UserServiceService } from '../../service/users/user-service.service';
import { AvatarModule } from 'primeng/avatar';
import { CommonModule } from '@angular/common';
import { PaginatorModule } from 'primeng/paginator';
import { Table, TableModule } from 'primeng/table';
import { SortEvent } from 'primeng/api';
import { FloatLabelModule } from 'primeng/floatlabel';
import { ConfirmDialogModule } from "primeng/confirmdialog";
import { Dialog } from 'primeng/dialog';
import { ConfirmationService, MessageService } from "primeng/api";
import { ToastModule } from 'primeng/toast';
import { FormsModule } from '@angular/forms';
import { User } from '../../model/user/user';


@Component({
  selector: 'app-users',
  imports: [CommonModule, CardModule, ButtonModule, FormsModule, AvatarModule, PaginatorModule, TableModule, FloatLabelModule, Dialog, ConfirmDialogModule, ToastModule],
  templateUrl: './users.component.html',
  styleUrl: './users.component.css',
  providers: [ConfirmationService, MessageService]
})

export class UsersComponent implements OnInit {
  @ViewChild('dt') dt!: Table;
  initialValue: User[] = [];
  visibleCreate: boolean = false;
  visibleEdit: boolean = false;
  isSorted: boolean | null = null;
  public validateAvatar!: boolean;
  public validateEmail!: boolean;
  public validatePassword!: boolean;

  constructor(private usersService: UserServiceService, private confirmationService: ConfirmationService, private messageService: MessageService) { }

  ngOnInit(): void {
    this.getUsers();
    this.resetValidationFlags();
  }

  resetValidationFlags(): void {
    this.validateAvatar = true;
    this.validateEmail = true;
    this.validatePassword = true;
  }

  showDialogCreate() {
    this.item = new User();
    this.visibleCreate = true;
  }

  public showDialogEdit(user: User): void {
    this.item = { ...user };
    this.visibleEdit = true;
  }

  closeCreate() {
    this.item = new User();
    this.resetValidationFlags();
    this.visibleCreate = false;
  }

  closeEdit() {
    this.item = new User();
    this.resetValidationFlags();
    this.visibleEdit = false;
  }

  public save(): void {
    if (!this.validateForm(this.item)) {
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'Please fix the validation errors',
        styleClass: 'rounded-message error-message',
        life: 3000,
      });
      return;
    }

    this.usersService.createUser().subscribe({
      next: (data) => {
        this.items.push({ ...data });
        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: 'User created successfully',
          styleClass: 'rounded-message success-message',
          life: 3000,
        });
        this.closeCreate();
      },
      error: (err) => {
        if (err.status === 400 && err.error && Array.isArray(err.error.message)) {
          err.error.message.forEach((errorMsg: string) => {
            this.messageService.add({
              severity: 'error',
              summary: 'Error',
              detail: errorMsg,
              styleClass: 'rounded-message error-message',
              life: 3000,
            });
          });
        } else {
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: 'An error occurred while creating the user',
            styleClass: 'rounded-message error-message',
            life: 3000,
          });
        }
      },
    });
  }


  public edit(user: User): void {
    if (!this.validateForm(user)) {
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'Please fix the validation errors',
        styleClass: 'rounded-message error-message',
        life: 3000,
      });
      return;
    }

    this.usersService.updateUser(user).subscribe({
      next: (updatedUser) => {
        const index = this.items.findIndex((u) => u.id === updatedUser.id);
        if (index !== -1) {
          this.items[index] = { ...updatedUser };
        }
        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: 'User updated successfully',
          styleClass: 'rounded-message success-message',
          life: 3000,
        });
        this.closeEdit();
      },
      error: (err) => {
        if (err.status === 400 && err.error && Array.isArray(err.error.message)) {
          err.error.message.forEach((errorMsg: string) => {
            this.messageService.add({
              severity: 'error',
              summary: 'Error',
              detail: errorMsg,
              styleClass: 'rounded-message error-message',
              life: 3000,
            });
          });
        } else {
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: 'An error occurred while updating the user',
            styleClass: 'rounded-message error-message',
            life: 3000,
          });
        }
      },
    });
  }

  public delete(item: User): void {
    this.confirmationService.confirm({
      message: 'Are you you want to delete this user ?',
      header: 'Confirmation',
      icon: 'pi pi-exclamation-triangle',
      rejectButtonStyleClass: 'p-button-danger p-button-sm',
      acceptButtonStyleClass: 'p-button-info p-button-sm',
      acceptLabel: 'Yes',
      rejectLabel: 'No',
      accept: () => {
        const position = this.items.indexOf(item);
        if (position > -1) {
          this.items.splice(position, 1);
        }
        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: 'User deleted',
          styleClass: 'rounded-message success-message',
          life: 3000
        });
      }
    });
  }

  public getUsers(): void {
    this.usersService.getUsers().subscribe({
      next: (data) => {
        this.items = data;
        this.initialValue = [...data];

      },
      error: error => {
        console.error(error);
      }
    });
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

  private validateForm(user: User): boolean {
    let counter = 0;

    if (!user.avatar || !this.isValidUrl(user.avatar)) {
      this.validateAvatar = false;
      counter++;
    } else {
      this.validateAvatar = true;
    }

    if (!user.email || !this.isValidEmail(user.email)) {
      this.validateEmail = false;
      counter++;
    } else {
      this.validateEmail = true;
    }

    if (!user.password || user.password.length < 4) {
      this.validatePassword = false;
      counter++;
    } else {
      this.validatePassword = true;
    }

    return counter === 0;
  }


  private isValidUrl(url: string): boolean {
    const urlPattern = /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/;
    return urlPattern.test(url);
  }

  private isValidEmail(email: string): boolean {
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailPattern.test(email);
  }

  get item(): User {
    return this.usersService.item;
  }

  set item(value: User) {
    this.usersService.item = value;
  }

  get items(): Array<User> {
    return this.usersService.items;
  }

  set items(value: Array<User>) {
    this.usersService.items = value;
  }
}
