"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var server_service_1 = require("./server.service");
var dialog_service_1 = require("./dialog.service");
var app_settings_1 = require("./app-settings");
var ManageProtocolComponent = (function () {
    function ManageProtocolComponent(server, dialog) {
        this.server = server;
        this.dialog = dialog;
        this.type = 'subcutaneous';
        this.config = {
            subcutaneous: app_settings_1.AppSettings.subcutaneous,
            infusion: app_settings_1.AppSettings.infusion
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
    core_1.Component({
        moduleId: module.id,
        templateUrl: 'manage-protocol.component.html'
    }),
    __metadata("design:paramtypes", [server_service_1.Server, dialog_service_1.DialogService])
], ManageProtocolComponent);
exports.ManageProtocolComponent = ManageProtocolComponent;
//# sourceMappingURL=manage-protocol.component.js.map