import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';
import { User } from '../../model/user.model';
import { RegistrationRequestResponse } from '../../model/registrationRequestResponse.model';
import { AuthService } from 'src/app/service/auth.service';
import { UserRole } from 'src/app/model/userRole.model';

@Component({
  selector: 'app-registrationRequests',
  templateUrl: './registrationRequests.component.html',
  styleUrls: ['./registrationRequests.component.css']
})

export class RegistrationRequestsComponent {

    usersRequests: User[] = [];
    showRejectForm: boolean = false;
    rejectionReason: string = "";
    responseData: RegistrationRequestResponse | undefined;
    rejectingUser: User | null = null;

    constructor(private userService: UserService,
                private auth: AuthService, 
                private router: Router
    ) { }
  
    ngOnInit(): void {
        const userRoles = this.auth.getLoggedInUserRoles(); 
        console.log(userRoles);

        if (userRoles.length === 0) {
            this.router.navigate(['/']);
        } else if (!userRoles?.includes(UserRole.ADMINISTRATOR)) {
            this.router.navigate(['/homepage']);
        } else {
            this.loadUsersRequests();
        }
    }
  
    loadUsersRequests(): void {
      this.userService.getAllRegistrationRequests().subscribe(
        (usersRequests: User[]) => {
          this.usersRequests = usersRequests;
        },
        (error) => {
          console.error('Failed to load users:', error);
        }
      );
    }

    acceptRequest(user: User): void {
        this.responseData = { email: user.email, accepted: true, reason: '' };
        const resData = this.responseData;
        if (this.responseData) {
            console.log(this.responseData?.accepted);
            console.log(this.responseData?.reason);
            console.log(this.responseData?.email);
    
            this.responseData.accepted = true;
    
            this.processRegistrationRequest(resData);
        }
    }
  
    rejectRequest(user: User): void {
        this.showRejectForm = true;
        this.responseData = { email: user.email, accepted: false, reason: '' };
        this.rejectingUser = user;
    }

    submitRejection(): void {
        if (this.responseData) {
            console.log(this.responseData?.accepted);
            console.log(this.responseData?.reason);
            console.log(this.responseData?.email);
    
            this.userService.processRegistrationRequest(this.responseData).subscribe(
                (response) => {
                    this.loadUsersRequests();
                    this.showRejectForm = false; 
                    console.log(response);
                    this.rejectingUser = null;
                },
                (error) => {
                    console.error('Failed to reject user:', error);
                }
            );        
        }
    }

    processRegistrationRequest(resData: RegistrationRequestResponse) {
        if (this.responseData) {

            this.userService.processRegistrationRequest(resData).subscribe(
                (response) => {
                    this.loadUsersRequests();
                    this.showRejectForm = false; 
                    console.log(response);
                    this.rejectingUser = null;
                },
                (error) => {
                    console.error('Failed to process user registration request:', error);
                }
            );
        }
    }

}