// employee-table.component.ts
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmployeeService } from '../../app/employee-service';
import Chart from 'chart.js/auto';

@Component({
  selector: 'app-employee-table',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './employee-table.component.html',
  styleUrls: ['./employee-table.component.css']
})
export class EmployeeTableComponent implements OnInit {
  employees: { name: string; totalTime: number }[] = [];
  @ViewChild('pieCanvas') pieCanvas!: ElementRef<HTMLCanvasElement>;
  pieChart: any;
  isLoading = true;
  totalHours = 0;

  constructor(private employeeService: EmployeeService) {}

  ngOnInit(): void {
    this.isLoading = true;
    this.employeeService.getEmployeeTotalTime().subscribe({
      next: (data) => {
        this.employees = data;
        this.totalHours = this.employees.reduce((sum, emp) => sum + emp.totalTime, 0);
        this.isLoading = false;
        setTimeout(() => this.createPieChart(), 0);
      },
      error: (error) => {
        console.error('Error fetching data:', error);
        this.isLoading = false;
      }
    });
  }

  createPieChart(): void {
    if (this.pieChart) {
      this.pieChart.destroy();
    }

    const labels = this.employees.map(e => e.name);
    const data = this.employees.map(e => e.totalTime);
    const colors = this.generateColors(this.employees.length);

    this.pieChart = new Chart(this.pieCanvas.nativeElement, {
      type: 'doughnut',
      data: {
        labels: labels,
        datasets: [{
          label: 'Hours Worked',
          data: data,
          backgroundColor: colors,
          borderWidth: 2,
          borderColor: '#ffffff',
          hoverBorderWidth: 3,
          hoverOffset: 10
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            position: 'bottom',
            labels: {
              padding: 20,
              usePointStyle: true,
              font: {
                size: 12
              }
            }
          },
          tooltip: {
            callbacks: {
              label: (context) => {
                const percentage = ((context.parsed / this.totalHours) * 100).toFixed(1);
                return `${context.label}: ${context.parsed} hours (${percentage}%)`;
              }
            }
          }
        }
      }
    });
  }

  generateColors(count: number): string[] {
    const colors: string[] = [];
    for (let i = 0; i < count; i++) {
      const hue = Math.floor((360 / count) * i);
      colors.push(`hsl(${hue}, 65%, 55%)`);
    }
    return colors;
  }

  getPerformanceLevel(hours: number): string {
    if (hours < 100) return 'critical';
    if (hours >= 160) return 'excellent';
    if (hours >= 120) return 'good';
    if (hours >= 80) return 'average';
    return 'below-average';
  }

  getPerformanceIcon(hours: number): string {
    if (hours < 100) return '🚨';
    if (hours >= 160) return '🏆';
    if (hours >= 120) return '⭐';
    if (hours >= 80) return '👍';
    return '⚠️';
  }
}

