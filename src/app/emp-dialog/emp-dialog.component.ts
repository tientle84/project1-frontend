import {
  Component,
  OnInit,
  Inject,
  ViewChild,
  ElementRef,
} from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ReimbService } from '../services/reimb.service';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { UserService } from '../services/user.service';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';
import { ReceiptDialogComponent } from '../receipt-dialog/receipt-dialog.component';

interface ReimbType {
  value: number;
  viewValue: string;
}

@Component({
  selector: 'app-emp-dialog',
  templateUrl: './emp-dialog.component.html',
  styleUrls: ['./emp-dialog.component.scss'],
})
export class EmpDialogComponent implements OnInit {
  @ViewChild('UploadFileInput') uploadFileInput: ElementRef;
  receiptUrl = '';
  fileAttr = '';

  userId = this.userService.getUser().userId;
  reimbRequestForm!: FormGroup;
  actionTitle: string = 'Add reimbursement request';
  actionBtn: string = 'Save';
  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'top';

  reimbTypes: ReimbType[] = [
    { value: 1, viewValue: 'Lodging' },
    { value: 2, viewValue: 'Travel' },
    { value: 3, viewValue: 'Food' },
    { value: 4, viewValue: 'Other' },
  ];

  constructor(
    private formBuilder: FormBuilder,
    private reimbService: ReimbService,
    private userService: UserService,
    @Inject(MAT_DIALOG_DATA) public editData: any,
    private dialogRef: MatDialogRef<EmpDialogComponent>,
    private snackBar: MatSnackBar,
    public receiptDialog: MatDialog
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
    this.reimbRequestForm = this.formBuilder.group({
      reimbursementAmount: ['', [Validators.required]],
      reimbursementDescription: ['', [Validators.required]],
      reimbursementReceipt: ['', [Validators.required]],
      //reimbursementReceiptImgUrl: [this.receiptUrl],
      reimbursementTypeId: ['', [Validators.required]],
    });

    if (this.editData) {
      this.actionTitle = 'Update reimbursement request';
      this.actionBtn = 'Update';
      this.receiptUrl = this.editData.reimbursementReceipt;

      this.reimbRequestForm.controls['reimbursementAmount'].setValue(
        this.editData.reimbursementAmount
      );
      this.reimbRequestForm.controls['reimbursementDescription'].setValue(
        this.editData.reimbursementDescription
      );
      this.reimbRequestForm.controls['reimbursementReceipt'].setValue('');
      this.reimbRequestForm.controls['reimbursementTypeId'].setValue(
        this.editData.reimbursementTypeId
      );
    }
  }

  addRequest() {
    if (!this.editData) {
      var formData: any = new FormData();
      formData.append(
        'reimbursementAmount',
        this.reimbRequestForm.get('reimbursementAmount')?.value
      );
      formData.append(
        'reimbursementDescription',
        this.reimbRequestForm.get('reimbursementDescription')?.value
      );
      formData.append(
        'reimbursementTypeId',
        this.reimbRequestForm.get('reimbursementTypeId')?.value
      );
      formData.append(
        'reimbursementReceipt',
        this.reimbRequestForm.get('reimbursementReceipt')?.value
      );

      //console.log(this.reimbRequestForm.value);
      // console.log(formData.entries());
      // for (var pair of formData.entries()) {
      //   console.log(pair[0] + ', ' + pair[1]);
      // }

      if (this.reimbRequestForm.valid) {
        this.reimbService.createRequest(this.userId, formData).subscribe({
          next: (res) => {
            this.openSnackBar('Request added successfully.');
            this.reimbRequestForm.reset();
            this.dialogRef.close();
          },
          error: (err) => {
            this.openSnackBar('Could not add request. Error: ' + err.error);
          },
        });
      } else {
        this.openSnackBar('Please enter all of the requirement fields.');
      }
    } else {
      this.updateRequest();
    }
  }

  updateRequest() {
    var formData: any = new FormData();
    formData.append(
      'reimbursementAmount',
      this.reimbRequestForm.get('reimbursementAmount')?.value
    );
    formData.append(
      'reimbursementDescription',
      this.reimbRequestForm.get('reimbursementDescription')?.value
    );
    formData.append(
      'reimbursementTypeId',
      this.reimbRequestForm.get('reimbursementTypeId')?.value
    );
    formData.append(
      'reimbursementReceipt',
      this.reimbRequestForm.get('reimbursementReceipt')?.value
    );

    //  console.log(formData.entries());
    //  for (var pair of formData.entries()) {
    //    console.log(pair[0] + ', ' + pair[1]);
    //  }

    this.reimbService
      .updateRequest(this.userId, this.editData.reimbursementId, formData)
      .subscribe({
        next: (res) => {
          this.openSnackBar('Request updated successfully.');
          this.reimbRequestForm.reset();
          this.dialogRef.close();
        },
        error: (err) => {
          alert(err.error);
        },
      });
  }

  uploadFileEvt(fileInput: any) {
    if (fileInput.target.files && fileInput.target.files[0]) {
      this.fileAttr = '';

      const file = fileInput.target.files[0];
      this.reimbRequestForm.get('reimbursementReceipt')?.setValue(file);

      Array.from(fileInput.target.files).forEach((file: any) => {
        console.log(file);
        this.fileAttr += file.name + ',';
      });

      const reader = new FileReader();
      reader.onload = (e: any) => {
        const image = new Image();
        image.src = e.target.result;
        image.onload = (rs) => {
          // Return Base64 Data URL
          const imgBase64Path = e.target.result;
        };
      };
      reader.readAsDataURL(fileInput.target.files[0]);

      // Reset File Input to Selct Same file again
      this.uploadFileInput.nativeElement.value = '';
    } else {
      this.fileAttr = 'Select File';
    }
  }

  openReceiptDialog() {
    this.receiptDialog.open(ReceiptDialogComponent, {
      width: '50%',
      data: {
        url: this.receiptUrl,
      },
    });
  }
}
