// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
//value可与你修改，constant不能修改。 value不能在provider内访问，constant可以
angular.module('server', ['ionic', 'server.controllers','server.api','server.login'])
.constant('ME', {'api':apiServiceUrl+'api/','info':{},'merchantId':"","path":apiServiceUrl})
.run(function($ionicPlatform,$rootScope,ME,$location) {
  $rootScope.ME = ME;
    $rootScope.$on('$locationChangeStart', function() {
           if(!Object.keys(ME.info).length) $location.path("/login");
  });

  $ionicPlatform.ready(function() {

    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins.Keyboard) {
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
  $stateProvider
   .state('app', {
    url: '/app',
    abstract: true,
    templateUrl: 'templates/app.html',
    controller: 'AppCtrl'
  })
  .state('login', {
    url: '/login',
        templateUrl: 'templates/login.html',
        controller: 'LoginCtrl'
   
  })
 
 .state('app.manager', {
      url: '/manager',
      views: {
        'menuContent': {
          templateUrl: 'templates/manager.html',
          controller: 'ManagerCtrl'
        }
      }
    })

.state('app.user', {
      url: '/user',
      views: {
        'menuContent': {
          templateUrl: 'templates/user.html',
          controller: 'UserCtrl'
        }
      }
    })
.state('app.role', {
      url: '/role',
      views: {
        'menuContent': {
          templateUrl: 'templates/role.html',
          controller: 'RoleCtrl'
        }
      }
    })
 
 .state('app.customer', {
      url: '/customer',
      views: {
        'menuContent': {
          templateUrl: 'templates/customer.html',
          controller: 'CustomerCtrl'
        }
      }
    })

/*     state('app.order', {
      url: '/order',
      views: {
        'menuContent': {
          templateUrl: 'templates/orders.html',
          controller: 'OrderCtrl'
        }
      }
    })*/
/*   .
  state('app.country', {
      url: '/country',
      views: {
        'menuContent': {
          templateUrl: 'templates/country.html',
          controller: 'CountryCtrl'
        }
      }
    })
   .state('app.state', {
      url: '/state',
      views: {
        'menuContent': {
          templateUrl: 'templates/state.html',
          controller: 'StateCtrl'
        }
      }
    })
   .state('app.city', {
      url: '/city',
      views: {
        'menuContent': {
          templateUrl: 'templates/city.html',
          controller: 'CityCtrl'
        }
      }
    })
   .state('app.town', {
      url: '/town',
      views: {
        'menuContent': {
          templateUrl: 'templates/town.html',
          controller: 'TownCtrl'
        }
      }
    })
   .state('app.village', {
      url: '/village',
      views: {
        'menuContent': {
          templateUrl: 'templates/village.html',
          controller: 'VillageCtrl'
        }
      }
    })*/
  ;
  
  $urlRouterProvider.otherwise('/login');

});

/*Address: 
http://www.example.com/base/path?a=b#h


$location.protocol() = http 
$location.host() = www.example.com 
$location.port() = 80 
$location.path() = /path 
$location.search() = {"a":"b"} 
$location.hash() = h */