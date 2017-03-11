import { Profile } from './profile';
var Patient = (function () {
    function Patient() {
        this.profile = new Profile();
        //add other optional properties diabetes type, etc
    }
    return Patient;
}());
export { Patient };
//# sourceMappingURL=patient.js.map