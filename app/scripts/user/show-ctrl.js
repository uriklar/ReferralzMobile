'use strict';

angular.module('referralzMobile')
  .controller('UserShowCtrl', function ($scope, $rootScope,$auth) {
    $scope.handleSignOutBtnClick = function() {
      $auth.signOut()
        .then(function(resp) {
          console.log(resp);
        })
        .catch(function(resp) {
          console.log(resp);
        });
    };
  });
