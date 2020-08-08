import { Injectable } from '@angular/core';
import { MatSnackBar, MatSnackBarVerticalPosition, MatSnackBarHorizontalPosition } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class ErrorService {

  constructor(private snackbar: MatSnackBar) { }

  /**
   * Opens an "error" snackbar with a custom message and duration.
   * Note: CSS for this snackbar can be found under 'app.component.css'
   * @param message snackbar message to display
   * @param opts optional parameter including extra snackbar commands
   */
  openErrorSnackbar(message: string, opts: any = {}) {
    let action: string = 'Okay', 
      duration: number = null, 
      verticalPosition: MatSnackBarVerticalPosition = 'bottom', 
      horizontalPosition: MatSnackBarHorizontalPosition = 'center';
    if(opts.action) action = opts.action;
    if(opts.duration) duration = Math.min(Math.max(message.length*75, 3000), 7000);
    if(opts.verticalPosition) verticalPosition = opts.verticalPosition;
    if(opts.horizontalPosition) horizontalPosition = opts.horizontalPosition;

    this.snackbar.open(message, action, {
      panelClass: 'error-snackbar',
      duration: duration,
      verticalPosition: verticalPosition,
      horizontalPosition: horizontalPosition
    });
  }

  /**
   * Opens a "success" snackbar with a custom message and duration.
   * Note: CSS for this snackbar can be found under 'app.component.css'
   * @param message snackbar message to display
   * @param opts optional parameter including extra snackbar commands
   */
  openSuccessSnackbar(message: string, opts: any = {}) {
    let action: string = 'Okay', 
      duration: number = null, 
      verticalPosition: MatSnackBarVerticalPosition = 'bottom', 
      horizontalPosition: MatSnackBarHorizontalPosition = 'center';
    if(opts.action) action = opts.action;
    if(opts.duration) duration = Math.min(Math.max(message.length*75, 3000), 7000);
    if(opts.verticalPosition) verticalPosition = opts.verticalPosition;
    if(opts.horizontalPosition) horizontalPosition = opts.horizontalPosition;
    
    this.snackbar.open(message, action, {
      panelClass: 'success-snackbar',
      duration: duration,
      verticalPosition: verticalPosition,
      horizontalPosition: horizontalPosition
    });
  }


}
