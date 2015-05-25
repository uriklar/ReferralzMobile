'use strict';

angular.module('referralzMobile')
  .controller('BusinessShowCtrl', function ($scope,businesses,business, Restangular) {
    var baseLink = Restangular.all('links');

    $scope.business = business;
    $scope.businesses = filterBusinesses(businesses,$scope.business);

    $scope.toggleFromNetwork = function(business) {
      baseLink
        .post({
          follower_id: $scope.business.id,
          followed_id: business.id
        })
        .then(function(business) {
          $scope.business = business;
          $scope.businesses = filterBusinesses(businesses,business);
        }, function(e){
          console.log("there was an error");
          console.log(e);
        });
    }

    function filterBusinesses(businesses,business) {
      // get ids to filter (business + all businesses in his network)
      var ids = [business.id].concat(_.map(business.businesses_in_network,'id'));
      return _.filter(businesses,function(b){
        return !_.contains(ids, b.id);
      });
    }
  });
