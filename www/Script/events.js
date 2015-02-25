function Test() {
    console.log("Testing in progress...");
    var unit = new VasthuUnit(79.5);
    if (unit.koal != 1 && unit.viral != 2 && unit.yava != 4) {
        alert("Error in conversion formula. Incorrect output may be generated");
    }
    console.log("Testing complete...");
}

var app = angular.module('VasthuUnitApp', []);
app.controller('convertPageController', ['$scope',function($scope) {
	$scope.unitObjectForCMToV = new VasthuUnit(0);
	$scope.unitObjectForVToCM = new VasthuUnit(0);
	$scope.pageProperties = {};
	$scope.pageProperties.convertDirection = 1;
	$scope.convertedFromCM = function() {
		var value = $scope.unitObjectForCMToV.getVasthuUnit();
		return value.koal + " koal" + value.viral + " viral" + value.yava + " yava";
	}
	$scope.convertedFromVasthuUnit = function() {
		if ($scope.pageProperties.autoRearrange == true)
		{
			$scope.unitObjectForVToCM.rearrange();
		}
		return $scope.unitObjectForVToCM.getCM() + "cm";
	}
	$scope.getActiveConvertDirectionCSS = function() {
		if ($scope.pageProperties.convertDirection == 1)
		{
			return "ui-btn-active";
		}
		else
		{
			return "";
		}
	}
	$scope.pageProperties.autoRearrange = false;
}]);
app.controller("addScreenController", function($scope) {
	$scope.additionItems = [];
	$scope.additionItems[0] = new VasthuUnit(0,0,0);
	$scope.additionItems[1] = new VasthuUnit(0,0,0);
	$scope.addNew = function() {
		$scope.additionItems.push(new VasthuUnit(0,0,0));
	}
	$scope.remove = function() {
		$scope.additionItems.pop();
	}
	$scope.getSum = function() {
		var sum = new VasthuUnit(0,0,0);
		var unitObject;
		$("#page_addScreen_itemList").listview().trigger('create');
		$("#page_addScreen_itemList").listview('refresh');
		for(unitObject in $scope.additionItems) {
			$scope.additionItems[unitObject].rearrange();
			sum.add($scope.additionItems[unitObject]);
		}
		return sum;
	}
});

$(function() {
	Test();
});