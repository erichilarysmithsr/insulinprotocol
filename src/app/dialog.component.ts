import { Component } from '@angular/core';

@Component({
	moduleId:module.id,
	template:`
		<h2 md-dialog-title >{{title}}</h2>
		<md-dialog-content>{{text}}</md-dialog-content>
		<md-dialog-actions style="text-align:center;">
			<button md-button md-dialog-close *ngIf="close">{{close}}</button>
		</md-dialog-actions>	
		`
}) export class DialogComponent{
	title: string
	text: string
	actions: string[]
	close: string	
}