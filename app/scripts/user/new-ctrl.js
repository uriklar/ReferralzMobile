'use strict';

angular.module('referralzMobile')
  .controller('UserNewCtrl', function ($scope, $auth) {
    $scope.handleSignupBtnClicked = function() {
      $scope.regForm.confirmed_at = new Date();
      $auth.submitRegistration($scope.regForm)
        .then(function(resp) {
          console.log(resp);
        })
        .catch(function(resp) {
          console.log(resp);
        });
    };
  });
