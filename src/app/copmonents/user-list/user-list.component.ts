import {AfterViewInit, Component, ViewChild} from '@angular/core';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import {MatButtonModule} from '@angular/material/button';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatDialog, MatDialogModule} from '@angular/material/dialog';
import { UserFormComponent } from '../user-form/user-form.component';
import { IUserProfile } from 'src/app/models/profile';
import { UserProfileService } from 'src/app/Services/user-profile.service';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBar } from '@angular/material/snack-bar';
// import { MatSnackBarModule } from '@angular/material/snack-bar';


@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css'],
  standalone: true,
  imports: [
    MatTableModule, 
    MatPaginatorModule, 
    MatButtonModule,
    MatToolbarModule,
    MatDialogModule,
    UserFormComponent,
    MatIconModule
  ],
})
export class UserListComponent implements AfterViewInit {
  
  displayedColumns: string[] = [
    'serial',
    'user_id', 
    'full_name', 
    'mobile_number', 
    'present_address', 
    'permanent_address',
    'action'
  ];
  dataSource = new MatTableDataSource<IUserProfile>();
  //dataSource: IUserProfile[] = [];
  // const ELEMENT_DATA: IUserProfile[] = [];
  userList: IUserProfile[] = [];
  // userProfile: IUserProfile [] = [];
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  constructor(
    private _dialog: MatDialog,
    private profileservice: UserProfileService,
    private snackBar: MatSnackBar
  ) {}

  openAddEditUserForm() {

    const dialogRef = this._dialog.open(UserFormComponent,{
      height:'700px',
      width:'500px'
    });
    dialogRef.afterClosed().subscribe({
      next: (val) => {
        if (val) {
          this.getUserList();
        }
      },
    });
  }
  ngOnInit(): void {
    this.getUserList();
  }



  getUserList(): void {
    this.profileservice.getAllUser().subscribe({
      next: (Response) => {
        if (Response && Response.status === 'OK') {

          this.dataSource.data = Response.result as IUserProfile[];  
          console.log("Data source:", this.dataSource.data);
          this.dataSource.paginator = this.paginator; 
        } else {
          console.error('Failed to load user data:', Response.message);
        }
      },
      error: (err) => {
        console.error('Error fetching user list:', err);
      }
    });
  }
  



  openEditForm(element?: IUserProfile): void {
    debugger;
    const dialogRef = this._dialog.open(UserFormComponent, {
      height:'700px',
      width: '500px',
      data: element ? { element } : {},
    });
  
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.getUserList();  
      }
    });
  }
  

  
    // Delete user profile
    
    deleteUser(serial: string): void {
      if (confirm('Are you sure you want to delete this user?')) {
        this.profileservice.deleteUserProfile(serial).subscribe({
          next: (Response) => {
            if (Response.status === 'OK') {
              this.getUserList();
              this.snackBar.open('User deleted successfully!', 'Close', {
                duration: 3000, // Show alert for 3 seconds
              }); 
            } else {
              console.error('Failed to delete user', Response.message);
            }
          },
          error: (err) => {
            console.error('Error deleting user', err);
          }
        });
      }
    }
  
}



  
