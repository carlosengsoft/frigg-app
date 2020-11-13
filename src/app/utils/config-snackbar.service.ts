import { SnackbarComponent } from './../material-components/snackbar/snackbar.component';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})

export class ConfigSnackbar {

    dataSnackbar: {
        message?: string; action?: string; color?: string;
        status?: string; icon?: string;
    }

    constructor(private snackbar: MatSnackBar) { }

    configSnackbar(data: any) {
        const config = new MatSnackBarConfig();

        config.horizontalPosition = 'end';
        config.verticalPosition = 'top';
        config.duration = 3000;
        config.data = data;


        switch (data.status) {
            case 'success':
                config.panelClass = ['snackbar-state-success'];
                break;

            case 'info':
                config.panelClass = ['snackbar-state-info'];
                break;

            case 'failed':
                config.panelClass = ['snackbar-state-failed'];
                break;
        }
        return config;
    }

    constructSnackbar(message?: string, status?: string, color?: string, icon?: string, action?: string) {
        this.dataSnackbar = new Object();

        this.dataSnackbar.message = message;
        this.dataSnackbar.status = status;
        this.dataSnackbar.color = color;
        this.dataSnackbar.icon = icon;
        this.dataSnackbar.action = action;

        this.snackbar.openFromComponent(SnackbarComponent, this.configSnackbar(this.dataSnackbar));
    }
}