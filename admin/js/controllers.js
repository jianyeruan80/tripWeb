angular.module('server.controllers', []) /*['ng-sortable']*/
     .filter('hasPerms', function() {
            return function(data, scope,customerxx) {
              
                 return (data & 3)>0;                
            }
        })
     .filter('trustUrl', function ($sce) {
    return function(url) {
      return $sce.trustAsResourceUrl(url);
    };
  })
.controller('AppCtrl', function($scope, $ionicModal, $timeout,$http,$ionicModal,$location,$ionicLoading,$ionicPopup,ME,api) {
  $scope.appData={};
  $scope.appData.store={};
  $scope.appData.store.pictures=[];
  $scope.appData.store.vedios=[{"path":"http://www.w3schools.com/html/mov_bbb.mp4"}];
  $scope.appData.store.tax=0;
  $scope.appData.store.addressInfo={};
  $scope.config={};
  $scope.appData.perms=[];
  $scope.appData.roles=[];
  $scope.appData.users=[];
  $scope.logout=function(){
    ME.info={};
    $location.path("/admin");
   } 

$scope.html5Reader=function(file,pic)
    {
          var file = file.files[0];
          var reader = new FileReader();
          reader.readAsDataURL(file);
            reader.onload = function(e){
            pic.src=this.result;
        }
       }
   $scope.uploadPicture=function(id){
      
      document.getElementById(id).click();
  }
  $scope.showPreview=function(o){
     $scope.appData.pictures=$scope.appData.pictures || [];
       var byId=o.id;
        var pic = document.getElementById(byId+'Src');
       var file = document.getElementById(byId);
       $scope.html5Reader(file,pic);
      var oDataSource = new FormData();
      oDataSource.append('picture', file.files[0]);
      var currentUrl="uploadPic",method="POST";
      api.request(method,currentUrl,oDataSource,{},{ 'Content-Type': undefined}).then(function(data){
         document.getElementById(byId+"Value").value=data;
        
        file.value=null; 
       })

    }
     $scope.showMorePreview=function(o){
       var byId=o.id;
        var pic = document.getElementById(byId+'Src');
       var file = document.getElementById(byId);
     //  $scope.html5Reader(file,pic);
      var oDataSource = new FormData();
      oDataSource.append('picture', file.files[0]);
      var currentUrl="uploadPic",method="POST";
      api.request(method,currentUrl,oDataSource,{},{ 'Content-Type': undefined}).then(function(data){
          var json={
          "name":data
        }
         $scope.appData.store.pictures.push(json);
         file.value=null; 
       })

    }
/*    $scope.addVedio=function(){
      
       $scope.appData.store.vedios.push(document.getElementById("vedioSrc").value);
    }*/
 $scope.getPerms=function(){
   var currentUrl="admin/perms",method="GET";
       api.request(method,currentUrl,{}).then(function(data){
           $scope.appData.perms=data;
       })
 }

$scope.getRoles=function(){
  var currentUrl="admin/roles",method="GET";
       api.request(method,currentUrl,{}).then(function(data){
           $scope.appData.roles=data;
       })
    
  }
  $scope.getUsers=function(){
     var currentUrl="admin/users",method="GET";
       api.request(method,currentUrl,{}).then(function(data){
           $scope.appData.users=data;
       })
     
  }

  $ionicModal.fromTemplateUrl('templates/modalSortMenu.html', {scope: $scope,animation: 'slide-in-up'}).then(function(modal) {$scope.modalSortMenu = modal;});
    $scope.sortableME = { animation: 750,
     onEnd: function(list) {
      
       $scope.sortList=list.models;
        $timeout.cancel(timer);
        if(list.newIndex !=list.oldIndex){
          $scope.orderby(2000);  
        }
        

      console.log(list)
    }
 };
  $scope.auth=function(){
      var authData={};
         authData.permissions=[];
         authData.roles=[];
         var tempPermissions="";
           var currentUrl="admin/roles/"+$scope.config.selectRoleId+"/perms",method="PUT";
         if($location.url().indexOf("user")>=0){
            currentUrl="admin/users/"+$scope.config.selectUserId+"/perms";
             $scope.config.selectRoleId="";
                  angular.forEach($scope.appData.roles,function(v,key){
                         if(v.key==v._id){
                              authData.roles.push(v._id);
                              tempPermissions+=v.permissions.toString();
                            }
                      
              })
          }else{
            $scope.config.selectUserId="";
          }
          angular.forEach($scope.appData.perms,function(value,key){
                   angular.forEach(value.perms,function(v,k){
                      
                       if(v.key==v.value && (tempPermissions.indexOf(v.value)==-1 || tempPermissions=="")){
                          authData.permissions.push(v.value);
                        }
                   })
          })
        
       api.request(method,currentUrl,authData).then(function(data){
         
               $scope.getRoles();
              $scope.getUsers();
          
          $scope.config.selectRoleId="";
          $scope.config.selectUserId="";
          $ionicPopup.alert({
                            title:'<b>Alert Info</b>',
                            template: '<div style="color:green;font-weight:600;text-align:center;font-size:25px">success</div>' });
           angular.forEach($scope.appData.perms,function(value,key){
                  angular.forEach(value.perms,function(v,k){
                       v.key=""
                   })
          })
       })

    }
    $scope.all=function(e){
      var _id = e.target.dataset.permground;
      stopPropagation(e);

    angular.forEach($scope.appData.perms,function(value,key){
                   if(value._id==_id){
                        angular.forEach(value.perms,function(v,k){
                         // console.log(document.getElementById(checkBoxName).checked)
                              if(e.target.checked==true){
                                v.key=angular.copy(v.value);
                               
                              }else{
                                v.key="";
                               
                              }
                              
                            
                       }) 
                   }
                   
          })

    }
 

 $scope.getPerms();
 $scope.getRoles();
 $scope.getUsers();

 
})
.controller('ManagerCtrl', function($scope,$ionicModal, $ionicLoading,$timeout,$ionicPopup,$http,ME,api) {
$scope.appData.store.vedios=$scope.appData.store.vedios || [];
        $timeout(function(){
          $scope.videoHTML ='<video id="video"  src="http://www.videogular.com/assets/videos/videogular.mp4" style="width:300px;height:240px" controls></video>'; 
        },10) 
        

alert($scope.appData.store.vedios[0].path);
$scope.addUrl=function() {
    var path = prompt("Please enter your url", "http://");
    if (path != null) {
        var json={"path":path};
        $scope.appData.store.vedios.push(json);
       console.log( $scope.appData.store.vedios);
    }
}


$scope.getCoordinates=function(){
  $scope.appData.store.addressInfo.location={};
  $scope.appData.store.addressInfo.location.coordinates="";
       if($scope.appData.store.addressInfo.address){
                var currentUrl=ME.api+"ext";
               $http({ method:"GET",url: currentUrl, 
                 headers: { 'Content-Type': 'application/json; charset=UTF-8', Authorization: "Bearer "+ME.info.accessToken},
                 params:{"address":$scope.appData.store.addressInfo.address}
               }).success(function(data){

                  $scope.appData.store.addressInfo.address=data.formatted_address;
                  
                  console.log($scope.appData.store);
                  $scope.appData.store.addressInfo.location.coordinates=data.geometry.location.lat+","+data.geometry.location.lng;
                 }).error(function(err){
                 $scope.error(err.message);
               })
       }
}



  $scope.getStore=function(){
          var currentUrl=ME.api+"stores/merchants/id";
           $http({ method:"GET",url: currentUrl, 
             headers: { 'Content-Type': 'application/json; charset=UTF-8', Authorization: "Bearer "+ME.info.accessToken},
           }).success(function(data){
             $scope.appData.store=data;

           }).error(function(err){
             $scope.error(err.message);
           })
            
}
   

       $scope.storeUpdate=function(){
         
        
                
                var currentUrl="stores";
                var method="POST";
                if($scope.appData.store && $scope.appData.store._id){
                  var currentUrl="stores/"+$scope.appData.store._id;
                  method="PUT";
                }
                
                

          $scope.appData.store.logo= document.getElementById("logoValue").value || null;
            console.log($scope.appData.store)



       api.request(method,currentUrl,$scope.appData.store).then(function(data){
            $scope.managerData.store=data;
       })

   
       
}
$scope.getStore();
/* $scope.getStore();
 $timeout(function() {
    $scope.getHours(); 
 }, 0);
 */

  })


.controller('UserCtrl', function($scope,$ionicModal,$ionicPopup,$http,ME,api) {
     $scope.userData={};
     $scope.userData.password="";
     $scope.$on('$destroy', function() {
     $scope.userModal.remove();
    
   });

  $ionicModal.fromTemplateUrl('templates/modalUser.html', {
      scope: $scope,
      animation: 'slide-in-up'
      }).then(function(modal) {
      $scope.userModal = modal;
   });

   $scope.openUserModal = function() {
       $scope.appData.user={};
       $scope.appData.user.status=true;
       $scope.userModal.show();

   };
   $scope.closeUserModal = function() {
    
      $scope.userModal.hide();
   };
    $scope.userUpdate=function(){
      var currentUrl="admin/users",method="POST";
      if($scope.appData.user._id){
          currentUrl="admin/users/"+$scope.appData.user._id;
          method="PUT";
        }
       api.request(method,currentUrl,$scope.appData.user).then(function(data){
            $scope.closeUserModal();
            $scope.getUsers();
       })
 }
   $scope.getSelectRolePerms=function(){

           var rolePermStr="";
           angular.forEach($scope.appData.roles,function(v,k){
                 if(v._id==v.key){
                    rolePermStr+=v.permissions.toString();
                 }

           })
             rolePermStr+=$scope.config.selectUserPermStr;
            angular.forEach($scope.appData.perms,function(value,key){
              document.getElementById("allCheckboxUser"+value._id).checked=false;
              angular.forEach(value.perms,function(v,k){
                       if(rolePermStr.indexOf(v.value)>=0){
                         v.key=angular.copy(v.value);
                       }else{
                         
                        v.key=""; 

                       }
                   })
          })

   }
   $scope.getUserPerm=function(e){
       stopPropagation(e);
      var selectRoleStr="";
      $scope.config.selectUserPermStr="";
     for(var i=0;i<$scope.appData.users.length;i++){
       if($scope.appData.users[i]._id==$scope.config.selectUserId){
            selectRoleStr=$scope.appData.users[i].roles.toString();
            $scope.config.selectUserPermStr=$scope.appData.users[i].permissions.toString();
            break;
       }
     }

       angular.forEach($scope.appData.roles,function(v,k){
                 if(selectRoleStr.indexOf(v._id)!=-1){

                    v.key=v._id;
        }else{
                    v.key="";
                 }

           })


       $scope.getSelectRolePerms();



   }
   $scope.getUser=function(index){
    $scope.appData.user=angular.copy($scope.appData.users[index]);
    $scope.userData.password=$scope.appData.user.password;
    $scope.userModal.show();
    }
   $scope.getUsers();
   $scope.getRoles();
   $scope.getPerms();
})
.controller('RoleCtrl', function($scope,$ionicModal,$http,$ionicPopup,ME,api) {
   $scope.$on('$destroy', function() {
      $scope.roleModal.remove();
    });
  $scope.roleEdit=function(index){
         $scope.appData.role=angular.copy($scope.appData.roles[index]);
         $scope.roleModal.show(); 
  }
  $ionicModal.fromTemplateUrl('templates/modalRole.html', {
      scope: $scope,
      animation: 'slide-in-up'
      }).then(function(modal) {
      $scope.roleModal = modal;
   });

   $scope.openRoleModal = function() {
       $scope.appData.role={};
       $scope.appData.role.status=true;
       $scope.roleModal.show();

   };
   $scope.closeRoleModal = function() {
    $scope.roleModal.hide();
   };
   $scope.roleUpdate=function(){
     var currentUrl="admin/roles",method="POST";
      if($scope.appData.role._id){
          currentUrl="admin/roles/"+$scope.appData.role._id;
          method="PUT";
        }
       api.request(method,currentUrl,$scope.appData.role).then(function(data){
            $scope.closeRoleModal();
            $scope.getRoles();
       })
 
   }
    $scope.getSelectRolePerms=function(e,id){
       stopPropagation(e);
    $scope.config.selectRoleId=id;
    stopPropagation(e);
    var rolePermStr="";
      for(var i=0;i<$scope.appData.roles.length;i++){
                       if($scope.appData.roles[i]._id==$scope.config.selectRoleId){
                          rolePermStr=$scope.appData.roles[i].permissions;
                          break;
                       }

     }
    angular.forEach($scope.appData.perms,function(value,key){
              document.getElementById("allCheckbox"+value._id).checked=false;
              angular.forEach(value.perms,function(v,k){
                       if(rolePermStr.indexOf(v.value)>=0){
                         v.key=angular.copy(v.value);
                       }else{
                         v.key=""; 

                       }
                   })
          })


 }
 
})

 


