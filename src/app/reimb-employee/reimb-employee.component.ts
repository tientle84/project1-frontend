import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ReimbService } from '../services/reimb.service';
import { UserService } from '../services/user.service';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { EmpDialogComponent } from '../emp-dialog/emp-dialog.component';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';
import {
  ConfirmDialogComponent,
  ConfirmDialogModel,
} from '../confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-reimb-employee',
  templateUrl: './reimb-employee.component.html',
  styleUrls: ['./reimb-employee.component.scss'],
})
export class ReimbEmployeeComponent implements OnInit {
  userId = this.userService.getUser().userId;
  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'top';

  displayedColumns: string[] = [
    'reimbursementSubmitted',
    'reimbursementAmount',
    'reimbursementResolved',
    'reimbursementType',
    'resolverFullName',
    'reimbursementStatus',
    'actions',
  ];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private reimbService: ReimbService,
    private userService: UserService,
    private dialog: MatDialog,
    public snackBar: MatSnackBar
  ) {}

  openSnackBar(message: string) {
    this.snackBar.open(message, '', {
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
      duration: 3000,
      panelClass: ['blue-snackbar'],
    });
  }

  ngOnInit(): void {
    if (this.userId !== null) {
      this.getAllReimbsByUserId(this.userId);
    } else {
      this.openSnackBar('Something went wrong.');
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
        this.dataSource.paginator.pageSize = 10;
        this.sort.sort({
          id: 'reimbursementStatus',
          start: 'desc',
          disableClear: true,
        });
        this.dataSource.sort = this.sort;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  openDialog() {
    this.dialog
      .open(EmpDialogComponent, {
        width: '50%',
      })
      .afterClosed()
      .subscribe((value) => {
        this.getAllReimbsByUserId(this.userId);
      });
  }

  editRequest(row: any) {
    this.dialog
      .open(EmpDialogComponent, {
        width: '50%',
        data: row,
      })
      .afterClosed()
      .subscribe((value) => {
        this.getAllReimbsByUserId(this.userId);
      });
  }

  deleteRequest(reimbId: number) {
    this.reimbService.deleteRequest(this.userId, reimbId).subscribe({
      next: (res) => {
        this.openSnackBar('Request deleted successfully.');
        this.getAllReimbsByUserId(this.userId);
      },
      error: (err) => {
        this.openSnackBar(err.error);
      },
    });
  }

  confirmDialog(reimbId: number) {
    const message = 'Are you sure you want to delete this request?';
    const dialogData = new ConfirmDialogModel('Confirm Delete', message);
    const dialogRef = this.dialog
      .open(ConfirmDialogComponent, {
        maxWidth: '400px',
        data: dialogData,
        disableClose: true,
      })
      .afterClosed()
      .subscribe((result) => {
        if (result === true) {
          this.deleteRequest(reimbId);
        }
      });
  }
}
