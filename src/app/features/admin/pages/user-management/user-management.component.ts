import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface User {
  personnelNumber: number;
  name: string;
  position: string;
  startDate: string;
  operations: string;
  manager: string;
  employmentType: 'Permanent' | 'Temps' | 'Senior Management';
  lt: string;
  exco: string;
  performanceRating: 'Significant' | 'Some Improvement Required';
}

@Component({
  selector: 'app-user-management',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './user-management.component.html',
  styleUrls: ['./user-management.component.scss']
})
export class UserManagementComponent implements OnInit {
  users: User[] = [];
  showModal = false;
  isEditing = false;
  currentUserId: number | null = null;
  searchTerm = '';
  selectedDepartment = '';
  selectedRole = '';

  departments = ['Human Capital McOpCo'];
  roles = ['HC Business Partner', 'Payroll Administrator', 'Training Consultant', 'HC Manager'];
  managers = [
    'Gregory Solomon',
    'Elpelet Mashile',
    'Koena Cholo',
    'Nolwazi Mbewu',
    'Thabo Dibakwane',
    'Sekatane Prince Mphogo',
    'Lydia Ngobe'
  ];
  employmentTypes: ('Permanent' | 'Temps' | 'Senior Management')[] = ['Permanent', 'Temps', 'Senior Management'];
  performanceRatings: ('Significant' | 'Some Improvement Required')[] = ['Significant', 'Some Improvement Required'];

  userForm: User = {
    personnelNumber: 0,
    name: '',
    position: '',
    startDate: '',
    operations: '',
    manager: '',
    employmentType: 'Permanent',
    lt: '',
    exco: '',
    performanceRating: 'Significant'
  };

  ngOnInit() {
    this.loadUsers();
  }

  loadUsers() {
    const storedUsers = localStorage.getItem('users');
    if (storedUsers) {
      this.users = JSON.parse(storedUsers);
    }
  }

  getManagersWithUsers(): string[] {
    return [...new Set(this.users.map(user => user.manager))];
  }

  getReportsForManager(manager: string): User[] {
    return this.users.filter(user => user.manager === manager);
  }

  getFilteredReports(manager: string): User[] {
    let filtered = this.getReportsForManager(manager);

    if (this.searchTerm) {
      const searchLower = this.searchTerm.toLowerCase();
      filtered = filtered.filter(user =>
        user.name.toLowerCase().includes(searchLower) ||
        user.position.toLowerCase().includes(searchLower) ||
        user.performanceRating.toLowerCase().includes(searchLower)
      );
    }

    if (this.selectedDepartment) {
      filtered = filtered.filter(user => user.operations === this.selectedDepartment);
    }

    if (this.selectedRole) {
      filtered = filtered.filter(user => user.position === this.selectedRole);
    }

    return filtered;
  }

  openAddUserModal() {
    this.isEditing = false;
    this.currentUserId = null;
    this.userForm = {
      personnelNumber: 0,
      name: '',
      position: '',
      startDate: '',
      operations: '',
      manager: '',
      employmentType: 'Permanent',
      lt: '',
      exco: '',
      performanceRating: 'Significant'
    };
    this.showModal = true;
  }

  editUser(user: User) {
    this.isEditing = true;
    this.currentUserId = user.personnelNumber;
    this.userForm = { ...user };
    this.showModal = true;
  }

  closeModal() {
    this.showModal = false;
    this.isEditing = false;
    this.currentUserId = null;
  }

  submitUser() {
    if (this.isEditing && this.currentUserId !== null) {
      const index = this.users.findIndex(u => u.personnelNumber === this.currentUserId);
      if (index !== -1) {
        this.users[index] = { ...this.userForm };
      }
    } else {
      this.userForm.personnelNumber = Math.floor(Math.random() * 100000);
      this.users.push({ ...this.userForm });
    }

    localStorage.setItem('users', JSON.stringify(this.users));
    this.closeModal();
  }

  deleteUser(user: User) {
    if (confirm('Are you sure you want to delete this user?')) {
      this.users = this.users.filter(u => u.personnelNumber !== user.personnelNumber);
      localStorage.setItem('users', JSON.stringify(this.users));
    }
  }
} 