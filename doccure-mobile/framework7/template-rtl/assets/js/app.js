/*
Template Name: Doccure - HTML Mobile Template
Author: Dreamguy's Technologies
Version: 1.1
*/


"use strict";
// Dom7

var $$ = Dom7;

// Framework7 App main instance
var app  = new Framework7({
	root: '#app', // App root element
	id: 'com.myapp.test',
	name: 'Framework7', // App name
	theme: 'ios', 
	// App root methods
	methods: {
		helloWorld: function () {
		app.dialog.alert('Hello World!');
		},
	},
	view: {
		iosDynamicNavbar: false,
		xhrCache: false,
	},
	photoBrowser: {
		type: 'popup',
	},
	popup: {
		closeByBackdropClick: false,
	},
	actions: {
		convertToPopover: false,
		grid: true,
	},
	// App routes
	routes: routes,
	popup: {
	   closeOnEscape: true,
	},
	sheet: {
	   closeOnEscape: true,
	},
	popover: {
	   closeOnEscape: true,
	},
	actions: {
	   closeOnEscape: true,
	},
});


// Init/Create main view
var mainView = app.views.create('.view-main', {
  url: '/'
});