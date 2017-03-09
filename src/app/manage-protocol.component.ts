import { Component,OnInit } from '@angular/core';

import { Protocol } from './protocol';
import { Server } from './server.service';
import { DialogService } from './dialog.service';

@Component({
	moduleId:module.id,
	templateUrl:'manage-protocol.component.html'
})export class ManageProtocolComponent implements OnInit{
	type: string = 'subcutaneous'
	protocol: Protocol
	constructor(private server: Server,private dialog: DialogService){}
	private config = {
		subcutaneous:[{k:'t',t:'Sampling Time'},{k:'ins',t:'Insulin Type'},{k:'col1',t:'Column 1',type:'number'},{k:'col2',t:'Column 2',type:'number'},{k:'col3',t:'Column 3',type:'number'},{k:'col4',t:'Column 4',type:'number'},{k:'col5',t:'Column 5',type:'number'},{k:'col6',t:'Column 6',type:'number'},{k:'col7',t:'Column 7',type:'number'},{k:'col8',t:'Column 8',type:'number'}]
	}
	ngOnInit(): void{
		this.getProtocol();
	}
	getProtocol(): void{
		delete this.protocol;
		this.server.getProtocol(this.type).subscribe((rs)=>{this.protocol=rs;});
	}
	saveProtocol(): void{
		this.server.saveProtocol(this.protocol).subscribe(()=>{
			let diag=this.dialog.show('Saved','The protocol has been successfully saved.',[],'Close');
			diag.afterClosed().subscribe(()=>{});
		});	
	}
}