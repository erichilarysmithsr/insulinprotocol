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
var material_1 = require("@angular/material");
var dialog_component_1 = require("./dialog.component");
var DialogService = (function () {
    function DialogService(dialog) {
        this.dialog = dialog;
    }
    DialogService.prototype.show = function (title, text, actions, close) {
        var diag = this.dialog.open(dialog_component_1.DialogComponent);
        var disp = diag.componentInstance;
        disp.title = title;
        disp.text = text;
        disp.actions = actions;
        disp.close = close;
        return diag;
    };
    return DialogService;
}());
DialogService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [material_1.MdDialog])
], DialogService);
exports.DialogService = DialogService;
//# sourceMappingURL=dialog.service.js.map