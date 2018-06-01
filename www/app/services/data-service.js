app.service('Data', ['$http', '$q', '$state', '$rootScope', '$location', '$timeout', 'Helper', function ($http, $q, $state, $rootScope, $location, $timeout, Helper) {
    var s = {};

    s.wards = (Helper.isJson(window.localStorage.wards)) ? JSON.parse(window.localStorage.wards) : {};
    s.baseUrl = 'http://localhost:3000/nplus_app/';

    s.postHttp = function (url, params, successCb, failureCb) {
        s.getAuthData(params);
        $http.post(s.baseUrl + url, params).then(function (result) {
            if (result.data.status == 'error') {
                failureCb(result.data.message);

            } else if (result.data.status == 'success') {
                successCb(result.data);

            } else {
                failureCb("Something is wrong.");
            }

        }, function (error) {
            failureCb(error);
        });
    };

    s.retrieveWards = function (callBackFn) {
        var data = s.getAuthData({});
        $http.post(s.baseUrl + "hospital/list_of_wards", data).then(function (result) {
            if (result.data.status == 'error') {
                alert(result.data.message);

            } else if (result.data.status == 'success') {
                s.wards = result.data.contents;
                window.localStorage.wards = JSON.stringify(result.data.contents);
                callBackFn();
            } else {
                alert("Something is wrong.");
            }

        }, function (error) {
            alert("Something is wrong. Please login again.");
            // s.logout();
        });
    };

    s.getAuthData = function (data) {
        data.api_key = 'IB4USQ2OTWiTIgdf5yrnjllOIIgzRcfS';
        data.auth_username = 'jupiter.hospital';
        return data;
    };

    s.retrieveBeds = function (wardId, successCb, failureCb) {
        s.postHttp("hospital/list_of_beds", {ward_id: wardId}, successCb, failureCb);
    };

    s.getActivePatients = function (wardId, successCb, failureCb) {
        s.postHttp("hospital/list_of_active_patients", {ward_id: wardId}, successCb, failureCb);
    };

    s.getPlanedMealsForPatient = function (patientId, participationId, forDate, successCb, failureCb) {
        s.postHttp("hospital/get_planed_meals_for_patient", {patient_id: patientId, participation_id: participationId, for_date: forDate}, successCb, failureCb);
    };

    s.saveRecall = function (patientId, participationId, dietPlanRecipeId, unitId, quantity, successCb, failureCb) {
        s.postHttp("hospital/save_recall", {patient_id:patientId, participation_id: participationId, diet_plan_recipe_id: dietPlanRecipeId, unit_id:unitId, quantity:quantity}, successCb, failureCb);
    };

    s.resetRecall = function (recallId, dietPlanRecipeId, successCb, failureCb) {
        s.postHttp("hospital/delete_recall", {recall_id:recallId, diet_plan_recipe_id: dietPlanRecipeId}, successCb, failureCb);
    };

    return s;
}]);

