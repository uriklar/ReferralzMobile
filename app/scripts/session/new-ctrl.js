'use strict';

angular.module('referralzMobile')
  .controller('SessionNewCtrl', function ($scope, $auth) {
    $scope.handleLoginBtnClicked = function() {
      $auth.submitLogin($scope.loginForm)
        .then(function(resp) {
          console.log(resp);
        })
        .catch(function(resp) {
          console.log(resp);
        });
    };
  });
