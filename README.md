# 🕒 Employee Time Tracker - Task 1 (Angular)

This Angular project visualizes employee work time data by displaying a dynamic table and an interactive pie chart. It fetches employee work entries from a public API, aggregates total work hours per employee, and presents the results with visual cues and chart-based representation.

---

## 📦 Features

✅ Displays employee details in a clean, sortable table  
✅ Aggregates and shows **total time worked (in hours)** per employee  
✅ Highlights rows for employees who worked **less than 100 hours**  
✅ Interactive Pie Chart showing percentage contribution of total hours by each employee  
✅ Fully responsive and built with Angular's latest standalone components  

---

## 🌐 Data Source

Data is fetched from the following API:


The API provides JSON time entry records containing:

- `EmployeeName`  
- `StarTimeUtc` (Start time in UTC)  
- `EndTimeUtc` (End time in UTC)  
- `EntryNotes`  
- `DeletedOn` (if applicable)  

Only valid (non-deleted) entries are considered for aggregation.

---

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/en) (v18+ recommended)  
- [Angular CLI](https://angular.io/cli)

### Output!
![Screenshot from 2025-06-30 17-56-10](https://github.com/user-attachments/assets/489b9309-55cb-4a48-b476-a894a0366b9a)

![Screenshot from 2025-06-30 17-55-59](https://github.com/user-attachments/assets/896cf10e-fdf8-496e-83c0-f06e5409de94)

![Screenshot from 2025-06-30 17-08-08](https://github.com/user-attachments/assets/785aa843-f9fa-4402-92bb-b40069c77922)


### Installation

```bash
git clone https://github.com/AbhignaGowda/Task1.git
cd Task1
npm install
ng serve
