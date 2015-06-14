'use strict';

/**
 * @ngdoc function
 * @name referralzMobile.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the referralzMobile
 */
angular.module('referralzMobile')
  .controller('HomeCtrl', function ($scope, $rootScope,$auth, $state) {
    $scope.handleSignOutBtnClick = () => {
      $auth.signOut()
        .then(function(resp) {
          $state.go('sign-in')
        })
        .catch(function(resp) {
          console.log(resp);
        });
    };
  });
