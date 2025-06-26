import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

interface TimeEntry {
  employeeName: string;
  timeWorked: number;
}

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  private apiUrl = 'https://rc-vault-fap-live-1.azurewebsites.net/api/gettimeentries?code=vO17RnE8vuzXzPJo5eaLLjXjmRW07law99QTD90zat9FfOQJKKUcgQ==';

  constructor(private http: HttpClient) {}

  getEmployeeTotalTime(): Observable<{name: string, totalTime: number}[]> {
    return this.http.get<any[]>(this.apiUrl).pipe(
      map(entries => {
        const totals: {[key: string]: number} = {};
        
        entries.forEach(entry => {
          if (entry.employeeName && entry.timeWorked) {
            totals[entry.employeeName] = (totals[entry.employeeName] || 0) + entry.timeWorked;
          }
        });

        return Object.entries(totals).map(([name, totalTime]) => ({ name, totalTime }))
                   .sort((a, b) => b.totalTime - a.totalTime);
      })
    );
  }
}
