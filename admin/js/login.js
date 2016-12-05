  // Some fake testing data
angular.module('server.login',[])
 .controller('LoginCtrl', function($scope, $stateParams,$http,$location,$ionicPopup,ME,api) {
  $scope.loginData={};
  $scope.loginData.userName="admin";
  $scope.loginData.password="admin";
  $scope.loginData.merchantId="001";

  $scope.doLogin=function(){
  var currentUrl="admin/login",method="POST";
  api.request(method,currentUrl,$scope.loginData,{},{ 'Content-Type': 'application/json; charset=UTF-8'}).then(function(data){
          ME.info=data;
          ME.merchantId=$scope.loginData.merchantId || picture;
          ME.path=ME.path+$scope.loginData.merchantId+"/";
          
          $location.path("/app/manager");
       })
}
});

         