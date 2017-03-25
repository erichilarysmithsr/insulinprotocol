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
const core_1 = require("@angular/core");
const server_service_1 = require("./server.service");
const auth_service_1 = require("./auth.service");
let ValidateProtocolComponent = class ValidateProtocolComponent {
    constructor(server, authService) {
        this.server = server;
        this.authService = authService;
        this.patient = { name: 'Pravin', id: 3, dob: new Date(), profile: { diabetes: 'Known Case', insulinDeliveryType: 'subcutaneous', preTransplantDose: 40, weight: 80 }, bednum: '123', uhid: '1234' };
        this.order = ['Before Breakfast', '10:00 AM', 'Before Lunch', 'Before Evening Snack', 'Before Dinner', 'Bedtime'];
        this.data = [];
        this.config = [{ k: 'dt', t: 'Date' }, { k: 'dosageType', t: 'Dosage Type' }, { k: 'plasmaGlucose', t: 'Plasma Glucose', type: 'number' }, { k: 'insulinDose', t: 'Insulin Dose', type: 'number' }];
        this.recommendation = {};
        for (var i = 0; i < this.order.length; i++)
            this.data.push({ dt: date.format(date.addDays(new Date(), -1), 'DD MMM YYYY'), dosageType: this.order[i], plasmaGlucose: 90 + Math.round(Math.random() * 100), insulinDose: 10 + Math.round(Math.random() * 10) });
        for (var i = 0; i < this.order.length; i++)
            this.data.push({ dt: date.format(new Date(), 'DD MMM YYYY'), dosageType: this.order[i] });
    }
    submit(page) {
        delete this.recommendation;
        let forms = [];
        for (var i = 0; i < this.data.length; i++) {
            let r = this.data[i];
            if (r.plasmaGlucose)
                forms.push({ type: 'subcutaneous', dt: r.dt, data: { plasmaGlucose: r.plasmaGlucose, dosageType: r.dosageType } });
            if (r.insulinDose)
                forms.push({ type: 'subcutaneousDose', dt: r.dt, data: { insulinDose: r.insulinDose, dosageType: r.dosageType } });
        }
        this.server.busy = this.server.validateProtocol(this.patient, forms).subscribe((rs) => { this.recommendation = rs; setImmediate(function () { page.scrollTop = page.scrollHeight; }); });
    }
};
ValidateProtocolComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
        templateUrl: 'validate-protocol.component.html'
    }),
    __metadata("design:paramtypes", [server_service_1.Server, auth_service_1.AuthService])
], ValidateProtocolComponent);
exports.ValidateProtocolComponent = ValidateProtocolComponent;
//# sourceMappingURL=validate-protocol.component.js.map