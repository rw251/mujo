/* jshint node: true */
"use strict";

/*
 * Cohort class that contains general cohort information
 * and cohort selection criteria
 */
module.exports = function Cohort(data) {
    // general cohort info
    // if data = 0 create a default cohort of all patients
    this.cohortname = (data !== 0) ? data.cohortname : "Default";
    this.desc = (data !==0) ? data.desc : "All patients";
    this.datecreated = (data !== 0) ? data.datecreated : new Date();
    this.bywho = (data !== 0) ? data.bywho : "Adminstrator";
    // checkboxes
    this.genderMale = true;
    this.genderFemale = true;
    // age min/max
    this.ageMin = 0;
    this.ageMax = 200;
    // weigh min/max
    this.weightMin = 0;
    this.weightMax = 500;
    // diagnosis id values, int, -1 all
    this.diagnosis = -1;
    this.dob = new Date("1900-01-01");
    this.occupation = -1;
    // separator
    this.sep = ',';

    // format the properties as appropriate
    this.getAjaxParams = function () {
        var gender = ((this.genderMale & this.genderFemale) ? '0,1' :
                (this.genderMale ? '1' : '0'));
        if (gender === "0,1"){
            gender = -1;
        }
        return {
            gender: gender,
            ageMin: this.ageMin,
            ageMax: this.ageMax,
            dob: this.dob,
            weightMin: this.weightMin,
            weightMax: this.weightMax,
            diagnosis: this.diagnosis === -1 ? -1: this.diagnosis.join(this.sep),
            occupation: this.occupation === -1 ? -1: this.occupation.join(this.sep)
        };
    };
};
