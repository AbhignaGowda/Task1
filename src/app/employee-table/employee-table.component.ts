// employee-table.component.ts
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
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

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    const apiUrl = 'https://rc-vault-fap-live-1.azurewebsites.net/api/gettimeentries?code=vO17RnE8vuzXzPJo5eaLLjXjmRW07law99QTD90zat9FfOQJKKUcgQ==';
    
    this.http.get<any[]>(apiUrl).subscribe({
      next: (entries) => {
        const totals: { [key: string]: number } = {};
        entries.forEach(entry => {
          if (entry.EmployeeName && entry.StarTimeUtc && entry.EndTimeUtc && !entry.DeletedOn) {
            const start = new Date(entry.StarTimeUtc);
            const end = new Date(entry.EndTimeUtc);
            const diffHours = (end.getTime() - start.getTime()) / (1000 * 60 * 60);
            if (diffHours > 0) {
              totals[entry.EmployeeName] = (totals[entry.EmployeeName] || 0) + diffHours;
            }
          }
        });

        this.employees = Object.entries(totals)
          .map(([name, totalTime]) => ({ name, totalTime: Math.round(totalTime) }))
          .sort((a, b) => b.totalTime - a.totalTime);
        
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
    
    // Generate colors dynamically
    const colors = this.generateColors(this.employees.length);

    this.pieChart = new Chart(this.pieCanvas.nativeElement, {
      type: 'doughnut', // Changed to doughnut for modern look
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
    const colors = [
      '#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6',
      '#06B6D4', '#84CC16', '#F97316', '#EC4899', '#6366F1'
    ];
    
    while (colors.length < count) {
      colors.push(`hsl(${Math.floor(Math.random() * 360)}, 65%, 55%)`);
    }
    
    return colors.slice(0, count);
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