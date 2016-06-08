/* jshint node: true */
/* global Ext */
"use strict";
/*
 * Class for viewing data from MySQL::mujo.patient_info
 */

var local = require('scripts/local');

Ext.define('CountModel', {
    extend: 'Ext.data.Model',
    // some fields from MySQL::Mujo.patient_info table
    fields: [
        'name',
        {name: 'count', type: "number"}
    ]
});

module.exports = function CountInfo() {
    var self = this;
    this.pars = local.cohorts[local.selectedCohort].getAjaxParams();
    this.pars.count = "Diagnosis";

    this.store = Ext.create('Ext.data.Store', {
        autoDestroy: true,
        model: 'CountModel',
        proxy: {
            type: 'ajax',
            url: 'counts.php',
            extraParams: self.pars,
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
        id: "counts-grid",
        store: self.store,
        columns: [
            {
                header: 'Description',
                dataIndex: 'name',
                flex: 1,
                editor: {
                    allowBlank: false
                }
            }, {
                header: 'Count',
                dataIndex: 'count',
                xtype: 'numbercolumn',
                format: '0',
                width: 160,
                editor: {
                    allowBlank: false
                }
            }],
        tbar: [
            {
                text: self.pars.count,
                id: "count-sel-menu",
                renderTo: Ext.getBody(),
                menu: {
                    defaults:{
                        handler: function(){
                            self.changeCount(this.text);
                        }
                    },
                    items: [
                        {
                            text: "Diagnosis",
                        }, {
                            text: "Occupation"
                        }, {
                            text: "Gender"
                        }
                    ]
                }
            }
        ]
    });

    this.changeCount = function (count) {
        Ext.getCmp("count-sel-menu").setText(count);
        var pars = local.cohorts[local.selectedCohort].getAjaxParams();
        pars.count = count;
        self.store.proxy.extraParams = pars;
        self.store.load();
    };
};
