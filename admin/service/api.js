angular.module('server.api', [])
.factory('api',function($http,$q,$ionicPopup,$ionicLoading,$timeout,ME){
 return{
     request:function(method,url,data,params,type){
              var deferred = $q.defer();
              var currentUrl=ME.api+url;
              $ionicLoading.show();
              data=data || {};
              params=params || {};
              var contentType=type || { 'Content-Type': 'application/json; charset=UTF-8'};
                  
                contentType["Authorization"]= "Bearer "+ME.info.accessToken;
              $http({
                      method: method,
                      url: currentUrl,
                      headers: contentType,
                      data:data,
                      params:params,
                  }).success(function(data){
                    deferred.resolve(data);
                  }).error(function(err){
                           deferred.reject();
                          $timeout(function(){
                           try{var el = document.querySelector(".popup-buttons > button");el.focus();}catch(ex){}},100);
                            $ionicPopup.alert({
                            title:'<b>Alert Info</b>',
                            template: '<div style="color:red;font-weight:600;text-align:center;font-size:25px">'+err.message+'</div>' });
                    }).finally(function() {
                    $ionicLoading.hide();
        });
            return deferred.promise;     
    }
}
})


/* var currentUrl="admin/perms",method="GET";
       api.request(method,currentUrl,{}).then(function(data){
           $scope.appData.perms=data;
       })*/

/*        var currentUrl="admin/users",method="POST";
      if($scope.appData.user._id){
          currentUrl="admin/users/"+$scope.appData.user._id;
          method="PUT";
        }
       api.request(method,currentUrl,$scope.appData.user).then(function(data){
            $scope.closeUserModal();
            $scope.getUsers();
       })*/