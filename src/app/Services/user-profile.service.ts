import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { RootResponse } from '../models/root-response';
import { IUserProfile } from '../models/profile';


@Injectable({
  providedIn: 'root'
})
export class UserProfileService {
  constructor(private http: HttpClient) {}

  getAllUser(): Observable<RootResponse<IUserProfile[]>> {
    var reqHeader = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    return this.http.get<RootResponse<IUserProfile[]>>(`${environment.rootUrl}/api/User/GetAllUserDetails`, { headers: reqHeader });
  }

  saveUserProfile(profile:IUserProfile): Observable<RootResponse<IUserProfile>> {        
    var reqHeader = new HttpHeaders({ 
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*'
   });                             
   
   console.log(profile);
    return this.http.post<RootResponse<IUserProfile>>(`${environment.rootUrl}/api/User/InsertUpdateUser`, profile, { headers: reqHeader });
  }

  deleteUserProfile(serial: any): Observable<RootResponse<IUserProfile>> {
    let HttpParam=new HttpParams().set('serial',serial.toString());
    var reqHeader = new HttpHeaders({ 
      'Content-Type': 'application/json' 
    });

    return this.http.post<RootResponse<IUserProfile>>(`${environment.rootUrl}/api/User/DeleteUser`, { }, { headers: reqHeader ,params:HttpParam });
  }


    // Get user details by UserId
  getUserDetails(userId: string): Observable<RootResponse<IUserProfile>> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const params = new HttpParams().set('UserId', userId);

    return this.http.get<RootResponse<IUserProfile>>(`${environment.rootUrl}/api/User/GetUserDetails`, { headers, params });
  }

}
  