// employee.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../environments/environment.prod';



interface Employee {
  name: string;
  totalTime: number;
}

@Injectable({ providedIn: 'root' })
export class EmployeeService {
  private apiUrl = `${environment.apiUrl}?code=${environment.apiKey}`;

  constructor(private http: HttpClient) {}

  getEmployeeTotalTime(): Observable<Employee[]> {
    return this.http.get<any[]>(this.apiUrl).pipe(
      map(entries => {
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

        return Object.entries(totals)
          .map(([name, totalTime]) => ({ name, totalTime: Math.round(totalTime) }))
          .sort((a, b) => b.totalTime - a.totalTime);
      })
    );
  }
}
