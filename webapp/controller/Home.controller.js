sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"pinaki/LandingPage/LandingPage/controller/Basecontroller",
	"pinaki/LandingPage/LandingPage/api/SearchFieldHandler"
], function (Controller,Basecontroller,SearchFieldHandler) {
	"use strict"; 
	var mainSearchHandler;

	return Basecontroller.extend("pinaki.LandingPage.LandingPage.controller.Home", {
		onInit  : function(){
			this.registerGlobalVariables()
		},
		onAfterRendering:function(){
			this.registerInitialSettings();
		},
		registerGlobalVariables : function(){
			mainSearchHandler = new SearchFieldHandler(this.getView().byId('mainSearchField'));
		},
		suggestSearchfield : function(oEvent){
			mainSearchHandler.suggestValues(oEvent.getParameter('newValue'));
		},
		search : function(oEvent){
			mainSearchHandler.search(oEvent.getParameter('query'));
		}

	});  
});