import { Component, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { AuthService, User } from '../services/auth';
import { CardModule } from 'primeng/card';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { SelectModule } from 'primeng/select';
import { TagModule } from 'primeng/tag';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ToastModule } from 'primeng/toast';
import { ConfirmationService, MessageService } from 'primeng/api';

interface AdminUser extends User {
  lastLogin?: Date;
  status: 'active' | 'inactive' | 'suspended';
  createdAt: Date;
}

@Component({
  selector: 'app-admin',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    CardModule,
    TableModule,
    ButtonModule,
    DialogModule,
    InputTextModule,
    SelectModule,
    TagModule,
    ConfirmDialogModule,
    ToastModule
  ],
  providers: [ConfirmationService, MessageService],
  templateUrl: './admin.html',
  styleUrl: './admin.css'
})
export class AdminComponent implements OnInit {
  private authService = inject(AuthService);
  private fb = inject(FormBuilder);
  private confirmationService = inject(ConfirmationService);
  private messageService = inject(MessageService);

  currentUser = this.authService.currentUser;
  users = signal<AdminUser[]>([]);
  loading = signal(false);
  showUserDialog = signal(false);
  editingUser = signal<AdminUser | null>(null);

  userForm: FormGroup;
  roleOptions = [
    { label: 'User', value: 'user' },
    { label: 'Admin', value: 'admin' }
  ];
  statusOptions = [
    { label: 'Active', value: 'active' },
    { label: 'Inactive', value: 'inactive' },
    { label: 'Suspended', value: 'suspended' }
  ];

  constructor() {
    this.userForm = this.fb.group({
      firstName: ['', [Validators.required, Validators.minLength(2)]],
      lastName: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      role: ['user' as const, Validators.required],
      status: ['active' as const, Validators.required]
    });
  }

  ngOnInit() {
    this.loadUsers();
  }

  loadUsers() {
    this.loading.set(true);
    
    // Simulate API call with sample data
    setTimeout(() => {
      const sampleUsers: AdminUser[] = [
        {
          id: '1',
          firstName: 'Admin',
          lastName: 'User',
          email: 'admin@demo.com',
          role: 'admin' as const,
          status: 'active' as const,
          lastLogin: new Date('2024-01-15T10:30:00'),
          createdAt: new Date('2023-12-01')
        },
        {
          id: '2',
          firstName: 'Regular',
          lastName: 'User',
          email: 'user@demo.com',
          role: 'user' as const,
          status: 'active' as const,
          lastLogin: new Date('2024-01-14T15:45:00'),
          createdAt: new Date('2023-12-15')
        },
        {
          id: '3',
          firstName: 'John',
          lastName: 'Doe',
          email: 'john.doe@example.com',
          role: 'user' as const,
          status: 'inactive' as const,
          lastLogin: new Date('2024-01-10T09:15:00'),
          createdAt: new Date('2024-01-01')
        },
        {
          id: '4',
          firstName: 'Jane',
          lastName: 'Smith',
          email: 'jane.smith@example.com',
          role: 'user' as const,
          status: 'suspended' as const,
          lastLogin: new Date('2024-01-05T14:20:00'),
          createdAt: new Date('2024-01-02')
        }
      ];
      
      this.users.set(sampleUsers);
      this.loading.set(false);
    }, 1000);
  }

  openUserDialog(user?: AdminUser) {
    if (user) {
      this.editingUser.set(user);
      this.userForm.patchValue({
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        role: user.role,
        status: user.status
      });
    } else {
      this.editingUser.set(null);
      this.userForm.reset({
        role: 'user' as const,
        status: 'active' as const
      });
    }
    this.showUserDialog.set(true);
  }

  closeUserDialog() {
    this.showUserDialog.set(false);
    this.editingUser.set(null);
    this.userForm.reset();
  }

  saveUser() {
    if (this.userForm.valid) {
      const formValue = this.userForm.value;
      const currentUsers = this.users();
      
      if (this.editingUser()) {
        // Update existing user
        const updatedUsers = currentUsers.map(user => 
          user.id === this.editingUser()!.id 
            ? { ...user, ...formValue } as AdminUser
            : user
        );
        this.users.set(updatedUsers);
        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: 'User updated successfully'
        });
      } else {
        // Create new user
        const newUser: AdminUser = {
          id: Date.now().toString(),
          ...formValue,
          createdAt: new Date(),
          lastLogin: undefined
        };
        this.users.set([...currentUsers, newUser]);
        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: 'User created successfully'
        });
      }
      
      this.closeUserDialog();
    }
  }

  deleteUser(user: AdminUser) {
    this.confirmationService.confirm({
      message: `Are you sure you want to delete ${user.firstName} ${user.lastName}?`,
      header: 'Confirm Delete',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        const currentUsers = this.users();
        const updatedUsers = currentUsers.filter(u => u.id !== user.id);
        this.users.set(updatedUsers);
        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: 'User deleted successfully'
        });
      }
    });
  }

  toggleUserStatus(user: AdminUser) {
    const newStatus: 'active' | 'suspended' = user.status === 'active' ? 'suspended' : 'active';
    const currentUsers = this.users();
    const updatedUsers = currentUsers.map(u => 
      u.id === user.id 
        ? { ...u, status: newStatus } as AdminUser
        : u
    );
    this.users.set(updatedUsers);
    this.messageService.add({
      severity: 'info',
      summary: 'Status Updated',
      detail: `User ${newStatus === 'active' ? 'activated' : 'suspended'}`
    });
  }

  getStatusSeverity(status: string): string {
    switch (status) {
      case 'active': return 'success';
      case 'inactive': return 'warning';
      case 'suspended': return 'danger';
      default: return 'info';
    }
  }

  getRoleSeverity(role: string): string {
    return role === 'admin' ? 'info' : 'secondary';
  }
}
