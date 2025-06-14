import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Employee } from '../../../Model/employee.model';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { EmployeeService } from '../../../../services/employee.service';

@Component({
  selector: 'app-employee-list',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.scss'],
})
export class EmployeeListComponent {
  searchTerm: string = '';


  currentPage: { [manager: string]: number } = {}; // ✅ Added for pagination
  pageSize: number = 5; // ✅ Number of records per page

  constructor(
    private router: Router,
    private employeeService: EmployeeService
  ) {
    this.employeeService.setEmployees(this.employees);
  }


  employees: Employee[] = [


    {
      personnelNumber: "77700",
      name: "Boitumelo Josephine Thutlwa",
      position: "Junior ER & HC Consultant",
      startDate: "2021-03-01 00:00:00",
      operations: "Human Capital McOpCo",
      manager: "Sekatane Prince Mphogo",
      employmentType: "Permanent",
      lt: "Gregory Solomon",
      exco: "Gregory Solomon",
      performanceRating: "Significant",
    },
    {
      personnelNumber: "135",
      name: "Dumisani Mhlungulwana",
      position: "Payroll Administrator",
      startDate: "1996-12-01 00:00:00",
      operations: "Human Capital McOpCo",
      manager: "Elpelet Mashile",
      employmentType: "Permanent",
      lt: "Gregory Solomon",
      exco: "Gregory Solomon",
      performanceRating: "Significant",
    },
    {
      personnelNumber: "4",
      name: "Motlalepule Francina Bosch",
      position: "Payroll Administrator",
      startDate: "1997-06-19 00:00:00",
      operations: "Human Capital McOpCo",
      manager: "Elpelet Mashile",
      employmentType: "Permanent",
      lt: "Gregory Solomon",
      exco: "Gregory Solomon",
      performanceRating: "Significant",
    },
    // {
    //   personnelNumber: "170",
    //   name: "Elizabeth Madiga",
    //   position: "Senior Payroll Administra",
    //   startDate: "2012-11-22 00:00:00",
    //   operations: "Human Capital McOpCo",
    //   manager: "Elpelet Mashile",
    //   employmentType: "Permanent",
    //   lt: "Gregory Solomon",
    //   exco: "Gregory Solomon",
    //   performanceRating: "Significant",
    // },
    {
      personnelNumber: "63564",
      name: "Kim Nichole Ruiters",
      position: "Compensation & Benefits A",
      startDate: "2016-11-01 00:00:00",
      operations: "Human Capital McOpCo",
      manager: "Elpelet Mashile",
      employmentType: "Permanent",
      lt: "Gregory Solomon",
      exco: "Gregory Solomon",
      performanceRating: "Significant",
    },
    // {
    //   personnelNumber: "67959",
    //   name: "Natalie Mary Thomas",
    //   position: "Payroll Administrator",
    //   startDate: "2018-01-15 00:00:00",
    //   operations: "Human Capital McOpCo",
    //   manager: "Elpelet Mashile",
    //   employmentType: "Permanent",
    //   lt: "Gregory Solomon",
    //   exco: "Gregory Solomon",
    //   performanceRating: "Significant",
    // },
    {
      personnelNumber: "70287",
      name: "Roxanne Katrina Hadiaris",
      position: "Time Administrator",
      startDate: "2018-09-01 00:00:00",
      operations: "Human Capital McOpCo",
      manager: "Elpelet Mashile",
      employmentType: "Permanent",
      lt: "Gregory Solomon",
      exco: "Gregory Solomon",
      performanceRating: "Significant",
    },
    {
      personnelNumber: "78055",
      name: "Edna Ngobeni",
      position: "Payroll Administrator",
      startDate: "2021-09-01 00:00:00",
      operations: "Human Capital McOpCo",
      manager: "Elpelet Mashile",
      employmentType: "Permanent",
      lt: "Gregory Solomon",
      exco: "Gregory Solomon",
      performanceRating: "Significant",
    },
    // {
    //   personnelNumber: "78495",
    //   name: "Nasira Madziwa",
    //   position: "Coordinator: Human Capita",
    //   startDate: "2021-10-18 00:00:00",
    //   operations: "Human Capital McOpCo",
    //   manager: "Gregory Solomon",
    //   employmentType: "Permanent",
    //   lt: "Gregory Solomon",
    //   exco: "Gregory Solomon",
    //   performanceRating: "Significant",
    // },
    {
      personnelNumber: "44479",
      name: "Tejal Mani",
      position: "Payroll Administrator",
      startDate: "2024-07-01 00:00:00",
      operations: "Human Capital McOpCo",
      manager: "Elpelet Mashile",
      employmentType: "Permanent",
      lt: "Gregory Solomon",
      exco: "Gregory Solomon",
      performanceRating: "Significant",
    },
    {
      personnelNumber: "82865",
      name: "Patience Mamello Lehola",
      position: "Payroll Data Analytics",
      startDate: "2023-03-01 00:00:00",
      operations: "Human Capital McOpCo",
      manager: "Elpelet Mashile",
      employmentType: "Permanent",
      lt: "Gregory Solomon",
      exco: "Gregory Solomon",
      performanceRating: "Significant",
    },
    {
      personnelNumber: "29",
      name: "Denise Andrew",
      position: "Compensation & Benefits C",
      startDate: "2006-10-01 00:00:00",
      operations: "Human Capital McOpCo",
      manager: "Elpelet Mashile",
      employmentType: "Permanent",
      lt: "Gregory Solomon",
      exco: "Gregory Solomon",
      performanceRating: "Significant",
    },
    {
      personnelNumber: "78",
      name: "Carmel Sylvia Hayes",
      position: "HC Business Partner",
      startDate: "2007-06-01 00:00:00",
      operations: "Human Capital McOpCo",
      manager: "Koena Cholo",
      employmentType: "Permanent",
      lt: "Gregory Solomon",
      exco: "Gregory Solomon",
      performanceRating: "Significant ",
    },
    {
      personnelNumber: "274",
      name: "George Molemo Bogatsu",
      position: "HC Business Partner",
      startDate: "2015-11-01 00:00:00",
      operations: "Human Capital McOpCo",
      manager: "Koena Cholo",
      employmentType: "Permanent",
      lt: "Gregory Solomon",
      exco: "Gregory Solomon",
      performanceRating: "Significant",
    },
    {
      personnelNumber: "61479",
      name: "Kovidroy Roopnarain Jadoo",
      position: "Time & Payroll Supervisor",
      startDate: "2016-06-27 00:00:00",
      operations: "Human Capital McOpCo",
      manager: "Elpelet Mashile",
      employmentType: "Permanent",
      lt: "Gregory Solomon",
      exco: "Gregory Solomon",
      performanceRating: "Some Improvement Required",
    },
    {
      personnelNumber: "66211",
      name: "Ellen Ramadimetsa Mokwena",
      position: "HC Business Partner",
      startDate: "2017-08-01 00:00:00",
      operations: "Human Capital McOpCo",
      manager: "Nolwazi Mbewu",
      employmentType: "Permanent",
      lt: "Gregory Solomon",
      exco: "Gregory Solomon",
      performanceRating: "Significant",
    },
    {
      personnelNumber: "74208",
      name: "Matseko Talita Mokhethi",
      position: "HC Business Partner",
      startDate: "2019-07-15 00:00:00",
      operations: "Human Capital McOpCo",
      manager: "Thabo Dibakwane",
      employmentType: "Permanent",
      lt: "Gregory Solomon",
      exco: "Gregory Solomon",
      performanceRating: "Significant",
    },
    {
      personnelNumber: "75274",
      name: "Brian Clardon Earl Cupido",
      position: "HC Business Partner",
      startDate: "2019-10-01 00:00:00",
      operations: "Human Capital McOpCo",
      manager: "Sibo Tyiwa",
      employmentType: "Permanent",
      lt: "Gregory Solomon",
      exco: "Gregory Solomon",
      performanceRating: "Significant",
    },
    {
      personnelNumber: "76782",
      name: "Xoliswa Mhlongo",
      position: "Skills Development Facili",
      startDate: "2020-01-15 00:00:00",
      operations: "Human Capital McOpCo",
      manager: "Sekatane Prince Mphogo",
      employmentType: "Permanent",
      lt: "Gregory Solomon",
      exco: "Gregory Solomon",
      performanceRating: "Significant",
    },
    {
      personnelNumber: "78787",
      name: "Fundile Khanyiso Mgijima",
      position: "Payroll Compliance Specia",
      startDate: "2021-12-01 00:00:00",
      operations: "Human Capital McOpCo",
      manager: "Elpelet Mashile",
      employmentType: "Permanent",
      lt: "Gregory Solomon",
      exco: "Gregory Solomon",
      performanceRating: "Significant",
    },
    {
      personnelNumber: "83803",
      name: "Kuhle Ntethelelo Luvuyo Ngcobo",
      position: "HC Business Partner",
      startDate: "2023-04-11 00:00:00",
      operations: "Human Capital McOpCo",
      manager: "Thabo Dibakwane",
      employmentType: "Permanent",
      lt: "Gregory Solomon",
      exco: "Gregory Solomon",
      performanceRating: "Significant",
    },
    {
      personnelNumber: "74249",
      name: "Felicity Alice Carstens",
      position: "HC Business Partner",
      startDate: "2024-06-01 00:00:00",
      operations: "Human Capital McOpCo",
      manager: "Koena Cholo",
      employmentType: "Permanent",
      lt: "Gregory Solomon",
      exco: "Gregory Solomon",
      performanceRating: "Significant",
    },
    {
      personnelNumber: "61745",
      name: "Nadine Suttie",
      position: "Payroll Manager",
      startDate: "2016-07-19 00:00:00",
      operations: "Human Capital McOpCo",
      manager: "Elpelet Mashile",
      employmentType: "Permanent",
      lt: "Gregory Solomon",
      exco: "Gregory Solomon",
      performanceRating: "Significant",
    },
    {
      personnelNumber: "152",
      name: "Sibongile Tyiwa",
      position: "HC Manager",
      startDate: "1995-05-01 00:00:00",
      operations: "Human Capital McOpCo",
      manager: "Gregory Solomon",
      employmentType: "Permanent",
      lt: "Gregory Solomon",
      exco: "Gregory Solomon",
      performanceRating: "Significant",
    },
    {
      personnelNumber: "269",
      name: "Koena Cholo",
      position: "HC Manager",
      startDate: "2015-10-01 00:00:00",
      operations: "Human Capital McOpCo",
      manager: "Gregory Solomon",
      employmentType: "Permanent",
      lt: "Gregory Solomon",
      exco: "Gregory Solomon",
      performanceRating: "Significant",
    },
    {
      personnelNumber: "76763",
      name: "Thabo Dibakwane",
      position: "HC Manager",
      startDate: "2020-01-13 00:00:00",
      operations: "Human Capital McOpCo",
      manager: "Gregory Solomon",
      employmentType: "Senior Management",
      lt: "Gregory Solomon",
      exco: "Gregory Solomon",
      performanceRating: "Significant",
    },
    {
      personnelNumber: "77055",
      name: "Rudolph Esterhuizen",
      position: "Compliance Manager",
      startDate: "2020-01-27 00:00:00",
      operations: "Human Capital McOpCo",
      manager: "Gregory Solomon",
      employmentType: "Permanent",
      lt: "Gregory Solomon",
      exco: "Gregory Solomon",
      performanceRating: "Significant",
    },
    {
      personnelNumber: "176",
      name: "Lydia Ngobe",
      position: "Training Director",
      startDate: "2013-04-15 00:00:00",
      operations: "Human Capital McOpCo",
      manager: "Gregory Solomon",
      employmentType: "Permanent",
      lt: "Gregory Solomon",
      exco: "Gregory Solomon",
      performanceRating: "Significant",
    },
    {
      personnelNumber: "65620",
      name: "Elpelet Mashile",
      position: "Compensation & Benefits M",
      startDate: "2017-07-01 00:00:00",
      operations: "Human Capital McOpCo",
      manager: "Gregory Solomon",
      employmentType: "Permanent",
      lt: "Gregory Solomon",
      exco: "Gregory Solomon",
      performanceRating: "Significant",
    },
    {
      personnelNumber: "66201",
      name: "Nolwazi Gugulam Mbewu",
      position: "Head of Talent",
      startDate: "2017-08-01 00:00:00",
      operations: "Human Capital McOpCo",
      manager: "Gregory Solomon",
      employmentType: "Permanent",
      lt: "Gregory Solomon",
      exco: "Gregory Solomon",
      performanceRating: "Significant",
    },
    {
      personnelNumber: "78050",
      name: "Sekatane Prince Mphogo",
      position: "Head of Employee Relation",
      startDate: "2021-09-01 00:00:00",
      operations: "Human Capital McOpCo",
      manager: "Gregory Solomon",
      employmentType: "Permanent",
      lt: "Gregory Solomon",
      exco: "Gregory Solomon",
      performanceRating: "Significant",
    },
    {
      personnelNumber: "47109",
      name: "Mapaseka Priscilla Mathato",
      position: "Temp: Human Capital Busin",
      startDate: "2016-01-25 00:00:00",
      operations: "Human Capital McOpCo",
      manager: "Koena Cholo",
      employmentType: "Temps",
      lt: "Gregory Solomon",
      exco: "Gregory Solomon",
      performanceRating: "Significant",
    },
    {
      personnelNumber: "83453",
      name: "Gift Sehurutshe",
      position: "Temp: Workplace Ambassado",
      startDate: "2023-03-13 00:00:00",
      operations: "Human Capital McOpCo",
      manager: "Koena Cholo",
      employmentType: "Temps",
      lt: "Gregory Solomon",
      exco: "Gregory Solomon",
      performanceRating: "Significant",
    },
    {
      personnelNumber: "75551",
      name: "Sinalo Matsembe",
      position: "Intern: Human Capital",
      startDate: "2023-03-20 00:00:00",
      operations: "Human Capital McOpCo",
      manager: "Sekatane Prince Mphogo",
      employmentType: "Temps",
      lt: "Gregory Solomon",
      exco: "Gregory Solomon",
      performanceRating: "Significant",
    },
    {
      personnelNumber: "83867",
      name: "Ntando Yothasa Mdunge",
      position: "Temp: Workplace Ambassado",
      startDate: "2023-04-01 00:00:00",
      operations: "Human Capital McOpCo",
      manager: "Koena Cholo",
      employmentType: "Temps",
      lt: "Gregory Solomon",
      exco: "Gregory Solomon",
      performanceRating: "Significant",
    },
    {
      personnelNumber: "84593",
      name: "Thabani Paula Sibiya",
      position: "Temp: Workplace Ambassado",
      startDate: "2023-06-01 00:00:00",
      operations: "Human Capital McOpCo",
      manager: "Koena Cholo",
      employmentType: "Temps",
      lt: "Gregory Solomon",
      exco: "Gregory Solomon",
      performanceRating: "Significant",
    },
    {
      personnelNumber: "84523",
      name: "Nkululeko Ndlovu",
      position: "Temp: Workplace Ambassado",
      startDate: "2023-06-01 00:00:00",
      operations: "Human Capital McOpCo",
      manager: "Koena Cholo",
      employmentType: "Temps",
      lt: "Gregory Solomon",
      exco: "Gregory Solomon",
      performanceRating: "Significant",
    },
    {
      personnelNumber: "84711",
      name: "Shiara Maggie Hlongoane",
      position: "Temp: Workplace Ambassado",
      startDate: "2023-06-01 00:00:00",
      operations: "Human Capital McOpCo",
      manager: "Koena Cholo",
      employmentType: "Temps",
      lt: "Gregory Solomon",
      exco: "Gregory Solomon",
      performanceRating: "Significant",
    },
    {
      personnelNumber: "213",
      name: "Maria Nonyane",
      position: "Training Administrator",
      startDate: "2014-04-01 00:00:00",
      operations: "Human Capital McOpCo",
      manager: "Lydia Ngobe",
      employmentType: "Permanent",
      lt: "Lydia Ngobe",
      exco: "Gregory Solomon",
      performanceRating: "Significant",
    },
    {
      personnelNumber: "84741",
      name: "Bajabulile Innocentia Ndlovu",
      position: "Coordinator: Training HU",
      startDate: "2023-06-09 00:00:00",
      operations: "Human Capital McOpCo",
      manager: "Lydia Ngobe",
      employmentType: "Permanent",
      lt: "Lydia Ngobe",
      exco: "Gregory Solomon",
      performanceRating: "Significant",
    },
    {
      personnelNumber: "50",
      name: "Penelope Sizakele Mazibuko",
      position: "Senior Training Consultant",
      startDate: "1998-11-06 00:00:00",
      operations: "Human Capital McOpCo",
      manager: "Lydia Ngobe",
      employmentType: "Permanent",
      lt: "Lydia Ngobe",
      exco: "Gregory Solomon",
      performanceRating: "Significant",
    },
    {
      personnelNumber: "273",
      name: "Graham Adams",
      position: "Training Consultant",
      startDate: "1999-03-01 00:00:00",
      operations: "Human Capital McOpCo",
      manager: "Lydia Ngobe",
      employmentType: "Permanent",
      lt: "Lydia Ngobe",
      exco: "Gregory Solomon",
      performanceRating: "Some Improvement Required",
    },
    {
      personnelNumber: "1992",
      name: "Mamoshidi Edwin Phakoago",
      position: "Training Consultant",
      startDate: "2007-07-01 00:00:00",
      operations: "Human Capital McOpCo",
      manager: "Lydia Ngobe",
      employmentType: "Permanent",
      lt: "Lydia Ngobe",
      exco: "Gregory Solomon",
      performanceRating: "Significant",
    },
    {
      personnelNumber: "41049",
      name: "Rabelani Christopher Mukatuni",
      position: "Training Consultant",
      startDate: "2008-06-15 00:00:00",
      operations: "Human Capital McOpCo",
      manager: "Lydia Ngobe",
      employmentType: "Permanent",
      lt: "Lydia Ngobe",
      exco: "Gregory Solomon",
      performanceRating: "Significant",
    },
    {
      personnelNumber: "60376",
      name: "Sibusiso Walter Mzobe",
      position: "Training Consultant",
      startDate: "2016-04-01 00:00:00",
      operations: "Human Capital McOpCo",
      manager: "Lydia Ngobe",
      employmentType: "Permanent",
      lt: "Lydia Ngobe",
      exco: "Gregory Solomon",
      performanceRating: "Significant",
    },
    {
      personnelNumber: "77869",
      name: "Mathapelo Violet Mgodini",
      position: "Digital Skills Consultant",
      startDate: "2021-05-10 00:00:00",
      operations: "Human Capital McOpCo",
      manager: "Lydia Ngobe",
      employmentType: "Permanent",
      lt: "Lydia Ngobe",
      exco: "Gregory Solomon",
      performanceRating: "Significant",
    },
    {
      personnelNumber: "40024",
      name: "Pamela Mnyengeza",
      position: "Training Consultant",
      startDate: "2023-08-01 00:00:00",
      operations: "Human Capital McOpCo",
      manager: "Lydia Ngobe",
      employmentType: "Permanent",
      lt: "Lydia Ngobe",
      exco: "Gregory Solomon",
      performanceRating: "Significant",
    },
    {
      personnelNumber: "136",
      name: "Eva Mowa",
      position: "Learning & Development Fa",
      startDate: "2024-07-01 00:00:00",
      operations: "Human Capital McOpCo",
      manager: "Lydia Ngobe",
      employmentType: "Temps",
      lt: "Lydia Ngobe",
      exco: "Gregory Solomon",
      performanceRating: "Significant",
    },
  ];

  getManagers(): string[] {
    return [...new Set(this.employees.map(e => e.manager))];
  }

  getReportsForManager(manager: string): Employee[] {
    return this.employees.filter(e => e.manager === manager);
  }

  getFilteredReports(manager: string): Employee[] {
    return this.getReportsForManager(manager).filter(e =>
      e.name.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
      e.position.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
      e.performanceRating.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }

   // ✅ Get paginated reports for a manager
  getPaginatedReports(manager: string): Employee[] {
    const page = this.currentPage[manager] || 1;
    const startIndex = (page - 1) * this.pageSize;
    return this.getFilteredReports(manager).slice(
      startIndex,
      startIndex + this.pageSize
    );
  }

  // ✅ Change page for a specific manager
  changePage(manager: string, delta: number): void {
    const current = this.currentPage[manager] || 1;
    const next = current + delta;
    const max = Math.ceil(this.getFilteredReports(manager).length / this.pageSize);
    this.currentPage[manager] = Math.max(1, Math.min(next, max));
  }

  // ✅ Calculate last visible index
  endIndex(manager: string): number {
    const page = this.currentPage[manager] || 1;
    return page * this.pageSize;
  }


  goToDetails(id: string) {
    this.router.navigate(['/employees', id]);
  }
}
