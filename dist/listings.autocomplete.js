'use strict';

var controller = function controller($scope) {
	var _this = this;

	this.key = this.key;
	this.remote = this.remote;
	this.options = this.options || { highlight: true };
	this.queryString = this.queryString || {};
	this.destination = this.destination || "";
	this.css = this.css || "form-control";

	$scope.$watch('vm.query', function (newvalue) {
		if (newvalue) {
			if (newvalue.id) {
				var value = {};
				value[_this.key] = newvalue.id;
				var params = joinObj(_this.queryString, value);
				params = obj2Params(params);
				location.href = _this.destination + "?" + params;
			}
		}
	}, true);
	var joinObj = function joinObj(obj1, obj2) {
		for (var attrname in obj2) {
			obj1[attrname] = obj2[attrname];
		}
		return obj1;
	};
	var obj2Params = function obj2Params(obj) {
		var str = [];
		for (var i in obj) {
			str.push(i + "=" + obj[i]);
		}
		return str.join("&");
	};

	var thousandSeparator = function thousandSeparator(value) {
		var separator = arguments.length <= 1 || arguments[1] === undefined ? "." : arguments[1];

		return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, separator);
	};

	var data = new Bloodhound({
		datumTokenizer: Bloodhound.tokenizers.obj.whitespace('value'),
		queryTokenizer: Bloodhound.tokenizers.whitespace,
		remote: {
			url: this.remote,
			prepare: function prepare(query, settings) {
				settings.type = "GET";
				settings.data = joinObj({ q: _this.query }, _this.queryString);
				return settings;
			},
			transform: function transform(response) {
				var body = [];
				for (var i in response.data) {
					body.push({
						id: response.data[i].value,
						title: response.data[i].title + " (" + thousandSeparator(response.data[i].count) + ")"
					});
				}
				return body;
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
angular.module(myModule).component('listingsAutocomplete', {
	template: "\n  \t<style type=\"text/css\">.twitter-typeahead{ width: 100%; display: block }</style>\n  \t<input\n  \t\ttype=\"text\"\n  \t\tclass=\"{{vm.css}}\"\n  \t\tdatasets=\"vm.dataset\"\n  \t\toptions=\"vm.options\"\n  \t\tng-model=\"vm.query\"\n  \t\tsf-typeahead\n  \t/>\n  ",
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