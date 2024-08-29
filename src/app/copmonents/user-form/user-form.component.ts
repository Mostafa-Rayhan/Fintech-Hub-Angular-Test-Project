import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { UserProfileService } from 'src/app/Services/user-profile.service';
import { IUserProfile } from 'src/app/models/profile';
import { MatSnackBar } from '@angular/material/snack-bar';
// import { MatSnackBarModule } from '@angular/material/snack-bar';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.css'],
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatDialogModule,
    MatButtonModule,
  ],
  standalone: true,
})
export class UserFormComponent implements OnInit {
  userForm!: FormGroup;
  isEditMode: boolean = false;
  userList: IUserProfile[] = [];
  profileReq: IUserProfile = {};

  constructor(
    private _fb: FormBuilder,
    private profileservice: UserProfileService,
    private dialogRef: MatDialogRef<UserFormComponent>,
    private snackBar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) public data: any
  ){}




  ngOnInit(): void {
    
    this.userForm = this._fb.group({
      userId: new FormControl('', Validators.required),
      fullName: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required, Validators.email]),
      mobileNo: new FormControl('', Validators.required),
      presentAddress: new FormControl('', Validators.required),
      permanentAddress: new FormControl('', Validators.required),
    });

    
    if (this.data && this.data.element) {
      this.isEditMode = true;
      this.populateForm(this.data.element);
      console.log(this.data.element); 
    }
  }

  
  populateForm(element: IUserProfile) {
    this.userForm.patchValue({
      userId: element.user_id,
      fullName: element.full_name,
      email: element.email,
      mobileNo: element.mobile_number,
      presentAddress: element.present_address,
      permanentAddress: element.permanent_address,
    });
  }



  onFormSubmit() {
    if (this.userForm.valid) {
      const updatedProfile: IUserProfile = {
        user_id: this.userForm.controls["userId"].value,
        full_name: this.userForm.controls["fullName"].value,
        email: this.userForm.controls["email"].value,
        mobile_number: this.userForm.controls["mobileNo"].value,
        present_address: this.userForm.controls["presentAddress"].value,
        permanent_address: this.userForm.controls["permanentAddress"].value,
      };

      this.profileservice.saveUserProfile(updatedProfile).subscribe((Response) => {
        if (Response.status === 'OK') {
          this.dialogRef.close(true);
          this.snackBar.open(this.isEditMode ? 'User updated successfully!' : 'User added successfully!', 'Close', {
            duration: 3000, // Duration for the snackbar
          });
        } else {
          console.error('Error saving profile:', Response.message);
        }
      });
    }
  }


  getAllUser() {
    console.log("getAllUser");
    this.profileservice.getAllUser().subscribe((Response) => {
      console.log(Response, Response.status);
      if (Response.status == 'OK') {
        this.userList! = Response.result as IUserProfile[];
      } else {

      }
    });
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}
