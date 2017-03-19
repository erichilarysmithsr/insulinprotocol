var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component } from '@angular/core';
import { Server } from './server.service';
import { DialogService } from './dialog.service';
import { AuthService } from './auth.service';
import { AppSettings } from './app-settings';
let ManageProtocolComponent = class ManageProtocolComponent {
    constructor(server, dialog, authService) {
        this.server = server;
        this.dialog = dialog;
        this.authService = authService;
        this.type = 'subcutaneous';
        this.config = {
            subcutaneous: AppSettings.subcutaneous,
            infusion: AppSettings.infusion
        };
    }
    ngOnInit() {
        this.getProtocol();
    }
    getProtocol() {
        delete this.protocol;
        this.server.getProtocol(this.type).subscribe((rs) => { this.protocol = rs; });
    }
    saveProtocol() {
        this.server.saveProtocol(this.protocol).subscribe(() => {
            let diag = this.dialog.show('Saved', 'The protocol has been successfully saved.', [], 'Close');
            diag.afterClosed().subscribe(() => { });
        });
    }
};
ManageProtocolComponent = __decorate([
    Component({
        moduleId: module.id,
        templateUrl: 'manage-protocol.component.html'
    }),
    __metadata("design:paramtypes", [Server, DialogService, AuthService])
], ManageProtocolComponent);
export { ManageProtocolComponent };
//# sourceMappingURL=manage-protocol.component.js.map