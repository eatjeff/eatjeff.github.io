'use strict';

angular.module('ausestateApp')
        .constant("baseURL","http://localhost:3000/")
        .service('userFactory', ['$rootScope','$state','$firebaseAuth','$firebaseObject','FIREBASE_URL', function($rootScope,$state,$firebaseAuth,$firebaseObject,FIREBASE_URL) {
            var ref = new Firebase(FIREBASE_URL);
            var auth = $firebaseAuth(ref);

            auth.$onAuth(function(authUser){
                if(authUser){
                    var userRef = new Firebase(FIREBASE_URL + 'users/' + authUser.uid);
                    var userObj = $firebaseObject(userRef);
                    $rootScope.currentUser = userObj;
                }
                else{
                    $rootScope.currentUser = "";
                }
            });
            
            var myObject = {
                login:function(loginuser){
                    auth.$authWithPassword({
                        email:loginuser.email,
                        password:loginuser.password
                    }).then(function(){
                        $state.go('app.loginresult');
                    }).catch(function(error){
                        $rootScope.message = error.message;  
                    }); 
                },
                logout:function(){
                    return auth.$unauth();
                },
                requireAuth:function(){
                    return auth.$requireAuth();
                },

                register:function(user){
                    auth.$createUser({
                    email:user.email,
                    password:user.password
                    }).then(function(regUser){
                        var regRef = new Firebase(FIREBASE_URL + "users")
                        .child(regUser.uid).set({
                            date: Firebase.ServerValue.TIMESTAMP,
                            regUser:regUser.uid,
                            firstname:user.firstname,
                            lastname:user.lastname,
                            email:user.email
                        });

                        myObject.login(user);

                    }).catch(function(error){
                        $rootScope.message = error.message;
                    });
                }
            };

            return myObject;
        }])

        .service('agentFactory', ['$rootScope','$state','$firebaseAuth','$firebaseObject','FIREBASE_URL', function($rootScope,$state,$firebaseAuth,$firebaseObject,FIREBASE_URL) {
            var ref = new Firebase(FIREBASE_URL);
            var auth = $firebaseAuth(ref);

            auth.$onAuth(function(authAgent){
                if(authAgent){
                    var agentRef = new Firebase(FIREBASE_URL + 'agents/' + authAgent.uid);
                    var agentObj = $firebaseObject(agentRef);
                    $rootScope.currentAgent = agentObj;
                }
                else{
                    $rootScope.currentAgent = "";
                }
            });
            
                var myAgentObject = {
                login:function(agent){
                    auth.$authWithPassword({
                        email:agent.email,
                        password:agent.password
                    }).then(function(){
                        $state.go('app.agentLoginResult');
                    }).catch(function(error){
                        $rootScope.message = error.message;  
                    }); 
                },
                logout:function(){
                    return auth.$unauth();
                },
                requireAuth:function(){
                    return auth.$requireAuth();
                },
                register:function(agent){
                    auth.$createUser({
                    email:agent.email,
                    password:agent.password
                    }).then(function(regAgent){
                        var regRef = new Firebase(FIREBASE_URL + "agents")
                        .child(regAgent.uid).set({
                            date: Firebase.ServerValue.TIMESTAMP,
                            regAgent:regAgent.uid,
                            agentname:agent.agentname,
                            email:agent.email
                        });

                        myAgentObject.login(agent);
                        
                    }).catch(function(error){
                        $rootScope.message = error.message;
                    });
                }
            };

            return myAgentObject;
        }])

        .service('propertyFactory', ['$resource','baseURL', function($resource,baseURL) {
    
                
                this.getAllProperties = function(){
                    
                    return $resource(baseURL + "properties/:id",null,{'get':{method:'GET'}});
                    
                };


                this.getAllPropertiesByAreacode = function(){
                    
                    return $resource(baseURL + "properties/navsearch",null,{'query':{method:'GET', isArray:true}});
                    
                };

                this.getAllResidentials = function(){
                    
                    return $resource(baseURL + "properties/residential",null,{'get':{method:'GET'}});
                    
                };

                this.getAllCommercials = function(){
                    
                    return $resource(baseURL + "properties/commercial",null,{'get':{method:'GET'}});
                    
                };

                this.getAllOpeninspections = function(){
                    
                    return $resource(baseURL + "properties/inspection",null,{'get':{method:'GET'}});
                    
                };

                this.getAllAuctions = function(){
                    
                    return $resource(baseURL + "properties/auction",null,{'get':{method:'GET'}});
                    
                };

                this.getAllHouses = function(){
                    
                    return $resource(baseURL + "properties/house",null,{'get':{method:'GET'}});
                    
                };

                this.getAllApartments = function(){
                    
                    return $resource(baseURL + "properties/apartment",null,{'get':{method:'GET'}});
                    
                };

                //search for properties with certain constraints
                this.getSearchProperties = function(){
                    
                    return $resource(baseURL + "properties/query",null,{'query':{method:'GET', isArray:true}});
                    
                };

                this.postProperty = function(){
                    return $resource(baseURL + "properties",null,{'save':{method:'POST'}});
                };

                this.postVideo = function(){
                    return $resource(baseURL + "properties/video",null,{'save':{method:'POST'}});
                };

                this.postSchool = function(){
                    return $resource(baseURL + "properties/school",null,{'save':{method:'POST'}});
                };

                this.updateProperty = function(){
                    return $resource(baseURL + "properties/:id",null,{'update':{method:'PUT'}});
                };

                this.deleteProperty = function(){
                    return $resource(baseURL + "properties/:id",null,{'delete':{method:'DELETE'}});
                }


        }])
        .service('newsFactory', ['$resource','baseURL', function($resource,baseURL) {
    
                
                this.getAllNews = function(){
                    
                    return $resource(baseURL + "news/:id",null,{'get':{method:'GET',isArray:true}});
                    
                };

                this.postNews = function(){
                    return $resource(baseURL + "news",null,{'save':{method:'POST'}});
                };

                this.updateNews = function(){
                    return $resource(baseURL + "news/:id",null,{'update':{method:'PUT'}});
                };

                this.deleteNews = function(){
                    return $resource(baseURL + "news/:id",null,{'delete':{method:'DELETE'}});
                };

               


        }])
        .service('devsFactory', ['$resource','baseURL', function($resource,baseURL) {
    
                
                this.getAllDevs = function(){
                    
                    return $resource(baseURL + "development",null,{'get':{method:'GET'}});
                    
                };

                this.postDevs = function(){
                    return $resource(baseURL + "development",null,{'save':{method:'POST'}});
                };

                this.deleteAllDevs = function(){
                    return $resource(baseURL + "development",null,{'delete':{method:'DELETE'}});
                };

                 this.updateDevs = function(){
                    return $resource(baseURL + "development/:id",null,{'update':{method:'PUT'}});
                };

                this.deleteDevs = function(){
                    return $resource(baseURL + "development/:id",null,{'delete':{method:'DELETE'}});
                };



        }])
        .service('sitesFactory', ['$resource','baseURL', function($resource,baseURL) {
    
                
                

                this.getAllSites = function(){
                    
                    return $resource(baseURL + "partnersite",null,{'get':{method:'GET'}});
                    
                };

                this.postSites = function(){
                    return $resource(baseURL + "partnersite",null,{'save':{method:'POST'}});
                };

                this.deleteSites = function(){
                    return $resource(baseURL + "partnersite",null,{'delete':{method:'DELETE'}});
                };

                this.updateSite = function(){
                    return $resource(baseURL + "partnersite/:id",null,{'update':{method:'PUT'}});
                };

                this.deleteSite = function(){
                    return $resource(baseURL + "partnersite/:id",null,{'delete':{method:'DELETE'}});
                };

               


        }])

        .service('feedbackFactory', ['$resource','baseURL', function($resource,baseURL) {
    
    
            this.postFeedback = function(){
                return $resource(baseURL + "emails",null,{'save':{method:'POST'}});
                                            
            };

            //send staff a email
            this.postEnquiry = function(){
                return $resource(baseURL + "agent/enquiry",null,{'save':{method:'POST'}});
                                            
            };


        }]);