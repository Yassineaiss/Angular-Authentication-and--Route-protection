import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { catchError } from "rxjs/operators";
import { throwError } from "rxjs";
 export interface AuthResponseData {
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
  registered?: boolean;
}

@Injectable({ providedIn: "root" })
export class AuthService {
  constructor(private http: HttpClient) {}
  signup(email: string, password: string) {
    return this.http
      .post<AuthResponseData>(
        "https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=AIzaSyBFl_CobruT60XhVcp7Virs8oNnyhVJ0A8",
        {
          email: email,
          password: password,
          returnSecureToken: true,
        }
      )
      .pipe(catchError(errorRes => {
        let errorMessage = 'An unknown error occured!' ;
        if(!errorRes.error|| !errorRes.error.error){
          return throwError(errorMessage)
        }
        switch(errorRes.error.error.message){
          case 'EMAIL_EXISTS':
            errorMessage= 'this email exists already' ;
        }
        return throwError(errorMessage);
      }));
  }
  login(email:string, password:string){
     return this.http.post<AuthResponseData>(
      'https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=AIzaSyBFl_CobruT60XhVcp7Virs8oNnyhVJ0A8',

        {
          email: email,
          password: password,
          returnSecureToken: true,
        }

      )
  }
}
