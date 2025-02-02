import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../service/auth/auth.service';
import { CommonModule } from '@angular/common';
import { BehaviorSubject, Observable } from 'rxjs';

@Component({
  selector: 'app-profile',
  imports: [CommonModule],
  templateUrl: './profile.component.html',
})
export class ProfileComponent implements OnInit {
  private userSubject = new BehaviorSubject<any>(null);
  user$: Observable<any> = this.userSubject.asObservable();

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.authService.getProfile().subscribe((user) => {
      this.userSubject.next(user);
    });
  }
}
