import { Component } from '@angular/core';
import { MdDialog, MdDialogRef } from '@angular/material';

export class DialogComponent{
	constructor(private dialog: MdDialog){}
	show(title: string,text: string,actions: string[],close: string): MdDialogRef<DialogDisplay>{
		let diag=this.dialog.open(DialogDisplay);
		let disp=diag.componentInstance;
		disp.title=title;disp.text=text;disp.actions=actions;disp.close=close;
		return diag;
	}	
}

@Component({
	moduleId:module.id,
	template:`
		<h2 md-dialog-title >{{title}}</h2>
		<md-dialog-content>{{text}}</md-dialog-content>
		<md-dialog-actions style="text-align:center;">
			<button md-button md-dialog-close *ngIf="close">{{close}}</button>
		</md-dialog-actions>	
		`
}) export class DialogDisplay{
	title: string
	text: string
	actions: string[]
	close: string	
}