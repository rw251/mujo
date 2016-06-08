/* jshint node: true */
/* global Ext */
"use strict";

var local = require('scripts/local');
/*
 * Cohort "Define" button form.
 */

Ext.define('DiagnosisSelectorModel', {
  extend: 'Ext.data.Model',
  // MySQL:mujo.diagnosis table fields
  fields: [
    { name: 'id', type: "number" },
         'name'
     ]
});

Ext.define('OccupationsSelectorModel', {
  extend: 'Ext.data.Model',
  // MySQL:mujo.diagnosis table fields
  fields: [
    { name: 'id', type: "number" },
         'name'
     ]
});

var DiagnosisSelector = function() {

    var self = this;

    this.store = new Ext.data.Store({
      autoDestroy: true,
      model: 'DiagnosisSelectorModel',
      proxy: {
        type: 'ajax',
        url: 'diagnosis.php',
        reader: {
          type: 'json'
        }
      }
    });

    this.grid = Ext.create('Ext.grid.Panel', {
      xtype: 'sgrid',
      columnLines: true,
      loadMask: true,
      store: self.store,
      columns: [{
        header: 'Select All',
        dataIndex: 'name',
        flex: 1,
        width: 150,
          }],
      //selModel: Ext.create('Ext.selection.CheckboxModel', {})
      selType: 'checkboxmodel',
      selModel: {
        injectCheckbox: 0,
        pruneRemoved: false
      }
    });
  };

  var OccupationsSelector = function() {

    var self = this;

    this.store = new Ext.data.Store({
      autoDestroy: true,
      model: 'OccupationsSelectorModel',
      proxy: {
        type: 'ajax',
        url: 'occupations.php',
        reader: {
          type: 'json'
        }
      }
    });

    this.grid = Ext.create('Ext.grid.Panel', {
      xtype: 'sgrid',
      columnLines: true,
      loadMask: true,
      store: self.store,
      columns: [{
        header: 'Select All',
        dataIndex: 'name',
        flex: 1,
        width: 150,
          }],
      //selModel: Ext.create('Ext.selection.CheckboxModel', {})
      selType: 'checkboxmodel',
      selModel: {
        injectCheckbox: 0,
        pruneRemoved: false
      }
    });
  };


module.exports = {
  DefineTabs: function(cohort) {

    var self = this;
    this.cohort = cohort;
    this.id = cohort.cohortname.replace(/ /g, "-");

    this.diagnosisSelector = new DiagnosisSelector();
    self.diagnosisSelector.store.load();

    this.occupationsSelector = new OccupationsSelector();
    self.occupationsSelector.store.load();
    var i;
    this.tabs = Ext.create('Ext.tab.Panel', {
      activeTab: 0,
      items: [
        {
          title: 'Demographics',
          bodyPadding: 10,
          items: [
            {
              xtype: 'fieldset',
              title: 'Gender',
              //checkboxToggle: true,
              defaultType: 'checkbox',
              layout: 'hbox',
              //                        defaults: {
              //                            checked: true,
              //                            //anchor: '100%',
              //                            //hideEmptyLabel: false
              //                        },
              items: [
                {
                  boxLabel: 'Male',
                  checked: self.cohort.genderMale,
                  name: 'male',
                  flex: 1,
                  id: 'male-' + self.id
                            }, {
                  boxLabel: 'Female',
                  checked: self.cohort.genderFemale,
                  name: 'female',
                  flex: 2,
                  id: 'female-' + self.id
                            }]
                    }, {
              xtype: 'fieldset',
              title: 'Age',
              //bodyPadding: 5,
              //frame: true,
              //width: 340,
              defaultType: 'numberfield',
              fieldDefaults: {
                //labelWidth: 110,
                anchor: '100%'
              },
              items: [
                {
                  fieldLabel: 'Min',
                  value: self.cohort.ageMin,
                  step: 1,
                  minValue: 0,
                  maxValue: 200,
                  name: 'ageMin',
                  id: 'ageMin-' + self.id
                            }, {
                  fieldLabel: 'Max',
                  value: self.cohort.ageMax,
                  minValue: 0,
                  maxValue: 200,
                  name: 'ageMax',
                  id: 'ageMax-' + self.id
                            }
                        ]
                    }, {
              xtype: 'fieldset',
              title: 'Date of Birth',
              items: [
                {
                  xtype: 'datefield',
                  fieldLabel: 'After',
                  value: self.cohort.dob,
                  name: 'dob',
                  id: 'dob-' + self.id
                            }
                        ]
                    }, {
              xtype: 'fieldset',
              title: 'Weight',
              defaultType: 'numberfield',
              fieldDefaults: {
                anchor: '100%'
              },
              items: [
                {
                  fieldLabel: 'Min',
                  value: self.cohort.weightMin,
                  step: 1,
                  minValue: 0,
                  maxValue: 500,
                  name: 'weightMin',
                  id: 'weightMin-' + self.id
                            }, {
                  fieldLabel: 'Max',
                  value: self.cohort.weightMax,
                  minValue: 0,
                  maxValue: 500,
                  name: 'weightMax',
                  id: 'weightMax-' + self.id
                            }
                        ]
                    }
                ]
            }, {
          title: 'Diagnosis',
          scrollable: true,
          items: self.diagnosisSelector.grid,
          listeners: {
            afterrender: function(w, e) {
              if (self.cohort.diagnosis === -1) {
                self.diagnosisSelector.grid.getSelectionModel().selectAll();
              } else {
                var records = [];
                for (i = 0; i < self.cohort.diagnosis.length; i++) {
                  records[i] = self.diagnosisSelector.store.getById(self.cohort.diagnosis[i]);
                }
                self.diagnosisSelector.grid.getSelectionModel().select(records);
              }
            }
          }
            }, {
          title: 'Occupations',
          scrollable: true,
          items: self.occupationsSelector.grid,
          listeners: {
            afterrender: function(w, e) {
              if (self.cohort.occupation === -1) {
                self.occupationsSelector.grid.getSelectionModel().selectAll();
              } else {
                var records = [];
                for (i = 0; i < self.cohort.occupation.length; i++) {
                  records[i] = self.occupationsSelector.store.getById(self.cohort.occupation[i]);
                }
                self.occupationsSelector.grid.getSelectionModel().select(records);
              }
            }
          }
            }
        ],
      renderTo: Ext.getBody()
    });

    this.window = new Ext.window.Window({
      title: self.cohort.cohortname,
      height: 670,
      width: 350,
      layout: "fit",
      items: self.tabs,
      closable: true,
      modal: true,
      buttons: [
        {
          text: 'OK',
          handler: function(btn) {
            if (!Ext.getCmp('male-' + self.id).checked &&
              !Ext.getCmp('female-' + self.id).checked) {
              Ext.Msg.alert("Cohort Selection",
                "Please select at least one gender.");
              return;
            }
            var diags = [];
            var occupation = [];
            var selDiags = self.diagnosisSelector.grid.getSelection();
            var selOccupation = self.occupationsSelector.grid.getSelection();
            if (self.diagnosisSelector.grid.rendered) {
              if (selDiags.length < 1) {
                Ext.Msg.alert("Cohort Selection",
                  "Please select diagnoses from 'Diagnosis' tab.");
                return;
              }
              for (i = 0; i < selDiags.length; i++) {
                diags[i] = selDiags[i].data.id;
              }
            }
            if (self.occupationsSelector.grid.rendered) {
              if (selOccupation.length < 1) {
                Ext.Msg.alert("Occupation Selection",
                  "Please select occupations from 'Occupations' tab.");
                return;
              }
              for (i = 0; i < selOccupation.length; i++) {
                occupation[i] = selOccupation[i].data.id;
              }
            }
            if (diags.length > 0) {
              self.cohort.diagnosis = self.diagnosisSelector.store.getCount() === selDiags.length ? -1 : diags;
            }
            if (occupation.length > 0) {
              self.cohort.occupation = self.occupationsSelector.store.getCount() === selOccupation.length ? -1 : occupation;
            }
            self.cohort.genderMale = Ext.getCmp('male-' + self.id).checked;
            self.cohort.genderFemale = Ext.getCmp('female-' + self.id).checked;
            self.cohort.ageMin = Ext.getCmp('ageMin-' + self.id).value;
            self.cohort.ageMax = Ext.getCmp('ageMax-' + self.id).value;
            self.cohort.dob = Ext.getCmp('dob-' + self.id).value;
            self.cohort.weightMin = Ext.getCmp('weightMin-' + self.id).value;
            self.cohort.weightMax = Ext.getCmp('weightMax-' + self.id).value;
            local.cohorts[local.selectedCohort] = self.cohort;
            self.window.close();
            self.window.destroy();
          }
            }, {
          text: 'Cancel',
          handler: function(btn) {
            self.window.close();
          }
            }
        ]
    });
  },



};
