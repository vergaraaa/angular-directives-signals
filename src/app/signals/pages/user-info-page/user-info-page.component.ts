import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { UsersService } from '../../services/users-service.service';
import { User } from '../../interfaces/user-request.interface';
import { filter } from 'rxjs';

@Component({
  templateUrl: './user-info-page.component.html',
  styleUrl: './user-info-page.component.css',
})
export class UserInfoPageComponent implements OnInit {
  private usersService = inject(UsersService);

  public userId = signal(1);
  public currentUser = signal<User | undefined>(undefined);
  public userWasFound = signal(true);
  public fullname = computed<string>(() => {
    if (!this.currentUser()) return 'User not found';

    return `${this.currentUser()?.first_name} ${this.currentUser()?.last_name}`;
  });

  ngOnInit(): void {
    this.getUser(this.userId());
  }

  getUser(id: number) {
    if (id <= 0) return;

    this.userId.set(id);
    this.currentUser.set(undefined);

    this.usersService.getUserById(id).subscribe({
      next: (user) => {
        this.currentUser.set(user);
        this.userWasFound.set(true);
      },
      error: () => {
        this.currentUser.set(undefined);
        this.userWasFound.set(false);
      },
    });
  }
}
