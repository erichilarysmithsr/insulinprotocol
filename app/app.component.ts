import { Component } from '@angular/core';

@Component({
  selector: 'my-app',
  template: `
  	<div class="mainwindow">  		
		<router-outlet></router-outlet>
  	<div>	
  `
})
export class AppComponent  { name = 'Angular'; }
