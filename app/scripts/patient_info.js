/* jshint node: true */
/* global Ext */
"use strict";
/*
 * Class for viewing data from MySQL::mujo.patient_info
 */
var local = require("scripts/local");

Ext.define('PatientInfoModel', {
    extend: 'Ext.data.Model',
    // some fields from MySQL::Mujo.patient_info table
    fields: [
        {name: 'userId', type: "number"},
        {name: 'gender', type: "number"},
        {name: 'dateOfBirth', type: "date"},
        'diagnosis'
    ]
});

module.exports = function PatientInfo() {

    var self = this;

    this.store = Ext.create('Ext.data.Store', {
        autoDestroy: true,
        model: 'PatientInfoModel',
        proxy: {
            type: 'ajax',
            url: 'patient_info.php',
            extraParams: local.cohorts[local.selectedCohort].getAjaxParams(),
            reader: {
                type: 'json'
            }
        },
        sorters: [{
            property: 'userId',
            direction: 'ASC'
        }]
    });

    this.grid = Ext.create('Ext.grid.Panel', {
        id: "patient-info-grid",
        store: self.store,
        columns: [{
            xtype: 'numbercolumn',
            format: '0',
            header: 'Patient ID',
            dataIndex: 'userId',
            flex: 1,
            width: 50,
            editor: {
                allowBlank: false
            }
        }, {
            header: 'Gender',
            dataIndex: 'gender',
            width: 100,
            editor: {
                allowBlank: false
            }
        }, {
            xtype: 'datecolumn',
            header: 'Date of Birth',
            dataIndex: 'dateOfBirth',
            width: 135,
            editor: {
                xtype: 'datefield',
                allowBlank: false,
                format: 'd/m/Y',
                minValue: '01/01/1900',
                minText: 'Cannot be so old?!',
                maxValue: Ext.Date.format(new Date(), 'd/m/Y')
            }
        }]
    });

    this.changeCohort = function (cohort) {
	self.store.proxy.extraParams = cohort.getAjaxParams();
        self.store.load();
    };
};
