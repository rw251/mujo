/* jshint node: true */
/* global Ext */
"use strict";

var $ = require('jquery'),
  main = require('scripts/main');

var App = {
  init: function init() {
    Ext.onReady(function() {
      main.init();
    });
  }
};

module.exports = App;
