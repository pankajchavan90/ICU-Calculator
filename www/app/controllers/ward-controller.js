app.controller('wardCtrl', ['$scope', '$state', '$http', 'Data', 'Helper', function ($scope, $state, $http, Data, Helper) {

    $scope.Helper = Helper;
    $scope.currentDate = moment().toDate();
    $scope.wards = Data.wards;
    $scope.selectedWard = Data.wards[0];
    $scope.selectedWardId = $scope.selectedWard.id;
    $scope.beds = {};
    $scope.selectedBed = null;
    $scope.selectedMealEntry = null;
    $scope.selectedRecipeId = null;
    $scope.dayPlan = null;
    $scope.counters = [0.25, 0.5, 0.75, 1.0, 1.25, 1.75, 2];

    $scope.init = function () {
        Data.retrieveBeds($scope.selectedWardId, function (result) {
            for(i in result.contents){
                var bed = result.contents[i];
                $scope.beds[bed.id] = {id: bed.id, name: bed.name, patient: null};
            }
            $scope.getActivePatients();

        }, function (error) {
            alert(error);
        });
    };

    $scope.getActivePatients = function () {
        Data.getActivePatients($scope.selectedWardId, function (result) {
            for(i in result.contents){
                var patient = result.contents[i];
                if ($scope.beds[patient.activity_place.id] != undefined){
                    $scope.beds[patient.activity_place.id]['patient'] = patient;
                }
            }
            $scope.selectedBed = $scope.beds[Object.keys($scope.beds)[0]];
            $scope.getDietPlan();

        }, function (error) {
            alert(error);
        });
    };

    $scope.getDietPlan = function () {
        if($scope.selectedBed.patient) {
            Data.getPlanedMealsForPatient($scope.selectedBed.patient.id, $scope.selectedBed.patient.visits[0].id, $scope.currentDate, function (result) {
                $scope.dayPlan = result.contents.day_plan;
                console.log($scope.dayPlan);

            }, function (error) {
                alert(error);
            });
        }else{
            $scope.dayPlan = null;
        }
    };

    $scope.selectedMealEntryFun = function (time) {
        if($scope.selectedMealEntry == time){
            $scope.selectedMealEntry = null;
        }else{
            $scope.selectedMealEntry = time;
        }
    };

    $scope.selectBed = function (bed) {
        $scope.selectedBed = bed;
        $scope.getDietPlan();
    };

    $scope.updateRecall = function (recipe) {
        Data.saveRecall($scope.selectedBed.patient.id, $scope.selectedBed.patient.visits[0].id, recipe.id, recipe.recall_entry.unit_id, recipe.recall_entry.quantity, function (result) {
            console.log(result);

        }, function (error) {
            alert(error);
        })
    };

    $scope.resetRecall = function (recipe) {
        if(recipe.recall_entry.id){
            Data.resetRecall(recipe.recall_entry.id, recipe.id, function (result) {
                recipe.recall_entry = {};
                $scope.selectRecallDefaultUnit(recipe);

            }, function (error) {
                alert(error);
            })
        }else{
            recipe.recall_entry = {};
            $scope.selectRecallDefaultUnit(recipe);
        }
    };

    $scope.selectRecallDefaultUnit = function (recipe) {
        if(recipe.recall_entry == undefined){
            recipe.recall_entry = {}
        }

        if(recipe.recall_entry.unit_id == undefined){
            recipe.recall_entry.unit_id = recipe.serving_units[Object.keys(recipe.serving_units)[0]][0];
        }
    };

    $scope.selectedRecipeIdFun = function (recipe) {
        $scope.selectedRecipeId = recipe.id;
    };

    $scope.unselectedRecipeIdFun = function () {
        $scope.selectedRecipeId = null;
    };

    $scope.init();

}]);