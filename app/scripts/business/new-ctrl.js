'use strict';

angular.module('referralzMobile')
  .controller('BusinessNewCtrl', function ($scope, Restangular, $location, categories) {
  	var baseBusinesses = Restangular.all('businesses');

  	$scope.newBusiness = {
  		name: "",
      user_id: $scope.user.id,
      category_id: ""
  	};

    $scope.categories = categories;


  	$scope.submit = function() {
  		baseBusinesses
  			.post({ business: $scope.newBusiness })
				.then(function(addedBusiness) {
								console.log(addedBusiness);
								$location.path("/business/"+addedBusiness.id);
							}, function(e){
								console.log("there was an error");
								console.log(e);
							});

      //Upload.upload({
      //  url: 'api/v1/businesses',
      //  method: 'POST',
      //  fields: {
      //    'business[name]': $scope.newBusiness.name,
      //    'business[user_id]': $scope.newBusiness.user_id
      //  },
      //  file: $scope.files[0],
      //  fileFormDataName: 'business[logo]'
      //}).success(function(addedBusiness) {
      //  console.log(addedBusiness);
      //  $location.path("/business/"+addedBusiness.id);
      //})
  	}
  });
