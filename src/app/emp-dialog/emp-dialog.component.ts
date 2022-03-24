import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ReimbService } from '../services/reimb.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-emp-dialog',
  templateUrl: './emp-dialog.component.html',
  styleUrls: ['./emp-dialog.component.scss'],
})
export class EmpDialogComponent implements OnInit {
  userId = this.userService.getUser().userId;
  reimbRequestForm!: FormGroup;
  actionBtn: string = 'Save';

  constructor(
    private formBuilder: FormBuilder,
    private reimbService: ReimbService,
    private userService: UserService,
    @Inject(MAT_DIALOG_DATA) public editData: any,
    private dialogRef: MatDialogRef<EmpDialogComponent>
  ) {}

  ngOnInit(): void {
    this.reimbRequestForm = this.formBuilder.group({
      reimbursementAmount: ['', [Validators.required]],
      reimbursementDescription: ['', [Validators.required]],
      reimbursementReceipt: ['', [Validators.required]],
      reimbursementTypeId: ['', [Validators.required]],
    });

    if (this.editData) {
      (this.actionBtn = 'Update'),
        this.reimbRequestForm.controls['reimbursementAmount'].setValue(
          this.editData.reimbursementAmount
        );
      this.reimbRequestForm.controls['reimbursementDescription'].setValue(
        this.editData.reimbursementDescription
      );
      this.reimbRequestForm.controls['reimbursementReceipt'].setValue(
        this.editData.reimbursementReceipt
      );
      this.reimbRequestForm.controls['reimbursementTypeId'].setValue(
        this.editData.reimbursementTypeId
      );
    }
  }

  addRequest() {
    if (!this.editData) {
      if (this.reimbRequestForm.valid) {
        this.reimbService
          .createRequest(this.userId, this.reimbRequestForm.value)
          .subscribe({
            next: (res) => {
              alert('Request added successfully.');
              this.reimbRequestForm.reset();
              this.dialogRef.close();
            },
            error: (err) => {
              alert('Could not add request. Error: ' + err.error);
            },
          });
      }
    } else {
      this.updateRequest();
    }
  }

  updateRequest() {
    this.reimbService
      .updateRequest(
        this.userId,
        this.editData.reimbursementId,
        this.reimbRequestForm.value
      )
      .subscribe({
        next: (res) => {
          alert('Client updated successfully.');
          this.reimbRequestForm.reset();
          this.dialogRef.close();
        },
        error: (err) => {
          alert(err.error);
        },
      });
  }
}
