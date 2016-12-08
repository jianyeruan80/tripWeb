  // Some fake testing data
angular.module('server.navs',[])
 .controller('NavsCtrl', function($scope, $stateParams,$http,$location,$ionicPopup,$ionicModal,ME,api) {
  $scope.navs={};
  $scope.navs.lists=[];
  $scope.navs.nav={};
  $scope.getNavs=function(){
       var currentUrl=ME.url+"navs/merchants/id";    
       api.request("GET",currentUrl).then(function(data){
         $scope.navs.lists=data;
       })
  }
  $ionicModal.fromTemplateUrl('templates/modalNavs.html', {scope: $scope,animation: 'slide-in-up'}).then(function(modal) {$scope.modalNavs = modal;});
  $scope.openNavs=function(){
      $scope.modalNavs.show();
  }
  $scope.closeNavs=function(){
      $scope.modalNavs.hide();
  }
  $scope.saveNavs=function(){
       var currentUrl=ME.url+"navs",method="POST";
        if($scope.navs.nav._id){
          currentUrl=ME.url+"navs/"+$scope.navs.nav._id;
          method="PUT";
          }
      api.request(method,currentUrl,$scope.navs.nav).then(function(data){
           $scope.getNavs();
       })
      
  }

  $scope.delNavs=function(){
     var currentUrl=ME.url+"navs/"+$scope.navs.nav._id;
      api.request("DELETE",currentUrl).then(function(data){
         $scope.getNavs();
       })
  }
 alert("OK")
});

         