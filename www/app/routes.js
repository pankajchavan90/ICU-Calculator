angular.module('app.routes', [])
    .config(function ($stateProvider, $urlRouterProvider) {

        $stateProvider
            .state('splash', {
                url: '/splash',
                templateUrl: 'pages/splash.html',
                controller: 'splashCtrl'
            })
            .state('ward', {
                url: '/ward',
                templateUrl: 'pages/ward.html',
                controller: 'wardCtrl'
            });

        $urlRouterProvider.otherwise('/splash')
    });