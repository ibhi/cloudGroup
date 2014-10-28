angular.module('starter.controllers', [])

.controller('AppCtrl', function($scope, $ionicModal, $timeout) {
  // Form data for the login modal
  // $scope.loginData = {};

  // // Create the login modal that we will use later
  // $ionicModal.fromTemplateUrl('templates/login.html', {
  //   scope: $scope
  // }).then(function(modal) {
  //   $scope.modal = modal;
  // });

  // // Triggered in the login modal to close it
  // $scope.closeLogin = function() {
  //   $scope.modal.hide();
  // };

  // // Open the login modal
  // $scope.login = function() {
  //   $scope.modal.show();
  // };

  // // Perform the login action when the user submits the login form
  // $scope.doLogin = function() {
  //   console.log('Doing login', $scope.loginData);

  //   // Simulate a login delay. Remove this and replace with your login
  //   // code if using a login system
  //   $timeout(function() {
  //     $scope.closeLogin();
  //   }, 1000);
  // };
})

.controller('PlaylistsCtrl', function($scope) {
  $scope.playlists = [
    { title: 'Reggae', id: 1 },
    { title: 'Chill', id: 2 },
    { title: 'Dubstep', id: 3 },
    { title: 'Indie', id: 4 },
    { title: 'Rap', id: 5 },
    { title: 'Cowbell', id: 6 }
  ];
})

.controller('PlaylistCtrl', function($scope, $stateParams) {
})

.controller('AddCtrl', function($scope, clientService){

  var client = new Dropbox.Client({ key: "a1gx7n1kgmfnoue" });
  $scope.addDropbox = function(){
    // console.log(client);
    client.authDriver(new Dropbox.AuthDriver.Cordova());
    // console.log("Auth successful");
    client.authenticate(function(error, client) {
      if (error) {
        // Replace with a call to your own error-handling code.
        //
        // Don't forget to return from the callback, so you don't execute the code
        // that assumes everything went well.
        return showError(error);
      }

      // Replace with a call to your own application code.
      //
      // The user authorized your app, and everything went well.
      // client is a Dropbox.Client instance that you can use to make API calls.
      console.log("Everything is fine");
      clientService.setClient(client);
    });
  }

  var showError = function(error) {
    switch (error.status) {
    case Dropbox.ApiError.INVALID_TOKEN:
      // If you're using dropbox.js, the only cause behind this error is that
      // the user token expired.
      // Get the user through the authentication flow again.
      console.log("If you're using dropbox.js, the only cause behind this error is that the user token expired. Get the user through the authentication flow again.")
      break;

    case Dropbox.ApiError.NOT_FOUND:
      // The file or folder you tried to access is not in the user's Dropbox.
      // Handling this error is specific to your application.
      break;

    case Dropbox.ApiError.OVER_QUOTA:
      // The user is over their Dropbox quota.
      // Tell them their Dropbox is full. Refreshing the page won't help.
      break;

    case Dropbox.ApiError.RATE_LIMITED:
      // Too many API requests. Tell the user to try again later.
      // Long-term, optimize your code to use fewer API calls.
      break;

    case Dropbox.ApiError.NETWORK_ERROR:
      // An error occurred at the XMLHttpRequest layer.
      // Most likely, the user's network connection is down.
      // API calls will not succeed until the user gets back online.
      break;

    case Dropbox.ApiError.INVALID_PARAM:
    case Dropbox.ApiError.OAUTH_ERROR:
    case Dropbox.ApiError.INVALID_METHOD:
    default:
      // Caused by a bug in dropbox.js, in your application, or in Dropbox.
      // Tell the user an error occurred, ask them to refresh the page.
    }
  };

  
})

.controller('BrowseCtrl', function($scope, clientService, clientSrvc){
  clientSrvc.authenticate().then(function(client){
      
      console.log('Client has been set');
      clientSrvc.getAccountInfo().then(function(accountInfo){
        $scope.accountName = accountInfo.name;
        
      },function(error){
        console.log(error);
      });

      // clientSrvc.readdir("/").then(function(array){
      //   $scope.entries = array[0];
      //   $scope.stat = array[1];
      //   console.log($scope.stat);
      //   $scope.entries_stat = array[2];
      //   console.log($scope.entries_stat);
      // }, function(error){
      //   console.log(error);
      // });
      $scope.readdir('/');
       
      
    }, function(error){
      console.log(error);
    }
  );

  $scope.readdir = function(path){
    clientSrvc.readdir(path).then(function(array){
        $scope.entries = array[0];
        $scope.stat = array[1];
        console.log($scope.stat);
        $scope.entries_stat = array[2];
        console.log($scope.entries_stat);
      }, function(error){
        console.log(error);
      });
  }
   
  
});
