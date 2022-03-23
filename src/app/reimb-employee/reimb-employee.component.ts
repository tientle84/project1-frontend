import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ReimbService } from '../services/reimb.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-reimb-employee',
  templateUrl: './reimb-employee.component.html',
  styleUrls: ['./reimb-employee.component.scss'],
})
export class ReimbEmployeeComponent implements OnInit {
  authenticated = false;

  displayedColumns: string[] = [
    'reimbursementSubmitted',
    'reimbursementTypeId',
    'reimbursementAmount',
    'reimbursementResolved',
    'reimbursementResolver',
    'reimbursementStatusId',
    'actions',
  ];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private reimbService: ReimbService,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    const userId = this.userService.getUser().userId;
    if (userId !== null) {
      this.getAllReimbsByUserId(userId);
    } else {
      console.log('Something went wrong.');
    }
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  getAllReimbsByUserId(id: number) {
    this.reimbService.getAllReimbsByUserId(id).subscribe({
      next: (res) => {
        console.log(res);
        this.dataSource = new MatTableDataSource(res);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}
