function Test() {
	console.log("Testing in progress...");
	var unit = new VasthuUnit(79.5);
	if (unit.koal != 1 && unit.viral != 2 && unit.yava != 4) {
		alert("Error in conversion formula. Incorrect output may be generated");
	}
	console.log("Testing complete...");
}
var app = angular.module('VasthuUnitApp', []);
app.globalSettings = {};
app.globalSettings.maxNumberLength = 10;
app.controller('convertPageController', ['$scope', function($scope) {
	$scope.unitObjectForCMToV = new VasthuUnit(0, 0, 0);
	$scope.unitObjectForVToCM = new VasthuUnit(0, 0, 0);
	$scope.pageProperties = {};
	$scope.pageProperties.convertDirection = 1;
	$scope.convertedFromCM = "";
	$scope.convertedFromVasthuUnit = "";
	$scope.getActiveConvertDirectionCSS = function() {
		console.log(arguments.callee);
		if ($scope.pageProperties.convertDirection == 1) {
			return "ui-btn-active";
		} else {
			return "";
		}
	}
	$scope.pageProperties.autoRearrange = true;
	var unitObjectForVToCM_watch_koal = $scope.$watch("unitObjectForVToCM.koal", function(newVal, oldVal) {
		if (newVal != oldVal) {
			var v = new VasthuUnit(newVal, $scope.unitObjectForVToCM.viral, $scope.unitObjectForVToCM.yava);
			$scope.convertedFromVasthuUnit = v.getCM().toFixed(2) + " cm";
		}
	});
	var unitObjectForVToCM_watch_viral = $scope.$watch("unitObjectForVToCM.viral", function(newVal, oldVal) {
		if (newVal != oldVal) {
			var v = new VasthuUnit($scope.unitObjectForVToCM.koal, newVal, $scope.unitObjectForVToCM.yava);
			$scope.convertedFromVasthuUnit = v.getCM().toFixed(2) + " cm";
		}
	});
	var unitObjectForVToCM_watch_yava = $scope.$watch("unitObjectForVToCM.yava", function(newVal, oldVal) {
		if (newVal != oldVal) {
			var v = new VasthuUnit($scope.unitObjectForVToCM.koal, $scope.unitObjectForVToCM.viral, newVal);
			$scope.convertedFromVasthuUnit = v.getCM().toFixed(2) + " cm";
		}
	});
	var unitObjectForCMToV_watch_yava = $scope.$watch("unitObjectForCMToV.cm", function(newVal, oldVal) {
		if (newVal != oldVal) {
			var v = new VasthuUnit(newVal);
			$scope.convertedFromCM = v.toString();
		}
	});
}]);
app.controller("addScreenController", ['$scope', function ($scope) {
    $scope.additionItems = [];
    $scope.additionItems[0] = {};
    $scope.additionItems[0].unit = new VasthuUnit(0, 0, 0);
    $scope.additionItems[0].add = true;
    $scope.additionItems[1] = {};
    $scope.additionItems[1].unit = new VasthuUnit(0, 0, 0);
    $scope.additionItems[1].add = true;
    $scope.addNew = function () {
        console.log(arguments.callee);
        $scope.additionItems.push({
            add: true,
            unit: new VasthuUnit(0, 0, 0)
        });
        $("#page_addScreen_itemList").listview().trigger('create');
        $("#page_addScreen_itemList").listview('refresh');
    }
    $scope.remove = function () {
        console.log(arguments.callee);
        $scope.additionItems.pop();
        $("#page_addScreen_itemList").listview().trigger('create');
        $("#page_addScreen_itemList").listview('refresh');
    }
    $scope.getSum = new VasthuUnit(0);
    var additionItems_watch = $scope.$watch("additionItems", function (newVal, oldVal) {
        var sum = new VasthuUnit(0, 0, 0);
        var i;
        for (i in newVal) {
            newVal[i].unit.rearrange();
            if (newVal[i].add == true) {
                sum.add(newVal[i].unit);
            } else {
                sum.subtract(newVal[i].unit);
            }
            sum.rearrange();
            $scope.getSum = sum;
        }
    }, true);
} ]);
app.controller("GeometricalCalculationsController", ['$scope', function($scope) {
	$scope.unitObject = new VasthuUnit(0, 0, 0);
	$scope.divident = 0;
	$scope.x2 = "";
	$scope.x4 = "";
	$scope.perimeter = "";
	$scope.division = "";
	var unitObject_watch = $scope.$watch("unitObject", function(newVal, oldVal) {
		var t = $scope.unitObject.clone();
		t.multiply(2);
		$scope.x2 = t.toString();
		t.multiply(3.14);
		$scope.perimeter = t.toString();
		t = $scope.unitObject.clone();
		t.multiply(4);
		$scope.x4 = t.toString();
		if ($scope.divident != 0) {
			t = $scope.unitObject.clone();
			t.divide($scope.divident);
			$scope.division = t.toString();
		} else {
			$scope.division = "";
		}
	}, true);
	var divident_watch = $scope.$watch("divident", function(newVal, oldVal) {
		if (newVal != oldVal) {
			if (newVal != 0) {
				var t = $scope.unitObject.clone();
				t.divide(newVal);
				$scope.division = t.toString();
			} else {
				$scope.division = "";
			}
		}
	});
}]);
$(function() {
	Test();
	$("input[type='number']").each(function(i) {
		$(this).keydown(function(e) {
			var val = $(this).val();
			if (val.length >= app.globalSettings.maxNumberLength) {
				$(this).val(val.slice(0, app.globalSettings.maxNumberLength));
				e.preventDefault();
				e.stopPropagation();
			}
		});
		this.step = "any";
	});
	this.step = "any";
	$("#app_main_body").pagecontainer({
		beforeshow: function(event, ui) {
			var page = $("body").pagecontainer("getActivePage")[0].id;
			console.log(page);
			if (page == "page_homeScreen") {
				//Home screen stuff.
			} else if (page == "page_convertPage") {
				//Convert screen stuff.
			} else if (page == "page_addScreen") {
				//Add screen stuff.
			} else if (page == "page_geometricalCalulations") {
				//Geometrical Calculation screen stuff.
			}
		},
		hide: function(event, ui) {
			var page = $("body").pagecontainer("getActivePage")[0].id;
			console.log(page);
			if (page == "page_homeScreen") {
				//Home screen stuff.
			} else if (page == "page_convertPage") {
				//Convert screen stuff.
			} else if (page == "page_addScreen") {
				//Add screen stuff.
			} else if (page == "page_geometricalCalulations") {
				//Geometrical Calculation screen stuff.
			}
		}
	});
});