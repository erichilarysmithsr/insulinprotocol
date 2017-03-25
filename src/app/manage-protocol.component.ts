import { Component,OnInit } from '@angular/core';

import { Protocol } from './protocol';
import { Server } from './server.service';
import { DialogService } from './dialog.service';
import { AuthService } from './auth.service';

import { AppSettings } from './app-settings';

@Component({
	moduleId:module.id,
	templateUrl:'manage-protocol.component.html'
})export class ManageProtocolComponent implements OnInit{
	type: string = 'infusion'
	protocol: Protocol
	constructor(private server: Server,private dialog: DialogService,public authService: AuthService){}
	private config = {
		subcutaneous : AppSettings.subcutaneous,
		infusion : AppSettings.infusion
	}
	ngOnInit(): void{
		this.getProtocol();
	}
	getProtocol(): void{
		delete this.protocol;
		this.server.busy=this.server.getProtocol(this.type).subscribe((rs)=>{this.protocol=rs;});
	}
	saveProtocol(): void{
		this.server.busy=this.server.saveProtocol(this.protocol).subscribe(()=>{
			let diag=this.dialog.show('Saved','The protocol has been successfully saved.',[],'Close');
			diag.afterClosed().subscribe(()=>{});
		});	
	}
}