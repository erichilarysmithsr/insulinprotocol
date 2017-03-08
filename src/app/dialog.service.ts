import { Injectable } from '@angular/core';
import { MdDialog, MdDialogRef } from '@angular/material';

import { DialogComponent } from './dialog.component';
@Injectable()
export class DialogService{
	constructor(private dialog: MdDialog){}
	show(title: string,text: string,actions: string[],close: string): MdDialogRef<DialogComponent>{
		let diag=this.dialog.open(DialogComponent);
		let disp=diag.componentInstance;
		disp.title=title;disp.text=text;disp.actions=actions;disp.close=close;
		return diag;
	}	
}