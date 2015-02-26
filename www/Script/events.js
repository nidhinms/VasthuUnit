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
	$scope.unitObjectForCMToV = new VasthuUnit(0);
	$scope.unitObjectForVToCM = new VasthuUnit(0);
	$scope.pageProperties = {};
	$scope.pageProperties.convertDirection = 1;
	$scope.convertedFromCM = function() {
		var value = $scope.unitObjectForCMToV.getVasthuUnit();
		return value.koal + " koal " + value.viral + " viral " + value.yava + " yava";
	}
	$scope.convertedFromVasthuUnit = function() {
		if ($scope.pageProperties.autoRearrange == true) {
			$scope.unitObjectForVToCM.rearrange();
		}
		return $scope.unitObjectForVToCM.getCM() + "cm";
	}
	$scope.getActiveConvertDirectionCSS = function() {
		if ($scope.pageProperties.convertDirection == 1) {
			return "ui-btn-active";
		} else {
			return "";
		}
	}
	$scope.pageProperties.autoRearrange = true;
}]);
app.controller("addScreenController", function($scope) {
	$scope.additionItems = [];
	$scope.additionItems[0] = {};
	$scope.additionItems[0].unit = new VasthuUnit(0, 0, 0);
	$scope.additionItems[0].add = true;
	$scope.additionItems[1] = {};
	$scope.additionItems[1].unit = new VasthuUnit(0, 0, 0);
	$scope.additionItems[1].add = true;
	$scope.addNew = function() {
		$scope.additionItems.push({
			add: true,
			unit: new VasthuUnit(0, 0, 0)
		});
	}
	$scope.remove = function() {
		$scope.additionItems.pop();
	}
	$scope.getSum = function() {
		var sum = new VasthuUnit(0, 0, 0);
		var unitObject;
		$("#page_addScreen_itemList").listview().trigger('create');
		$("#page_addScreen_itemList").listview('refresh');
		for (unitObject in $scope.additionItems) {
			$scope.additionItems[unitObject].unit.rearrange();
			if ($scope.additionItems[unitObject].add == true) {
				sum.add($scope.additionItems[unitObject].unit);
			} else {
				sum.subtract($scope.additionItems[unitObject].unit);
			}
		}
		return sum;
	}
});
app.controller("GeometricalCalculationsController", function($scope) {
	$scope.unitObject = new VasthuUnit(0, 0, 0);
	$scope.divident = 0;
	$scope.x2 = function() {
		var t = $scope.unitObject.clone();
		t.multiply(2);
		return t.koal + " koal " + t.viral + " viral " + t.yava + " yava";
	}
	$scope.x4 = function() {
		var t = $scope.unitObject.clone();
		t.multiply(4);
		return t.koal + " koal " + t.viral + " viral " + t.yava + " yava";
	}
	$scope.perimeter = function() {
		var t = $scope.unitObject.clone();
		var pi = 3.14;
		t.multiply(2 * pi);
		return t.koal + " koal " + t.viral + " viral " + t.yava + " yava";
	}
	$scope.division = function() {
		$scope.unitObject.rearrange();
		var t = $scope.unitObject.clone();
		if ($scope.divident != 0) {
			t.divide($scope.divident);
			return t.toString();
		} else {
			return "";
		}
	}
});
$(function () {
    Test();
    $("input[type='number']").each(function (i) {
        $(this).keydown(function (e) {
            var val = $(this).val();
            if (val.length >= app.globalSettings.maxNumberLength) {
                $(this).val(val.slice(0, app.globalSettings.maxNumberLength));
                e.preventDefault();
                e.stopPropagation();
            }
        });
        this.step = "any";
    });
});