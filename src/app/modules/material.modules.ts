import { NgModule } from "@angular/core";
// import { MatToolbarModule } from "@angular/material/toolbar";
import { MatCardModule } from "@angular/material/card";
import { MatProgressBarModule } from "@angular/material/progress-bar";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";

@NgModule({
    imports: [
        MatCardModule,
        MatProgressBarModule,
        MatProgressSpinnerModule,
    ],
    exports: [
        MatCardModule,
        MatProgressBarModule,
        MatProgressSpinnerModule,
    ]
})

export class MaterialModule { }