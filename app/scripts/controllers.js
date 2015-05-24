angular.module('starter')

.controller('DashCtrl', function($scope, Restangular) {
	var baseAccounts = Restangular.all('businesses');

	// This will query /accounts and return a promise.
	baseAccounts.getList().then(function(accounts) {
	  $scope.allAccounts = accounts;
	});
})

.controller('ChatsCtrl', function($scope, Chats) {
  $scope.chats = Chats.all();
  $scope.remove = function(chat) {
    Chats.remove(chat);
  }
})

.controller('ChatDetailCtrl', function($scope, $stateParams, Chats) {
  $scope.chat = Chats.get($stateParams.chatId);
})

.controller('AccountCtrl', function($scope) {
  $scope.settings = {
    enableFriends: true
  };
});
