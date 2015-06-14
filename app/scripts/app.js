// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'referralzMobile' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
angular.module('referralzMobile', [
  'ionic',
  'config',
  'restangular',
  'ng-token-auth',
  'ionic-material',
  'ionMdInput'
])

.run(function($ionicPlatform, $rootScope, $location,$state) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleLightContent();
    }

    $rootScope.$on('auth:login-success', function(ev,user) {
      $state.go('home');
    });
    $rootScope.$on('auth:registration-email-success', function(ev,user) {
      $state.go('home');
    });

    $rootScope.$on( '$stateChangeError', function(event, toState, toParams, fromState, fromParams, error) {
        if(toState.name == 'home' && error.reason == 'unauthorized') {
          $state.go('sign-in');
        }
    });
  });
})

.config(function($stateProvider, $urlRouterProvider, RestangularProvider, $authProvider) {

  $stateProvider
  .state('home',{
      'url': '/',
      templateUrl: '/templates/home/home.html',
      controller: 'HomeCtrl',
      resolve: {
        auth: function ($auth) {
          return $auth.validateUser();
        }
      }
    })
  .state('business-new', {
    url: '/business/new',
    templateUrl: 'templates/business/new.html',
    controller: 'BusinessNewCtrl',
    resolve: {
      auth: function($auth) {
        return $auth.validateUser();
      },
      categories: function(Restangular) {
        return Restangular.service('categories').getList().then(function (data) {
          return data;
        }, function () {
          return []; // failure
        });
      }
    }
  })
  .state('business-show', {
    url: '/business/{businessId}',
    templateUrl: 'templates/business/show.html',
    controller: 'BusinessShowCtrl',
    resolve: {
      businesses: function(Restangular) {
        return Restangular.service('businesses').getList().then(function (data) {
          return data;
        }, function () {
          return []; // failure
        });
      },
      business: function(Restangular,$stateParams) {
       return Restangular.one('businesses', $stateParams.businessId).get().then(function(data) {
         return data;
       }, function() {
         return {}; //failure
       })
      }
    }
  })
  .state('sign-up', {
    url: '/sign-up',
    templateUrl: 'templates/user/new.html',
    controller: 'UserNewCtrl'
  })
  .state('sign-in', {
    url: '/sign-in',
    templateUrl: 'templates/session/new.html',
    controller: 'SessionNewCtrl'
  })
  .state('user-show',{
    url: '/user/{userId}',
    templateUrl: 'templates/user/show.html',
    controller: 'UserShowCtrl',
    resolve: {
      currentUser: function($auth) {
        return $auth.validateUser();
      }
    }
  });

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/');

  RestangularProvider.setBaseUrl('http://localhost:3000/api/v1');

  $authProvider.configure({
    apiUrl: 'http://localhost:3000/api/v1',
    //storage: 'localStorage'
  });
});
