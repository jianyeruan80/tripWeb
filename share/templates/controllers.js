angular.module('starter.controllers',  ['ion-sticky'])
.controller('DashCtrl', function ($scope, $timeout,$ionicLoading,publicService,toaster,$ionicActionSheet) {
 $scope.testcreate=function(){
  $scope.messageData.shareTitle="response.name";
          $scope.messageData.shareMeasage="response.message";
          $scope.messageData.shareCaption="response.caption";
          

          //angular.copy({"s":"s"}, $scope.messageData.from);
          publicService.sendService("POST","api/share",$scope.messageData).
                             then(function(d){
                              
                          // $ionicLoading.hide();
                 });
 }  
 
$scope.messageData={};
$scope.share=function(id){
FB.api("/"+id,  function (response) {
        if (response && !response.error) {

          console.log(response);
          var  merchantID = angular.element(document.querySelector('#merchantID'));
           merchantID=angular.element(merchantID).val(); 

          $scope.messageData.shareName=response.name;
          $scope.messageData.shareMessage=response.message;
          $scope.messageData.shareCaption=response.caption;
          $scope.messageData.merchantID=merchantID;
          $scope.messageData.sharePictureUrl=$scope.photoUrl;

          $scope.messageData.shareFrom = angular.copy(response.from); 
          publicService.sendService("POST","api/share",$scope.messageData).
                             then(function(d){
                       publicService.sendService("POST","api/share",$scope.messageData).
                             then(function(d){
                              
                           
                     });

                          
                 });
          //$scope.messageData.shareFrom=response.caption;
        }
    }
);
                          
 }
 $scope.sendMessage=function(){
             // alert("sendMessage");
             // $scope.messageData={};
                console.log($scope.messageData);
              publicService.sendService("POST","api/share",$scope.messageData).
                             then(function(d){
                              
                          
                            $ionicLoading.hide();
                 });

         
        
}

 $scope.postFB=function(){

FB.ui({
     method: 'feed',
     name: 'share Title',
     link: 'http://developers.facebook.com/docs/reference/dialogs/',
     picture: 'http://52.10.242.31/'+$scope.photoUrl,
     caption: 'm.menusifu.com',
     description: 'description description description description....',
     message: 'Facebook Dialogs are easy!'
    },
   function(response) {
     if (response && response.post_id) {
       alert('Post was published.');
  
       $scope.share(response.post_id);

     } else {
     
     }
   }
 );
}
  //var o="ID";
  $scope.loginAndPost=function(){  
     

    FB.login(function (response) { 
                
        
      
        if (response.authResponse) { 
              
          postFB();
          
        } else { 
                    //alert('User cancelled login or did not fully authorize.'); 
                } 
            }, { scope: 'email,user_location,offline_access,publish_stream,publish_actions' }); 
  
  } 
  

   $scope.uploadData={};
   $scope.showActionSheet = function() {

   // Show the action sheet
   
   var hideSheet = $ionicActionSheet.show({
     buttons: [
       { text: 'faceBook' },
       { text: 'wechat' }
     ],
     //destructiveText: 'Delete',
    // titleText: 'Modify your album',
    cancelText: 'Cancel',
     cancel: function() {
           hideSheet();
        },
       
     buttonClicked: function(index) {
       if(index==0){
       
            FB.getLoginStatus(function(response) {

              if (response.authResponse) {
             
              $scope.postFB();

           }else{
            
                  $scope.loginAndPost();
           }

          })
       }
       return true;
     }
   });

   // For example's sake, hide the sheet after two seconds
 /*  $timeout(function() {
     hideSheet();
   }, 2000);*/

 };

   $scope.upload = function () {
   // alert("uploadupload");
    $ionicLoading.show({ content: 'Loading',animation: 'fade-in', showBackdrop: true, maxWidth: 200,showDelay: 0 });
             

  var photoPath = angular.element(document.querySelector('#photoPath'));
  photoPath=angular.element(photoPath).val();
//var e = angular.element(elem.querySelector('.classname'));
//angular.element(document.querySelectorAll("[my-directive]"));




              if(typeof($scope.uploadData.imgData) !="undefined"){
              $scope.uploadData.photoPath=photoPath;
               publicService.sendService("POST","api/upload",$scope.uploadData).
                     then(function(d){
                      alert(d);
                      if(d !="error"){
                      $scope.photoUrl=photoPath+"/"+d;
                      }
                     $scope.showActionSheet();
                    $ionicLoading.hide();
         });

         
          }else{

             toaster.pop('error', "",'please take a picture,then share');
             $ionicLoading.hide();
          }
    };




var imgl=document.getElementById('imgUpload');
 var preview = document.getElementById('preview'); 

 imgl.onchange=function(){

 if (!this.files.length) return;
$ionicLoading.show({ content: 'Loading',animation: 'fade-in', showBackdrop: true, maxWidth: 200,showDelay: 0 });
var file    = document.querySelector('input[type=file]').files[0]; //sames as here
      
  var width=500;


 lrz(file, {
            width:width,
            
            quality:0.7,
            before: function() {
                console.log('压缩开始');
            },
            fail: function(err) {
                console.error(err);
            },
            always: function() {
                console.log('压缩结束');
                $ionicLoading.hide();
            },
            done: function (results) {
              
               $scope.uploadData.imgData=results.base64;
                preview.src = results.base64;
            }
}
)

 /*var reader  = new FileReader();
reader.onloadend = function () {
        // var image = new Image(); 
      //   image.src=reader.result;
        // alert(preview.width);
         preview.src = reader.result;
        
        })
    if (typeof(file) !="undefined") {
           reader.readAsDataURL(file); //reads the data as a URL
       } */

 }


$scope.previewOpen=function(){
     
        imgl.click();
   
     }

})





.controller('ChatsCtrl', function($scope,publicService) {
  
 //TwittSrv.getTwitts().then(function(twitts){
/*      $scope.firstId="";
      $scope.lastId="";
      $scope.shareMessages=[];
    
          publicService.sendService("POST","api/all",{}).
                                   then(function(d){
                                    console.log("AAAAAAAAAAAAA") 
                                    console.log(d);
console.log("AAAAAAAAAAAAA") 
                                if(d.length>0){
                                   $scope.firstId=d[0]._id;
                                   $scope.lastId=d[d.length-1]._id;
                                   $scope.shareMessages = angular.copy(d); 
                                   console.log($scope.firstId) ;
                                   console.log($scope.lastId) ;
                                 }
                              $scope.$broadcast('scroll.infiniteScrollComplete');
                              $scope.$broadcast('scroll.refreshComplete');
                                   // console.log(d);
                                // $ionicLoading.hide();
                       });
 // });*/

  $scope.doRefresh = function(){
    console.log("doRefresh========================doRefresh");
             var data={"sign":"up","sendId":$scope.firstId};

             publicService.sendService("POST","api/all",data).
                                   then(function(d){
                                   // alert(d);
                                    if(d.length>0){
                                      $scope.firstId=d[0]._id;
                                    $scope.shareMessages = d.concat($scope.shareMessages);
                                    
                                  
                                   
                                   }
                                   $scope.$broadcast('scroll.refreshComplete');
                                   // console.log(d);
                                // $ionicLoading.hide();
                       });


       /* TwittSrv.getNewTwitts().then(function(newTwitts){
          $scope.twitts = newTwitts.concat($scope.twitts);
        }).finally(function() {
          // Stop the ion-refresher from spinning
          $scope.$broadcast('scroll.refreshComplete');
        });*/
  };
$scope.moreDataCanBeLoaded=true;
  $scope.loadMore = function(){
    console.log("loadMore====xxx====================loadMore");
    // $scope.moreDataCanBeLoaded=false;
               $scope.$broadcast('scroll.infiniteScrollComplete');
                              $scope.$broadcast('scroll.refreshComplete');
      $ionicLoading.hide();
       $scope.moreDataCanBeLoaded=false;
 //var data={"sign":"down","sendId":$scope.lastId};
/*  publicService.sendService("POST","api/all",data).
                                   then(function(d){
                                   //alert(d.length);
                                   if(d.length>0){   
                                      $scope.lastId=d[d.length-1]._id;
                                    $scope.shareMessages = $scope.shareMessages.concat(angular.copy(d));
                                    $scope.$broadcast('scroll.infiniteScrollComplete');
                                   
                                    }else{
                                      $scope.moreDataCanBeLoaded=false;
                                    }
                                  //   $scope.moreDataCanBeLoaded=false;
                                   // console.log(d);
                                // $ionicLoading.hide();
                       });*/

   /* TwittSrv.getMoreTwitts().then(function(olderTwitts){
      $scope.twitts = $scope.twitts.concat(olderTwitts);
    }).finally(function() {
      // Stop the ion-infinite-scroll from spinning
      $scope.$broadcast('scroll.infiniteScrollComplete');
    });*/
  };



});

function previewOpen(){

      var preview = document.getElementById('preview'); 
       //var preview = document.querySelector('img'); //selects the query named img
       var file    = document.querySelector('input[type=file]').files[0]; //sames as here
       var reader  = new FileReader();

       reader.onloadend = function () {
           preview.src = reader.result;
       }

       if (file) {
           reader.readAsDataURL(file); //reads the data as a URL
       } else {
           preview.src = "";
       }
  }



  window.fbAsyncInit = function () {
        FB.init({
            appId: '1628401260728929', // App ID895826577130683
            //channelUrl: 'http://localhost', // Channel File
            status: true, // check login status
            cookie: true, // enable cookies to allow the server to access the session
            xfbml: true , // parse XFBML
             oauth : true 
      
        });
    
       
    };

    // Load the SDK asynchronously
    (function (d) {
        var js, id = 'facebook-jssdk', ref = d.getElementsByTagName('script')[0];
        if (d.getElementById(id)) { return; }
        js = d.createElement('script'); js.id = id; js.async = true;
        js.src = "//connect.facebook.net/en_US/all.js";
        ref.parentNode.insertBefore(js, ref);
    } (document));

