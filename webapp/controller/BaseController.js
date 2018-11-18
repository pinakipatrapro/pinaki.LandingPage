sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"pinaki/LandingPage/LandingPage/util/InitialSettings"
], function (Controller, InitialSettings) {
	"use strict";

	return Controller.extend("pinaki.LandingPage.LandingPage.controller.Basecontroller", {
		registerInitialSettings: function () {
			var oModel = this.getView().getModel();
			var localStorageName = 'LocalinitialSettings';

			oModel.attachPropertyChange(function() {
				alert();
			});

			if (localStorage.getItem(localStorageName) === null) {
				oModel.setData({ "initialSettings": InitialSettings });
			} else {
				var storage = localStorage.getItem(localStorageName);
				oModel.setData({ "initialSettings": JSON.parse(storage) });
			}
			this.updateNetworkStatus(oModel);
			
		},
		updateNetworkStatus: function (oModel) {
			var connection = navigator.connection || navigator.mozConnection || navigator.webkitConnection;
			oModel.setProperty('/initialSettings/networkStatus', connection);
			function updateConnectionStatus() {
				oModel.setProperty('/initialSettings/networkStatus', connection);
			}
			connection.addEventListener('change', updateConnectionStatus);
		}
	});
});