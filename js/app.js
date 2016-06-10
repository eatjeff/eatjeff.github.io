'use strict';

angular.module('ausestateApp', ['ui.bootstrap','ui.router','firebase','ngResource', 'ngFileUpload'])

.constant('FIREBASE_URL','https://ausestate.firebaseio.com/')

.run(['$rootScope','$state',function($rootScope,$state){
    $rootScope.$on('$stateChangeError ',
        function(event, next, previous, error){
            if(error === "AUTH_REQUIRED"){
                $rootScope.message = "Sorry, you must log in to access that page";
                $state.go('app.login');
        }
    });
}])
.run(['$rootScope','$state',function($rootScope,$state){
    $rootScope.$on('$stateChangeError ',
        function(event, next, previous, error){
            if(error === "AUTH_REQUIRED"){
                $rootScope.message = "Sorry, agent must log in to access that page";
                $state.go('app.agentLogin');
        }
    });
}])
.config(function($stateProvider, $urlRouterProvider) { 
  $stateProvider
             // route for the home page
            .state('app', {
                url:'/',
                views: {
                    'header': {
                        templateUrl : 'views/header.html'
                    },
                    'content': {
                        templateUrl : 'views/home.html'
                    },
                    'footer': {
                        templateUrl : 'views/footer.html'
                    }
                }
            })
                    // route for the aboutus page
            .state('app.login', {
                url:'login',
                views: {
                    'content@': {
                        templateUrl: 'views/login.html',
                        controller  : 'LoginController'
                   }
                }
            })
                    // route for the contactus page
            .state('app.register', {
                url:'register',
                views: {
                    'content@': {
                        templateUrl : 'views/register.html',
                        controller  : 'RegisterController'
                     }
                },
                resolve:{
                    "currentAuth":['userFactory',function(userFactory){
                       return userFactory.requireAuth();
                    }]
                }
            })

            // route for the menu page
            .state('app.loginresult', {
                url: 'loginresult',
                views: {
                    'content@': {
                        templateUrl : 'views/loginresult.html',
                    }
                },
                resolve:{
                    "currentAuth":['userFactory',function(userFactory){
                       return userFactory.requireAuth();
                    }]
                }
            })
            
            .state('app.createAgent', {
                url: 'createAgent',
                views: {
                    'content@': {
                        templateUrl : 'views/createAgent.html',
                         controller  : 'AgentController'
                    }
                },
                resolve:{
                    "currentAuth":['userFactory',function(userFactory){
                       return userFactory.requireAuth();
                    }]
                }
            })

            .state('app.agentLogin', {
                url: 'agentLogin',
                views: {
                    'content@': {
                        templateUrl : 'views/agentLogin.html',
                         controller  : 'AgentController'
                    }
                }

            })
            .state('app.agentLoginResult', {
                url: 'agentLoginResult',
                views: {
                    'content@': {
                        templateUrl : 'views/agentLoginResult.html',
                         controller  : 'AgentController'
                    }
                },
                resolve:{
                    "agentAuth":['agentFactory',function(agentFactory){
                       return agentFactory.requireAuth();
                    }]
                }
            })

            .state('app.homesearch', {
                url:'homesearch',
                views: {
                    'content@': {
                        templateUrl : 'views/homesearch.html',
                        controller  : 'SearchController'
                     }
                }
            })
            .state('app.navsearch', {
                url:'navsearch',
                views: {
                    'content@': {
                        templateUrl : 'views/navsearch.html',
                        controller  : 'HeadController'
                     }
                }
            })

            .state('app.aboutus', {
                url:'aboutus',
                views: {
                    'content@': {
                        templateUrl : 'views/aboutus.html'
                     }
                }
            })
            .state('app.agentprofile', {
                url:'agentprofile',
                views: {
                    'content@': {
                        templateUrl : 'views/agentprofile.html'
                     }
                }
            })
            .state('app.houses', {
                url:'houses',
                views: {
                    'content@': {
                        templateUrl : 'views/houses.html',
                        controller  : 'PropertyController'
                     }
                }
            })
            .state('app.apartments', {
                url:'apartments',
                views: {
                    'content@': {
                        templateUrl : 'views/apartments.html',
                        controller  : 'PropertyController'
                     }
                }
            })
            .state('app.newdevelopments', {
                url:'newdevelopments',
                views: {
                    'content@': {
                        templateUrl : 'views/newdevelopments.html',
                        controller  : 'PropertyController'
                     }
                },
                resolve:{
                    "agentAuth":['agentFactory',function(agentFactory){
                       return agentFactory.requireAuth();
                    }]
                }
            })
            .state('app.adminpropertylist', {
                url:'adminpropertylist',
                views: {
                    'content@': {
                        templateUrl : 'views/adminpropertylist.html',
                        controller  : 'PropertyController'
                     }
                },
                resolve:{
                    "currentAuth":['userFactory',function(userFactory){
                       return userFactory.requireAuth();
                    }]
                }
            })
            .state('app.propertylist', {
                url:'propertylist',
                views: {
                    'content@': {
                        templateUrl : 'views/propertylist.html',
                        controller  : 'PropertyController'
                     }
                }
            })

            .state('app.propertydetail', {
                url:'propertylist/:id',
                views: {
                    'content@': {
                        templateUrl : 'views/propertydetail.html',
                        controller  : 'PropertyDetailController'
                     }
                }
            })

            .state('app.adminpropertydetail', {
                url:'adminpropertylist/:id',
                views: {
                    'content@': {
                        templateUrl : 'views/adminpropertydetail.html',
                        controller  : 'PropertyDetailController'
                     }
                },
                resolve:{
                    "currentAuth":['userFactory',function(userFactory){
                       return userFactory.requireAuth();
                    }]
                }
            })

            .state('app.adminuploadproperty', {
                url:'adminuploadproperty',
                views: {
                    'content@': {
                        templateUrl : 'views/adminuploadproperty.html',
                        controller  : 'PropertyController'
                     }
                },
                resolve:{
                    "currentAuth":['userFactory',function(userFactory){
                       return userFactory.requireAuth();
                    }]
                }
            })
            .state('app.news', {
                url:'news',
                views: {
                    'content@': {
                        templateUrl : 'views/news.html',
                        controller  : 'NewsController'
                     }
                }
            })
            .state('app.adminnewslist', {
                url:'adminnewslist',
                views: {
                    'content@': {
                        templateUrl : 'views/adminnewslist.html',
                        controller  : 'NewsController'
                     }
                }
            })
            .state('app.adminnewsdetail', {
                url:'adminnewslist/:id',
                views: {
                    'content@': {
                        templateUrl : 'views/adminnewsdetail.html',
                        controller  : 'NewsController'
                     }
                }
            })
            .state('app.adminsiteslist', {
                url:'adminsiteslist',
                views: {
                    'content@': {
                        templateUrl : 'views/adminsiteslist.html',
                        controller  : 'PartnersiteController'
                     }
                }
            })
            .state('app.adminsitedetail', {
                url:'adminsiteslist/:id',
                views: {
                    'content@': {
                        templateUrl : 'views/adminsitedetail.html',
                        controller  : 'PartnersiteController'
                     }
                }
            })
            .state('app.admindevlist', {
                url:'admindevlist',
                views: {
                    'content@': {
                        templateUrl : 'views/admindevlist.html',
                        controller  : 'DevController'
                     }
                }
            })
            .state('app.admindevdetail', {
                url:'admindevlist/:id',
                views: {
                    'content@': {
                        templateUrl : 'views/admindevdetail.html',
                        controller  : 'DevController'
                     }
                }
            })
            .state('app.adminuploadnews', {
                url:'adminuploadnews',
                views: {
                    'content@': {
                        templateUrl : 'views/adminuploadnews.html',
                        controller  : 'NewsController'
                     }
                },
                resolve:{
                    "currentAuth":['userFactory',function(userFactory){
                       return userFactory.requireAuth();
                    }]
                }
            })
            .state('app.adminuploadpartnersites', {
                url:'adminuploadpartnersites',
                views: {
                    'content@': {
                        templateUrl : 'views/adminuploadpartnersites.html',
                        controller  : 'PartnersiteController'
                     }
                },
                resolve:{
                    "currentAuth":['userFactory',function(userFactory){
                       return userFactory.requireAuth();
                    }]
                }
            })
            .state('app.adminuploadnewdevs', {
                url:'adminuploadnewdevs',
                views: {
                    'content@': {
                        templateUrl : 'views/adminuploadnewdevs.html',
                        controller  : 'DevController'
                     }
                },
                resolve:{
                    "currentAuth":['userFactory',function(userFactory){
                       return userFactory.requireAuth();
                    }]
                }
            })
            .state('app.residential', {
                url:'residential',
                views: {
                    'content@': {
                        templateUrl : 'views/residential.html',
                        controller  : 'PropertyController'
                     }
                }
            })
            .state('app.commercial', {
                url:'commercial',
                views: {
                    'content@': {
                        templateUrl : 'views/commercial.html',
                        controller  : 'PropertyController'
                     }
                }
            })
            .state('app.openinspection', {
                url:'openinspection',
                views: {
                    'content@': {
                        templateUrl : 'views/openinspection.html',
                        controller  : 'PropertyController'
                     }
                }
            })
            .state('app.auction', {
                url:'auction',
                views: {
                    'content@': {
                        templateUrl : 'views/auction.html',
                        controller  : 'PropertyController'
                     }
                }
            })
            .state('app.contactus', {
                url:'contactus',
                views: {
                    'content@': {
                        templateUrl: 'views/contactus.html',
                        controller: 'FeedbackController'
                   }
                }
            })

            .state('app.agentcontact', {
                url:'agentcontact',
                views: {
                    'content@': {
                        templateUrl: 'views/agentcontact.html',
                        controller: 'AgentFeedbackController'
                   }
                }
            })

            
            $urlRouterProvider.otherwise('/');
    })
