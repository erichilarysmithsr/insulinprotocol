"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var profile_1 = require("./profile");
var Patient = (function () {
    function Patient() {
        this.profile = new profile_1.Profile();
        //add other optional properties diabetes type, etc
    }
    return Patient;
}());
exports.Patient = Patient;
//# sourceMappingURL=patient.js.map