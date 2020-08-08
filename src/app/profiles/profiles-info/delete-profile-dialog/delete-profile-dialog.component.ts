import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

// model
import { Profile } from 'src/app/models/profile.model';

@Component({
  selector: 'app-delete-profile-dialog',
  templateUrl: './delete-profile-dialog.component.html',
  styleUrls: ['./delete-profile-dialog.component.css']
})
export class DeleteProfileDialogComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public profile: Profile) { }

  ngOnInit(): void { }

}
