  // Some fake testing data
angular.module('server.navs',[])
 .controller('NavsCtrl', function($scope, $stateParams,$http,$location,$ionicPopup,$ionicModal,ME,api) {
  $scope.navs={};
  $scope.navs.lists=[];
  $scope.navs.nav={};
  $scope.getNavs=function(){
       var currentUrl="navs/merchantId";    
       api.request("GET",currentUrl).then(function(data){
         $scope.navs.lists=data;
         console.log(data);
       })
  }
  $ionicModal.fromTemplateUrl('modalNavs.html', {scope: $scope,animation: 'slide-in-up'}).then(function(modal) {$scope.modalNavs = modal;});
  $ionicModal.fromTemplateUrl('modalSubNavs.html', {scope: $scope,animation: 'slide-in-up'}).then(function(modal) {$scope.modalSubNavs = modal;});
  $scope.openNavs=function(id){
    $scope.navs.nav={};
    if(id){
         api.request("GET","navs/"+id).then(function(data){
           $scope.navs.nav=data;
       })
    }
    $scope.modalNavs.show();
  }
  $scope.closeNavs=function(){$scope.modalNavs.hide();}

  $scope.openSubNavs=function(id,subId){
  $scope.navs.nav={};
  if(id){
  $scope.navs.nav.parent=id;  
  }
  if(subId){
     api.request("GET","navs/"+subId).then(function(data){
           $scope.navs.nav=data;
       })
  }
  
  $scope.modalSubNavs.show();
  }
  $scope.closeSubNavs=function(){$scope.modalSubNavs.hide();}
  $scope.saveNavs=function(){
 
       var currentUrl="navs",method="POST";
        if($scope.navs.nav._id){
          currentUrl="navs/"+$scope.navs.nav._id;
          method="PUT";
          }
      
      api.request(method,currentUrl,$scope.navs.nav).then(function(data){
            try{
              $scope.closeNavs();
              $scope.closeSubNavs();  
            }catch(ex){}
            
            $scope.getNavs();
       })
      
  }

  $scope.delNavs=function(){
     var currentUrl="navs/"+$scope.navs.nav._id;
      api.request("DELETE",currentUrl).then(function(data){
         $scope.getNavs();
       })
  }
  $scope.showPreview=function(o){
    var byId=o.id;
    var file = document.getElementById(byId);
    var oDataSource = new FormData();
      oDataSource.append('picture', file.files[0]);
      var currentUrl="uploadPic",method="POST";
      api.request(method,currentUrl,oDataSource,{},{ 'Content-Type': undefined}).then(function(data){
        $scope.navs.nav.gallerys=$scope.navs.nav.gallerys || [];
        $scope.navs.nav.gallerys.push({"picture":data});
        file.value=null; 
       })

    }
$scope.delPicture=function(index){
  $scope.navs.nav.gallerys.splice(index,1);
}
  $scope.getNavs();
/*   $scope.openSubNavs=function(id,subId){
  // $scope.navs.nav.children=[];
   $scope.navs.nav.parentId=id;
   $scope.modalSubNavs.show();
  }*/
});
/*db.orders.aggregate([
    // Unwind the source
    { "$unwind": "$products" },
    // Do the lookup matching
    { "$lookup": {
       "from": "products",
       "localField": "products",
       "foreignField": "_id",
       "as": "productObjects"
    }},
    // Unwind the result arrays ( likely one or none )
    { "$unwind": "$productObjects" },
    // Group back to arrays
    { "$group": {
        "_id": "$_id",
        "products": { "$push": "$products" },
        "productObjects": { "$push": "$productObjects" }
    }}
])
$match: { "inventory_docs": { $ne: [] } }
         */