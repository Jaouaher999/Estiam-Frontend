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

interface Column {
  field: string;
  header: string;
}

@Component({
  selector: 'app-users',
  imports: [CommonModule, CardModule, ButtonModule, AvatarModule, PaginatorModule, TableModule, FloatLabelModule],
  templateUrl: './users.component.html',
  styleUrl: './users.component.css'
})
export class UsersComponent implements OnInit {
  users: any[] = [];
  cols!: Column[];
  @ViewChild('dt') dt!: Table;
  initialValue: any[] = [];

  isSorted: boolean | null = null;

  constructor(private usersService: UserServiceService) { }

  ngOnInit(): void {
    this.usersService.getUsers().subscribe({
      next: (data) => {
        this.users = data;
        this.initialValue = [...data];

      },
      error: error => {
        console.error(error);
      }
    });
    this.cols = [
      { field: 'id', header: 'Id' },
      { field: 'name', header: 'Name' },
      { field: 'role', header: 'Role' },
      { field: 'email', header: 'Email' }
    ];
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
      this.users = [...this.initialValue];
      this.dt.reset();
    }
  }

  sortTableData(event: SortEvent) {
    if (!event.field || event.order === undefined) return;
    const field = event.field as keyof typeof this.users[0];

    this.users.sort((data1, data2) => {
      let value1 = data1[field];
      let value2 = data2[field];
      let result = null;
      if (value1 == null && value2 != null) result = -1;
      else if (value1 != null && value2 == null) result = 1;
      else if (value1 == null && value2 == null) result = 0;
      else if (typeof value1 === 'string' && typeof value2 === 'string') result = value1.localeCompare(value2);
      else result = value1 < value2 ? -1 : value1 > value2 ? 1 : 0;

      return (event.order || 1) * result;
    });
  }
  onGlobalFilter(table: Table, event: Event) {
    table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
  }

}
