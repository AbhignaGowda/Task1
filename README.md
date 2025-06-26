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

### Installation

```bash
git clone https://github.com/AbhignaGowda/Task1.git
cd Task1
npm install
ng serve
