import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ReimbService } from '../services/reimb.service';
import { UserService } from '../services/user.service';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { EmpDialogComponent } from '../emp-dialog/emp-dialog.component';
import { ReceiptDialogComponent } from '../receipt-dialog/receipt-dialog.component';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';
import { HttpResponse } from '@angular/common/http';

@Component({
  selector: 'app-reimb-manager',
  templateUrl: './reimb-manager.component.html',
  styleUrls: ['./reimb-manager.component.scss'],
})
export class ReimbManagerComponent implements OnInit {
  userId = this.userService.getUser().userId;
  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'top';

  displayedColumns: string[] = [
    'authorFullName',
    'reimbursementSubmitted',
    'reimbursementAmount',
    'reimbursementResolved',
    'reimbursementType',
    'resolverFullName',
    'reimbursementReceipt',
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
    public receiptDialog: MatDialog,
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
      this.getAllReimbursement();
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

  getAllReimbursement() {
    this.reimbService.getAllReimbursement().subscribe({
      next: (res) => {
        console.log(res);
        this.dataSource = new MatTableDataSource(res);
        this.dataSource.paginator = this.paginator;
        this.dataSource.paginator.pageSize = 10;
        this.dataSource.sort = this.sort;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  openReceiptDialog(url: string) {
    this.receiptDialog.open(ReceiptDialogComponent, {
      width: '50%',
      data: {
        url: url,
      },
    });
  }

  authorizedReimb(reimbId: number, statusId: number) {
    this.reimbService
      .authorizeReimbursement(reimbId, statusId)
      .subscribe((data) => {
        if (data === 1) {
          this.openSnackBar('The reimbursement has been updated successfully.');
          this.getAllReimbursement();
        } else {
          this.openSnackBar('Something went wrong.');
        }
      });
  }

  //   authorizedReimb(reimbId: number, statusId: number) {
  //     this.reimbService.authorizeReimbursement(reimbId, statusId).subscribe({
  //       next: (res) => {
  //         console.log(res);
  //         this.openSnackBar('The reimbursement has been updated successfully.');
  //         this.getAllReimbursement();
  //       },
  //       error: (err) => {
  //         this.openSnackBar(err.error);
  //       },
  //     });
  //   }
}
