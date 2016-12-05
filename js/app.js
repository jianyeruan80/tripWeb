// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'starter.controllers', 'starter.services',"ngWaterfall","ui.router"])
.constant('ME', {'api':apiServiceUrl+'/api/','info':{},'merchantId':''})
.run(function($ionicPlatform,$rootScope,ME) {
  $rootScope.ME = ME;
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
})

.config(function($stateProvider, $urlRouterProvider,$locationProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider

  // setup an abstract state for the tabs directive
    .state('home', {
    url: '/home',
    abstract: true,
    templateUrl: 'templates/tabs.html',
    controller:"AppCtrl"
  })

  // Each tab has its own nav history stack:

  .state('home.special', {
    url: '/special',
    views: {
      'menuContent': {
        templateUrl: 'templates/tab-special.html',
        controller: 'SpecialCtrl'
      }
    }
  })

  .state('home.rentcar', {
      url: '/rentcar',
      views: {
        'menuContent': {
          templateUrl: 'templates/tab-rentcar.html',
          controller: 'RentcarCtrl'
        }
      }
    })
  .state('home.feature', {
      url: '/feature',
      views: {
        'menuContent': {
          templateUrl: 'templates/tab-feature.html',
          controller: 'FeatureCtrl'
        }
      }
    })
  .state('index', {
    url: '/index',
        templateUrl: 'templates/home.html',
        controller: 'HomeCtrl'
   
  })
  .state('home.customer', {
    url: '/customer',
    views: {
      'menuContent': {
        templateUrl: 'templates/tab-customer.html',
        controller: 'CustomerCtrl'
      }
    }
  })
    .state('admin', {
    url: '/admin',
        template: '<div></div>',
        controller: function(){
           window.location.href = '/admin/'; 
        }
   
  })


  // if none of the above states i matched, use this as the fallback
  $urlRouterProvider.otherwise('/index');
 $locationProvider.html5Mode(true);
});
