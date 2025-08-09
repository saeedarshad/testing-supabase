import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '../services/auth';
import { CardModule } from 'primeng/card';
import { ChartModule } from 'primeng/chart';
import { TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';
import { ButtonModule } from 'primeng/button';

interface Transaction {
  id: string;
  date: Date;
  description: string;
  amount: number;
  category: string;
  type: 'income' | 'expense';
}

interface FinanceData {
  totalBalance: number;
  monthlyIncome: number;
  monthlyExpenses: number;
  savingsRate: number;
}

@Component({
  selector: 'app-dashboard',
  imports: [
    CommonModule,
    CardModule,
    ChartModule,
    TableModule,
    TagModule,
    ButtonModule
  ],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css'
})
export class DashboardComponent implements OnInit {
  private authService = inject(AuthService);
  
  currentUser = this.authService.currentUser;
  
  financeData: FinanceData = {
    totalBalance: 0,
    monthlyIncome: 0,
    monthlyExpenses: 0,
    savingsRate: 0
  };

  recentTransactions: Transaction[] = [];
  chartData: any;
  chartOptions: any;
  expenseChartData: any;

  ngOnInit() {
    this.loadFinanceData();
    this.setupCharts();
  }

  loadFinanceData() {
    // Sample finance data
    this.financeData = {
      totalBalance: 25750.50,
      monthlyIncome: 8500.00,
      monthlyExpenses: 6200.75,
      savingsRate: 27.1
    };

    // Sample transactions
    this.recentTransactions = [
      {
        id: '1',
        date: new Date('2024-01-15'),
        description: 'Salary Deposit',
        amount: 8500.00,
        category: 'Salary',
        type: 'income'
      },
      {
        id: '2',
        date: new Date('2024-01-14'),
        description: 'Grocery Shopping',
        amount: -145.67,
        category: 'Food',
        type: 'expense'
      },
      {
        id: '3',
        date: new Date('2024-01-13'),
        description: 'Utility Bill',
        amount: -89.32,
        category: 'Utilities',
        type: 'expense'
      },
      {
        id: '4',
        date: new Date('2024-01-12'),
        description: 'Investment Return',
        amount: 234.55,
        category: 'Investments',
        type: 'income'
      },
      {
        id: '5',
        date: new Date('2024-01-11'),
        description: 'Gas Station',
        amount: -52.40,
        category: 'Transportation',
        type: 'expense'
      }
    ];
  }

  setupCharts() {
    // Monthly Income vs Expenses Chart
    this.chartData = {
      labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
      datasets: [
        {
          label: 'Income',
          data: [8500, 8200, 8700, 8300, 8500, 8600],
          backgroundColor: 'rgba(34, 197, 94, 0.2)',
          borderColor: 'rgb(34, 197, 94)',
          borderWidth: 2
        },
        {
          label: 'Expenses',
          data: [6200, 5800, 6500, 6100, 6200, 6300],
          backgroundColor: 'rgba(239, 68, 68, 0.2)',
          borderColor: 'rgb(239, 68, 68)',
          borderWidth: 2
        }
      ]
    };

    // Expense Categories Chart
    this.expenseChartData = {
      labels: ['Food', 'Utilities', 'Transportation', 'Entertainment', 'Healthcare', 'Other'],
      datasets: [
        {
          data: [1200, 450, 380, 650, 320, 800],
          backgroundColor: [
            '#FF6384',
            '#36A2EB',
            '#FFCE56',
            '#4BC0C0',
            '#9966FF',
            '#FF9F40'
          ]
        }
      ]
    };

    this.chartOptions = {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          position: 'top'
        }
      },
      scales: {
        y: {
          beginAtZero: true
        }
      }
    };
  }

  getTransactionSeverity(type: string): string {
    return type === 'income' ? 'success' : 'danger';
  }

  formatCurrency(amount: number): string {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  }
}
