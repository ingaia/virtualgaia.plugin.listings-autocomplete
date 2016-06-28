'use strict';
var controller = function($scope){
	this.key = this.key;
	this.remote = this.remote;
	this.options = this.options || {highlight: true};
	this.queryString = this.queryString || {};
	this.destination = this.destination || "";
	this.css = this.css || "form-control";

	$scope.$watch('vm.query',(newvalue)=>{
		if(newvalue){
			if(newvalue.id){
				var value = {};
				value[this.key] = newvalue.id;
				var params = joinObj(this.queryString,value);
				params = obj2Params(params);
				location.href = this.destination + "?" + params;
			}
		}
	},true);
	var joinObj = function(obj1,obj2){
		for (var attrname in obj2) { obj1[attrname] = obj2[attrname]; }
		return(obj1);
	};
	var obj2Params = function(obj){
		var str = [];
		for(var i in obj){
			str.push(i + "=" + obj[i]);
		}
		return(str.join("&"));
	};

	var thousandSeparator = function(value, separator = ".") {
	    return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, separator);
	};

	var data = new Bloodhound({
	  datumTokenizer: Bloodhound.tokenizers.obj.whitespace('value'),
	  queryTokenizer: Bloodhound.tokenizers.whitespace,
	  remote: {
	  	url: this.remote,
		prepare: (query,settings)=>{
	  		settings.type = "GET";
	  		settings.data = joinObj({q: this.query},this.queryString);
	  		return(settings);
	  	},
	  	transform: (response)=>{
	  		var body = [];
	  		for(var i in response.data){
	  			body.push({
	  				id: response.data[i].value,
	  				title: response.data[i].title + " (" + thousandSeparator(response.data[i].count) + ")"
	  			});
	  		}
	  		return(body);
	  	}
	  }
	});

	data.initialize();

	this.dataset = {
	    displayKey: 'title',
	    source: data.ttAdapter()
	};

};
controller.$inject = ['$scope'];

var myModule = 'virtualgaia.plugin.listings-autocomplete';
angular.module(myModule, ['siyfion.sfTypeahead']);
angular.module(myModule).component('listingsAutocomplete',{
  template: `
  	<style type="text/css">.twitter-typeahead{ width: 100%; display: block }</style>
  	<input
  		type="text"
  		class="{{vm.css}}"
  		datasets="vm.dataset"
  		options="vm.options"
  		ng-model="vm.query"
  		sf-typeahead
  	/>
  `,
  controller: controller,
  controllerAs: "vm",
  bindings: {
  	key: "@",
  	remote: "@",
  	options: "=?",
  	queryString: "=?",
  	destination: "@?",
  	css: "@?"
  }
});

angular.module("virtualgaia", [myModule]);