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
var ManageProtocolComponent = (function () {
    function ManageProtocolComponent(server, dialog) {
        this.server = server;
        this.dialog = dialog;
        this.type = 'subcutaneous';
        this.config = {
            subcutaneous: [{ k: 't', t: 'Sampling Time' }, { k: 'ins', t: 'Insulin Type' }, { k: 'col1', t: 'Column 1', type: 'number' }, { k: 'col2', t: 'Column 2', type: 'number' }, { k: 'col3', t: 'Column 3', type: 'number' }, { k: 'col4', t: 'Column 4', type: 'number' }, { k: 'col5', t: 'Column 5', type: 'number' }, { k: 'col6', t: 'Column 6', type: 'number' }, { k: 'col7', t: 'Column 7', type: 'number' }, { k: 'col8', t: 'Column 8', type: 'number' }]
        };
    }
    ManageProtocolComponent.prototype.ngOnInit = function () {
        this.getProtocol();
    };
    ManageProtocolComponent.prototype.getProtocol = function () {
        var _this = this;
        delete this.protocol;
        this.server.getProtocol(this.type).subscribe(function (rs) { _this.protocol = rs; });
    };
    ManageProtocolComponent.prototype.saveProtocol = function () {
        var _this = this;
        this.server.saveProtocol(this.protocol).subscribe(function () {
            var diag = _this.dialog.show('Saved', 'The protocol has been successfully saved.', [], 'Close');
            diag.afterClosed().subscribe(function () { });
        });
    };
    return ManageProtocolComponent;
}());
ManageProtocolComponent = __decorate([
    Component({
        moduleId: module.id,
        templateUrl: 'manage-protocol.component.html'
    }),
    __metadata("design:paramtypes", [Server, DialogService])
], ManageProtocolComponent);
export { ManageProtocolComponent };
//# sourceMappingURL=manage-protocol.component.js.map