sap.ui.define([
    "pinaki/LandingPage/LandingPage/controller/Basecontroller"
], function (Basecontroller) {
    "use strict";

    var searchHandler = Basecontroller.extend("pinaki.LandingPage.LandingPage.api.SearchFieldHandler", {
        constructor: function (SearchField) {
            this.id = SearchField.getId();
            this.searchControl = SearchField;
        }
    });
    /**
     * Suggest Values based on Current Value
     * @param {currentValue} Current value in search field based on which suggestions are to be loaded
     */
    searchHandler.prototype.suggestValues = function (currentValue) {
        if (currentValue.length < 3) {
            return
        }
        this.fetchSuggestionValues(currentValue).then(function(aValues){
            var aSuggetions = [];
            aValues.forEach(function(e){
                aSuggetions.push({"name":e});
            });
            this.searchControl.getModel().setProperty('/initialSettings/suggestionItems',aSuggetions);
            this.searchControl.suggest();
        }.bind(this));
    };
    /**
     * 
     */
    searchHandler.prototype.fetchSuggestionValues = function (string) {
    return new Promise(function (resolve,reject) {
            $.ajax({
                url: 'http://suggestqueries.google.com/complete/search?q='+string+'&client=firefox&hl=fr',
                dataType: 'jsonp',
                success: function (data) {
                    resolve(data[1])
                }
            });
        }.bind(this));
    }
    /**
     * 
     */
    searchHandler.prototype.search = function(searchtext){
        this.incrementCouter();
        this.saveToMemory();

        location.href='https://www.google.co.in/search?q='+searchtext;
    }

    searchHandler.prototype.incrementCouter=function(){
        var model = this.searchControl.getModel();
        var currentCount = model.getProperty('/initialSettings/searchCount');
        model.setProperty('/initialSettings/searchCount',currentCount+1);
    }
    searchHandler.prototype.saveToMemory=function(){
        var localStorageName = 'LocalinitialSettings';
        var model = this.searchControl.getModel();
        var modelData = model.getProperty('/initialSettings');
        localStorage.setItem(localStorageName,JSON.stringify(modelData));
    }
    return searchHandler;
});
