/* jshint node: true */
/* global Ext */
"use strict";

var Cohort = require('scripts/cohort'),
  CohortSelector = require('scripts/cohort_selector'),
  PatientInfo = require('scripts/patient_info'),
  CountInfo = require('scripts/cohort_details_counts'),
  local = require('scripts/local');

Ext.require([
    'Ext.grid.*',
    'Ext.data.*',
    'Ext.panel.*',
    'Ext.tab.Panel',
    'Ext.form.FieldSet',
    'Ext.layout.container.Border',
    'Ext.layout.container.Accordion'
]);

// global cohort variables
// cohort names must be unique
local.cohorts = []; //indexed by name of cohort
local.chtCounter = 1;
local.selectedCohort = "Default"; // default cohort name (all patients)
// global variables
local.patient_info = null;
local.cohort_selector = null;
local.count_info = null;

var m = {
  init: function() {

    var cohort = new Cohort(0);
    local.cohorts[local.selectedCohort] = cohort;
    local.cohort_selector = new CohortSelector();
    local.patient_info = new PatientInfo();
    local.count_info = new CountInfo();


    var COHORT_button = Ext.create('Ext.Button', {
      text: "COHORT",
      renderTo: Ext.getBody(),
      frame: true,
      handler: function() {
        local.cohort_selector.window.show();
      }
    });

    new Ext.window.Window({
      height: Ext.getBody().getViewSize().height,
      width: Ext.getBody().getViewSize().width,
      title: 'Mujo Portal',
      layout: 'border',
      closable: false,
      draggable: false,
      items: [
        {
          region: "west",
          title: 'Cohort Details',
          xtype: 'panel',
          margins: '50 50 50 50',
          split: false,
          width: 350,
          collapsed: true,
          collapsible: true,
          id: 'west-region-container',
          layout: 'accordion',
          items: [
            {
              title: "Patient Information",
              scrollable: true,
              items: local.patient_info.grid
                    }, {
              title: "Counts",
              scrollable: true,
              items: local.count_info.grid
                    }
                ]
            }, {
          region: "center",
          id: "center-region-container",
          title: "Analytics",
          xtype: "panel",
          html: "Analytics here",
          scrollable: true,
          tbar: [
            {
              text: "Compliance",
              handler: function() {
                Ext.getCmp("center-region-container").update("<center>Updating</center>");
                Ext.getCmp("center-region-container").mask("Building Compliance Report...");
                Ext.Ajax.request({
                  url: "cohort_summary.php",
                  params: local.cohorts[local.selectedCohort].getAjaxParams(),
                  method: "GET",
                  success: function(response, opts) {
                    Ext.getCmp("center-region-container").
                    update(response.responseText);
                    Ext.getCmp("center-region-container").unmask();
                  },
                  failure: function(response, opts) {
                    console.log('server-side failure with status code ' + response.status);
                  }
                });
              }
                    }
                ]

            }, {
          region: "south",
          xtype: 'panel',
          collapsible: false,
          split: false,
          layout: 'fit',
          id: "selected-cohort-text",
          html: "Selected cohort: " + local.selectedCohort
            }
        ],
      tbar: {
        items: [COHORT_button]
      }

    }).show();

    local.patient_info.store.load();
    local.count_info.store.load();
    local.cohort_selector.store.load();
  }

};
module.exports = m;
