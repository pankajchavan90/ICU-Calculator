app.controller('splashCtrl', ['$scope', '$state', '$http', 'Data', 'Helper', function ($scope, $state, $http, Data, Helper) {

    $scope.init = function () {
        $scope.pageLoader = true;
        Data.retrieveWards(function () {
            $state.go('ward');
        });

    };

    $scope.init();

}]);