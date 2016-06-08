/* jshint node: true */
/* global Ext */
"use strict";
/*
 * Defines and creates cohort selector window
 */
var Cohort = require('scripts/cohort'),
 local = require('scripts/local'),
 define = require('scripts/cohort_define_form');
Ext.define('CohortSelectorModel', {
    extend: 'Ext.data.Model',
    fields: [
        'cohortname',
        'briefdesc',
        'bywho',
        {name: 'datecreated', type: 'date', dateFormat: 'd/m/Y H:i:s'}
    ]
});

module.exports = function CohortSelector() {

    var self = this;
    Ext.require('CohortSelectorModel');

    this.store = Ext.create('Ext.data.Store', {
        model: 'CohortSelectorModel',
        autoLoad: true,
        proxy: {
            type: 'memory'
        },
        data: [{
                cohortname: 'Default',
                briefdesc: 'All patients',
                bywho: 'Administrator',
                datecreated: new Date()
            }],
        sorters: [{
                property: 'datecreated',
                direction: 'DESC'
            }]
    });

    var rowEditing = Ext.create('Ext.grid.plugin.RowEditing', {
        clicksToMoveEditor: 1,
        autoCancel: false,
        listeners: {
            canceledit: function (editor, e) {
                if (e.field === ""){
                    var sm = self.grid.getSelectionModel();
                    self.store.remove(sm.getSelection());
                    if (self.store.getCount() > 0) {
                        sm.select(0);
                    }
                }
            },
            validateedit: function (editor, e) {
                var newData = e.newValues;
                var oldData = e.record.data;
                console.log(newData);
                console.log(oldData);
                if (e.field !== "") { // modifying a row as opposed to adding a new one
                    if (local.cohorts[newData.cohortname] === undefined ||
                            newData.cohortname === oldData.cohortname) {
                        var cht = local.cohorts[local.selectedCohort];
                        delete local.cohorts[oldData.cohortname];
                        cht.cohortname = newData.cohortname;
                        cht.desc = newData.briefdesc;
                        cht.bywho = newData.bywho;
                        cht.datecreated = newData.datecreated;
                        local.cohorts[newData.cohortname] = cht;
                    } else {
                        rowEditing.startEdit(e.rowIdx, 0);
                        Ext.Msg.alert("Cohort name", "Please choose a unique cohort name.");
                        return false;
                    }
                } else { // adding new row
                    if (local.cohorts[newData.cohortname] === undefined) {
                        var newcht = new Cohort(0);
                        newcht.cohortname = newData.cohortname;
                        newcht.desc = newData.briefdesc;
                        newcht.bywho = newData.bywho;
                        newcht.datecreated = newData.datecreated;
                        local.cohorts[newData.cohortname] = newcht;
                    } else {
                        rowEditing.startEdit(e.rowIdx, 0);
                        Ext.Msg.alert("Cohort name", "Please choose a unique cohort name.");
                        return false;
                    }
                }
                local.selectedCohort = newData.cohortname;
                Ext.getCmp("selected-cohort-text").update(
                        "Selected cohort: " + local.selectedCohort);
                return true;
            }
        }
    });

    this.grid = Ext.create('Ext.grid.Panel', {
        store: self.store,
        renderTo: Ext.getBody(),
        layout: "fit",
        columns: [{
                header: 'Cohort Name',
                dataIndex: 'cohortname',
                width: 150,
                align: 'center',
                editor: {
                    allowBlank: false
                }
            }, {
                header: 'Brief Description',
                dataIndex: 'briefdesc',
                width: 150,
                align: 'center',
                editor: {
                    allowBlank: false
                }
            }, {
                xtype: 'datecolumn',
                header: 'Date Created',
                dataIndex: 'datecreated',
                format: 'd/m/Y H:i:s',
                width: 150,
                align: 'center',
                editable: false
            }, {
                header: 'Created By',
                dataIndex: 'bywho',
                width: 150,
                align: 'center',
                editor: {
                    allowBlank: false
                }
            }, {
                text: 'Define Cohort',
                width: 150,
                align: 'center',
                stopSelection: true,
                xtype: 'widgetcolumn',
                widget: {
                    xtype: 'button',
                    _btnText: "Define",
                    defaultBindProperty: null, //important
                    handler: function (widgetColumn) {
                        var record = widgetColumn.getWidgetRecord();
                        self.grid.getSelectionModel().select(record);
                        local.slectedCohort = record.data.cohortname;
                        var tabs = new define.DefineTabs(local.cohorts[local.selectedCohort]);
                        tabs.window.show();
                        local.cohorts[record.data.cohortname] = tabs.cohort;
                    },
                    listeners: {
                        beforerender: function (widgetColumn) {
                            widgetColumn.setText(widgetColumn._btnText);
                        }
                    }
                }
            }],
        tbar: [{
                text: 'Add Cohort',
                renderTo: Ext.getBody(),
                handler: function () {
                    if (rowEditing.editing) {
                        Ext.Msg.alert("Add cohort", "Please finish editing first by pressing 'Update'");
                        return;
                    }
                    var chtname = 'Name ' + local.chtCounter;
                    local.chtCounter += 1;
                    var r = Ext.create('CohortSelectorModel', {
                        cohortname: chtname,
                        briefdesc: 'Brief description',
                        datecreated: new Date(),
                        bywho: 'User'
                    });
                    self.store.sort('datecreated', 'DESC');
                    self.grid.getStore().insert(0, r);
                    rowEditing.startEdit(0, 0);
                }
            }, {
                itemId: 'removeCohort',
                text: 'Remove Cohort',
                handler: function () {
                    var sm = self.grid.getSelectionModel();
                    rowEditing.cancelEdit();
                    if (sm.getSelection()[0].data.cohortname === "Default") {
                        Ext.Msg.alert("Default Cohort", "You can't remove 'Default' cohort");
                        return;
                    }
                    delete local.cohorts[sm.getSelection()[0].data.cohortname];
                    self.store.remove(sm.getSelection());
                    if (self.store.getCount() > 0) {
                        sm.select(0);
                    }
                },
                disabled: true
            }],
        selType: 'checkboxmodel',
        selModel: {
            id: "cohort-selModel",
            injectCheckbox: 0,
            mode: "SINGLE",
            pruneRemoved: true
        },
        plugins: [rowEditing],
        listeners: {
            selectionchange: function (view, selected) {
                if (selected.length > 0) {
                    local.selectedCohort = selected[0].data.cohortname;
                    Ext.getCmp("selected-cohort-text").update(
                            "Selected cohort: " + local.selectedCohort);
                }
                self.grid.down('#removeCohort').setDisabled(!selected.length);
            }
        }
    });

    this.window = new Ext.window.Window({
        height: 300,
        width: 790,
        title: 'Select Cohort',
        layout: "fit",
        items: self.grid,
        closable: false,
        modal: true,
        resizeHandler: 'n',
        buttons: [
            {
                text: 'OK',
                handler: function (btn) {
                    var selCohort = self.grid.getSelection();
                    local.selectedCohort = selCohort[0].data.cohortname;
                    self.window.hide();
                    local.patient_info.changeCohort(local.cohorts[local.selectedCohort]);
                    local.count_info.changeCount("Diagnosis");
                }
            }
        ],
        listeners: {
            afterrender: function (p, e) {
                var rec = self.store.getAt(0);
                self.grid.getSelectionModel().select(rec);
            }
        }
    });
};
