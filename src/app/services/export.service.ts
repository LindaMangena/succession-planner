import { Injectable } from '@angular/core';
import { SuccessionPlan } from '../features/employee/models/succession-plan.model';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';
import { jsPDF } from 'jspdf';
import 'jspdf-autotable';

@Injectable({
  providedIn: 'root'
})
export class ExportService {
  constructor() {}

  exportToCSV(data: any[]) {
    const csvData = this.convertToCSV(data);
    const blob = new Blob([csvData], { type: 'text/csv;charset=utf-8' });
    saveAs(blob, 'succession-plans.csv');
  }

  exportToWord(data: any[]) {
    const content = this.generateWordContent(data);
    const blob = new Blob([content], { type: 'application/msword' });
    saveAs(blob, 'succession-plans.doc');
  }

  exportToPDF(data: any[]) {
    const doc = new jsPDF();
    
    // Add title
    doc.setFontSize(16);
    doc.text('Succession Plans Report', 14, 15);
    
    // Add date
    doc.setFontSize(10);
    doc.text(`Generated on: ${new Date().toLocaleDateString()}`, 14, 25);

    // Create table
    const tableData = data.map(plan => [
      plan.employeeName,
      plan.position || '',
      plan.potential || '',
      plan.readinessLevel || '',
      plan.criticalTalent ? 'Yes' : 'No'
    ]);

    (doc as any).autoTable({
      head: [['Employee', 'Position', 'Potential', 'Readiness', 'Critical Talent']],
      body: tableData,
      startY: 35,
      theme: 'grid',
      styles: { fontSize: 8 },
      headStyles: { fillColor: [35, 81, 47] }
    });

    doc.save('succession-plans.pdf');
  }

  exportToExcel(data: any[]) {
    const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(data);
    const workbook: XLSX.WorkBook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
    const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    this.saveAsExcelFile(excelBuffer, 'succession-plans');
  }

  private convertToCSV(plans: SuccessionPlan[]): string {
    const headers = ['Employee', 'Position', 'Potential', 'Readiness', 'Critical Talent', 'Development Needs', 'Targeted Interventions'];
    const rows = plans.map(plan => [
      plan.employeeName,
      plan.position || '',
      plan.potential || '',
      plan.readinessLevel || '',
      plan.criticalTalent ? 'Yes' : 'No',
      plan.developmentNeeds || '',
      plan.targetedInterventions || ''
    ]);

    return [
      headers.join(','),
      ...rows.map(row => row.map(cell => `"${cell}"`).join(','))
    ].join('\n');
  }

  private generateWordContent(plans: SuccessionPlan[]): string {
    const header = `
      <html xmlns:o="urn:schemas-microsoft-com:office:office" 
            xmlns:w="urn:schemas-microsoft-com:office:word" 
            xmlns="http://www.w3.org/TR/REC-html40">
      <head>
        <meta charset="utf-8">
        <title>Succession Plans Report</title>
      </head>
      <body>
        <h1>Succession Plans Report</h1>
        <p>Generated on: ${new Date().toLocaleDateString()}</p>
        <table border="1">
          <tr>
            <th>Employee</th>
            <th>Position</th>
            <th>Potential</th>
            <th>Readiness</th>
            <th>Critical Talent</th>
            <th>Development Needs</th>
            <th>Targeted Interventions</th>
          </tr>
    `;

    const rows = plans.map(plan => `
      <tr>
        <td>${plan.employeeName}</td>
        <td>${plan.position || ''}</td>
        <td>${plan.potential || ''}</td>
        <td>${plan.readinessLevel || ''}</td>
        <td>${plan.criticalTalent ? 'Yes' : 'No'}</td>
        <td>${plan.developmentNeeds || ''}</td>
        <td>${plan.targetedInterventions || ''}</td>
      </tr>
    `).join('');

    const footer = `
        </table>
      </body>
      </html>
    `;

    return header + rows + footer;
  }

  private saveAsExcelFile(buffer: any, fileName: string): void {
    const data: Blob = new Blob([buffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
    saveAs(data, `${fileName}_${new Date().getTime()}.xlsx`);
  }
} 