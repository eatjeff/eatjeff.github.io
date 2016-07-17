'use strict';

angular.module('ausestateApp')
        
        .controller('IndexController', ['$scope', 'userFactory',function($scope, userFactory) {

            
        }])

        .controller('LoginController', ['$scope', 'userFactory',function($scope, userFactory) {
            
            $scope.loginuser = {email:"",password:""};

            $scope.login = function(){
                userFactory.login($scope.loginuser);
            };
        }])

        .controller('RegisterController', ['$scope','userFactory',function($scope,userFactory) {
            
            $scope.user = {firstname:"",lastname:"",email:"",password:""};

            $scope.register = function(){
                userFactory.register($scope.user);
            };

            $scope.logout = function(){
                userFactory.logout($scope.user);
            };


        }])

        .controller('AgentController', ['$scope','agentFactory',function($scope,agentFactory) {
            
            $scope.agent = {agentname:"",email:"",password:""};

            $scope.agentlogin = function(){
                agentFactory.login($scope.agent);
            };

            $scope.agentregister = function(){
                agentFactory.register($scope.agent);
            };

            $scope.agentlogout = function(){
                agentFactory.logout($scope.agent);
            };


        }])

        .controller('HeadController', ['$scope', 'propertyFactory',function($scope,propertyFactory) {
            $scope.navsearchinfo = {areacode:""};
            
            $scope.navsearch = function()
            {   
                console.log($scope.navsearchinfo);
                $scope.navproperties = propertyFactory.getAllPropertiesByAreacode().query($scope.navsearchinfo,
                function(response){
                    $scope.navproperties = response;
                },
                function(response){
                    $scope.message = response.statustext;
                });
            };
            
        }])

        .controller('SearchController', ['$scope','propertyFactory',function($scope,propertyFactory) {
            
            $scope.searchInfo = {areacode:"",purchasetype:"",state:"",propertytype:""};

            $scope.purchasetype = [{value:"buy", label:"BUY"}, {value:"rent",label:"RENT"}];

            $scope.state = [{value:"act",label:"ACT"}, 
                             {value:"nsw", label:"NSW"}, {value:"vic",label:"VIC"},
                             {value:"qld", label:"QLD"}, {value:"sa",label:"SA"},
                             {value:"wa", label:"WA"}, {value:"tas",label:"TAS"},{value:"nt",label:"NT"}];

            $scope.propertystatus = [{value:"private sale", label:"PRIVATE SALE"},{value:"open inspection", label:"OPEN INSPECTION"},{value:"auction", label:"AUCTION"}, {value:"lease",label:"LEASE"},{value:"leased",label:"LEASED"},{value:"sold",label:"SOLD"}];


            $scope.propertytype = [{value:"apartment & unit",label:"APARTMENT & UNIT"},
                                    {value:"townhouse", label:"TOWNHOUSE"}, {value:"villa",label:"VILLA"},{value:"block of units",label:"BLOCK OF UNITS"},{value:"land",label:"LAND"},{value:"rural",label:"RURAL"}];

            $scope.usage = [{value:"residential", label:"RESIDENTIAL"}, {value:"commercial",label:"COMMERCIAL"}];

            $scope.search = function()
            {
                $scope.searchedproperties = propertyFactory.getSearchProperties().query($scope.searchInfo,
                function(response){
                    $scope.searchedproperties = response;
                },
                function(response){
                    $scope.message = response.statustext;
                });
            };

            


            /*$scope.SearchResult = propertyFactory.getSearchProperties().query(
                function(response){
                    $scope.SearchResult = response;
                    $scope.showSearch = true;
                },
                function(response){
                    $scope.message = "Error: " + response.status + " " + response.statusText;
            });*/
            
        }])
        
        .controller('ImageUploadController', ['$scope','Upload','$firebase','FIREBASE_URL',function($scope,Upload,$firebase,FIREBASE_URL) {

            
            $scope.title="";

            //firebase
            var fb = new Firebase(FIREBASE_URL + '/properties' + '/normalimages');

            var images;

            //not workign as expected, images not uploaded to the one of the server folder
            $scope.submitImage = function() {
              if ($scope.formImage.file.$valid && $scope.file) {
                console.log($scope.title);
                images = $scope.file;
                $scope.upload($scope.file);
              }
            };

            $scope.upload = function (files) {
                Upload.base64DataUrl(files).then(function(base64Urls){
                    fb.push({
                        images:base64Urls
                    },function(error){
                        if(error){
                           console.log("Error:",error);
                        }
                        else{
                            console.log("Post set successfully!");
                            console.log($scope.file);
                        }
                    })
                });
            };

            
        }])

        .controller('DraftUploadController', ['$scope','Upload',function($scope,Upload) {

            
            $scope.title="";

            //not workign as expected, images not uploaded to the one of the server folder
            $scope.submitDraftImage = function() {
              if ($scope.formdraft.file.$valid && $scope.file) {
                console.log($scope.title);
                $scope.upload($scope.file);
              }
            };

           
            
            $scope.upload = function (file) {
                Upload.upload({
                    url: 'http://localhost:3000/properties/uploaddraft',
                    method: 'POST',
                    fileFormDataName: 'file',
                    data: {file: file, 'title': $scope.title}
                }).then(function (resp) {
                    console.log('Success ' + resp.config.data.file.name + 'uploaded. Response: ' + resp.data);
                }, function (resp) {
                    console.log('Error status: ' + resp.status);
                }, function (evt) {
                    var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
                    console.log('progress: ' + progressPercentage + '% ' + evt.config.data.file.name);
                });
            };

            
        }])
        .controller('VideoController', ['$scope','propertyFactory',function($scope,propertyFactory) {

            $scope.video = {title:"",propertytitle:"",videolink:""};

            $scope.uploadVideo = function(){
                console.log($scope.video);
                propertyFactory.postVideo().save({},$scope.video);
            }
            
        }])

        .controller('PropertyController', ['$scope','$stateParams','propertyFactory',function($scope,$stateParams,propertyFactory) {
            
            /*$scope.showProperties = false;
            $scope.propertyId = "";

            //pagination
            $scope.filteredproperties = [];
            $scope.currentPage = 1;
            $scope.numberPerPage = 3;
            $scope.maxSize = 5;*/

            $scope.properties = propertyFactory.getAllProperties();

            /*$scope.numPages = function(){
                return Math.ceil($scope.properties.length/$scope.numPerPage);
            };

             $scope.$watch('currentPage + numPerPage', function() {
                var begin = (($scope.currentPage - 1) * $scope.numPerPage);
                var end = begin + $scope.numPerPage;
                
                $scope.filteredproperties = $scope.properties.slice(begin, end);
                console.log($scope.properties);
                console.log($scope.filteredproperties);
            });

            $scope.residential = propertyFactory.getAllResidentials().query(
                function(response){
                    $scope.residential = response;
                    $scope.showProperties = true;
                },
                function(response){
                    $scope.message = "Error: " + response.status + " " + response.statusText;
            });

            $scope.commercial = propertyFactory.getAllCommercials().query(
                function(response){
                    $scope.commercial = response;
                    $scope.showProperties = true;
                },
                function(response){
                    $scope.message = "Error: " + response.status + " " + response.statusText;
            });

            $scope.openinspection = propertyFactory.getAllOpeninspections().query(
                function(response){
                    $scope.openinspection = response;
                    $scope.showProperties = true;
                },
                function(response){
                    $scope.message = "Error: " + response.status + " " + response.statusText;
            });

            $scope.auction = propertyFactory.getAllAuctions().query(
                function(response){
                    $scope.auctions = response;
                    $scope.showProperties = true;
                },
                function(response){
                    $scope.message = "Error: " + response.status + " " + response.statusText;
            });

            $scope.houses = propertyFactory.getAllHouses().query(
                function(response){
                    $scope.houses = response;
                    $scope.showProperties = true;
                },
                function(response){
                    $scope.message = "Error: " + response.status + " " + response.statusText;
            });

            $scope.apartments = propertyFactory.getAllApartments().query(
                function(response){
                    $scope.apartments = response;
                    $scope.showProperties = true;
                },
                function(response){
                    $scope.message = "Error: " + response.status + " " + response.statusText;
            });*/

        }])

        .controller('PropertyDetailController', ['$scope','$stateParams','Upload','$firebase','$firebaseArray','$firebaseObject','FIREBASE_URL',function($scope,$stateParams,Upload,$firebase,$firebaseArray,$firebaseObject,FIREBASE_URL) {
            //firebase
            $scope.whichproperty = $stateParams.id;

            var fb = new Firebase(FIREBASE_URL + 'properties/' + $scope.whichproperty +'/images'+ '/normalimages');

            var images;

            //not workign as expected, images not uploaded to the one of the server folder
            $scope.submitImage = function() {
              if ($scope.formImage.file.$valid && $scope.file) {
                console.log($scope.title);
                images = $scope.file;
                $scope.upload($scope.file);
              }
            };

            $scope.upload = function (files) {
                Upload.base64DataUrl(files).then(function(base64Urls){
                    fb.push({
                        images:base64Urls
                    },function(error){
                        if(error){
                           console.log("Error:",error);
                        }
                        else{
                            console.log("Post set successfully!");
                            console.log($scope.file);
                        }
                    })
                });
            };

            //add school
            $scope.school = {name:"",address:"",tel:"",email:"",website:"",schooltype:"",schoollevel:""};

            $scope.schooltype = [{value:"co-ed", label:"CO-ED"}, 
                                {value:"government",label:"GOVERNMENT"},
                                {value:"boys & co-ed",label:"BOYS & CO-ED"},
                                {value:"boys & government",label:"BOYS & GOVERNMENT"},
                                {value:"girls & co-ed",label:"GIRLS & CO-ED"},
                                {value:"girls & government",label:"GIRLS & GOVERNMENT"},
                                {value:"catholic",label:"CATHOLIC"}];

            $scope.schoollevel = [{value:"primary", label:"PRIMARY"}, 
                                {value:"secondary",label:"SECONDARY"}];

            var ref = new Firebase(FIREBASE_URL + 'properties/' + $scope.whichproperty +'/schools');

            $scope.uploadSchool = function(){
                var schoolsinfo = $firebaseArray(ref);

                var data = {
                    name:$scope.school.name,
                    address:$scope.school.address,
                    tel:$scope.school.tel,
                    email:$scope.school.email,
                    website:$scope.school.website,
                    schooltype:$scope.school.schooltype,
                    schoollevel:$scope.school.schoollevel
                };

                schoolsinfo.$add(data);

            }

            /*console.log($stateParams.id);
            $scope.showProperty = false;

            $scope.propertyDescription = {title:"", areacode:"",address:"", price:"",car:"",washroom:"",bedroom:"",propertystatus:"",description:"",purchasetype:"",state:"",propertytype:""};

            $scope.purchasetype = [{value:"buy", label:"BUY"}, {value:"rent",label:"RENT"}];

            $scope.state = [{value:"act",label:"ACT"}, 
                             {value:"nsw", label:"NSW"}, {value:"vic",label:"VIC"},
                             {value:"qld", label:"QLD"}, {value:"sa",label:"SA"},
                             {value:"wa", label:"WA"}, {value:"tas",label:"TAS"},{value:"nt",label:"NT"}];

            $scope.propertystatus = [{value:"private sale", label:"PRIVATE SALE"},{value:"open inspection", label:"OPEN INSPECTION"},{value:"auction", label:"AUCTION"}, {value:"lease",label:"LEASE"},{value:"leased",label:"LEASED"},{value:"sold",label:"SOLD"}];


            $scope.propertytype = [{value:"apartment & unit",label:"APARTMENT & UNIT"},
                                    {value:"townhouse", label:"TOWNHOUSE"}, {value:"villa",label:"VILLA"},{value:"block of units",label:"BLOCK OF UNITS"},{value:"land",label:"LAND"},{value:"rural",label:"RURAL"}];

            $scope.usage = [{value:"residential", label:"RESIDENTIAL"}, {value:"commercial",label:"COMMERCIAL"}];

            $scope.property = propertyFactory.getAllProperties().get({id:$stateParams.id})
            .$promise.then(
                    function(response){
                        $scope.property = response;
                        $scope.showProperty = true;
                    },
                    function(response) {
                        $scope.message = "Error: "+response.status + " " + response.statusText;
                    }

            );

            $scope.deleteProperty = function(){
                propertyFactory.deleteProperty().delete({id:$stateParams.id});
            }
            
            $scope.updateProperty = function(){
                console.log($scope.propertyDescription);
                propertyFactory.updateProperty().update({id:$stateParams.id},$scope.propertyDescription);
            }

            /*$scope.geometryInfo = mapFactory.getGeometry().get()
             .$promise.then(
               function(response){
                    $scope.geometryInfo = response;
                    $scope.showMap = true;
                },
                function(response){
                    $scope.message = "Error: " + response.status + " " + response.statusText;
                }
            );*/
            
            
        }])

        .controller('PropertyTypeController', ['$scope','propertyFactory',function($scope,propertyFactory) {
            
            /*$scope.showProperties = false;

            $scope.properties = propertyFactory.getAllProperties().query(
                function(response){
                    $scope.properties = response;
                    $scope.showProperties = true;
                },
                function(response){
                    $scope.message = "Error: " + response.status + " " + response.statusText;
            });*/

            

            
        }])

        .controller('PropertyUpdateController', ['$scope','propertyFactory',function($scope,propertyFactory) {
            
            /*$scope.updatePropertyDescription = {title:"", areacode:"",address:"", price:"",car:"",washroom:"",bedroom:"",propertystatus:"",description:"",updatePurchasetype:"",updateState:"",updatePropertytype:""};

            $scope.updatePurchasetype = [{value:"buy", label:"BUY"}, {value:"rent",label:"RENT"},{value:"share", label:"SHARE"}];

            $scope.updateState = [{value:"act",label:"ACT"}, 
                             {value:"nsw", label:"NSW"}, {value:"vic",label:"VIC"},
                             {value:"qld", label:"QLD"}, {value:"sa",label:"SA"},
                             {value:"wa", label:"WA"}, {value:"tas",label:"TAS"},{value:"nt",label:"NT"}];

            $scope.updatePropertystatus = [{value:"for sale", label:"FOR SALE"}, {value:"suspend",label:"SUSPEND"},{value:"sold",label:"SOLD"}];


            $scope.updatePropertytype = [{value:"apartment & unit",label:"APARTMENT & UNIT"},
                                    {value:"townhouse", label:"TOWNHOUSE"}, {value:"villa",label:"VILLA"},{value:"block of units",label:"BLOCK OF UNITS"},{value:"land",label:"LAND"},{value:"rural",label:"RURAL"}];

            //$scope.propertyDescription.price = Number($scope.propertyDescription.price.replace(/[^0-9\.]+/g,""));*/

            

        }])

        .controller('NewsController', ['$scope','newsFactory','$stateParams',function($scope,newsFactory,$stateParams) {
            
            $scope.News = {title:"", author:"",content:""};

            $scope.newssubmit = function()
            {
                console.log($scope.News);
                newsFactory.postNews($scope.News);
            }

            $scope.newslist = newsFactory.getAllNews();

            $scope.delete = function(key){
                newsFactory.deleteNews(key);
            }
            
            $scope.newsImages = newsFactory.getNewsImages();


            /*$scope.updateNews = function(){
                newsFactory.updateNews().update({id:$stateParams.id},$scope.News);
            }*/

        }])

        /*.controller('NewsImageUploadController', ['$scope','Upload',function($scope,Upload) {

            
            $scope.title="";
            
            //not workign as expected, images not uploaded to the one of the server folder
            $scope.submitNewsImage = function() {
              if ($scope.formNewsImage.file.$valid && $scope.file) {
                console.log($scope.title);
                $scope.upload($scope.file);
              }
            };

            $scope.upload = function (file) {
                Upload.upload({
                    url: 'http://localhost:3000/news/uploadimage',
                    method: 'POST',
                    fileFormDataName: 'file',
                    data: {file: file, 'title': $scope.title}
                }).then(function (resp) {
                    console.log('Success ' + resp.config.data.file.name + 'uploaded. Response: ' + resp.data);
                }, function (resp) {
                    console.log('Error status: ' + resp.status);
                }, function (evt) {
                    var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
                    console.log('progress: ' + progressPercentage + '% ' + evt.config.data.file.name);
                });
            };

            
        }])*/
        //using ng-file-load to uplaod base64 to database
        .controller('NewsImageUploadController', ['$scope','Upload','$stateParams','$firebase','$firebaseArray','FIREBASE_URL',function($scope,Upload,$firebase,$stateParams,FIREBASE_URL,$firebaseArray) {

            
            $scope.whichnews = $stateParams.id;
            console.log($scope.whichnews);

            //firebase
            var fbref = new Firebase(FIREBASE_URL + '/news'+ $scope.whichnews +"newsimages");

            var images;

            //not workign as expected, images not uploaded to the one of the server folder
            $scope.submitNewsImage = function() {
              if ($scope.formNewsImage.file.$valid && $scope.file) {
                images = $scope.file;
                $scope.upload($scope.file);
              }
            };

            $scope.upload = function (files) {
                Upload.base64DataUrl(files).then(function(base64Urls){
                    fb.push({
                        images:base64Urls
                    },function(error){
                        if(error){
                           console.log("Error:",error);
                        }
                        else{
                            console.log("Post set successfully!");
                            console.log($scope.file);
                        }
                    })
                });
            }
        }])
        /*.controller('NewsImageUploadController', ['$scope','Upload',function($scope,Upload) {

            
            $scope.title="";
            
            //not workign as expected, images not uploaded to the one of the server folder
            $scope.submitNewsImage = function() {
              if ($scope.formNewsImage.file.$valid && $scope.file) {
                console.log($scope.title);
                $scope.upload($scope.file);
              }
            };

            $scope.upload = function (file) {
                Upload.upload({
                    url: 'http://localhost:3000/news/uploadimage',
                    method: 'POST',
                    fileFormDataName: 'file',
                    data: {file: file, 'title': $scope.title}
                }).then(function (resp) {
                    console.log('Success ' + resp.config.data.file.name + 'uploaded. Response: ' + resp.data);
                }, function (resp) {
                    console.log('Error status: ' + resp.status);
                }, function (evt) {
                    var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
                    console.log('progress: ' + progressPercentage + '% ' + evt.config.data.file.name);
                });
            };

            
        }])*/
        .controller('PartnersiteController', ['$scope','sitesFactory','$stateParams',function($scope,sitesFactory,$stateParams) {
            
            $scope.partnersite = {name:"", link:""};

            $scope.sitesubmit = function()
            {
                console.log($scope.partnersite);
                sitesFactory.postSites().save({},$scope.partnersite);
            }

            $scope.sites = sitesFactory.getAllSites().query(
                function(response){
                    $scope.sites = response;
                    $scope.showProperties = true;
                },
                function(response){
                    $scope.message = "Error: " + response.status + " " + response.statusText;
            });

            /*$scope.site = sitesFactory.getSite().get({id:$stateParams.id})
            .$promise.then(
                    function(response){
                        $scope.site = response;
                        $scope.showProperty = true;
                    },
                    function(response) {
                        $scope.message = "Error: "+response.status + " " + response.statusText;
                    }

            );*/

            $scope.deleteSite = function(){
                sitesFactory.deleteSite().delete({id:$stateParams.id});
            }
            
            $scope.updateSite = function(){
                sitesFactory.updateSite().update({id:$stateParams.id},$scope.partnersite);
            }

        }])

        .controller('DevController', ['$scope','devsFactory','$stateParams',function($scope,devsFactory,$stateParams) {
            
            $scope.development = {name:"", description:""};

            $scope.devsubmit = function()
            {
                console.log($scope.development);
                devsFactory.postDevs().save({},$scope.development);
            }

            $scope.devs = devsFactory.getAllDevs().query(
                function(response){
                    $scope.devs = response;
                    $scope.showProperties = true;
                },
                function(response){
                    $scope.message = "Error: " + response.status + " " + response.statusText;
            });

            $scope.deleteDev = function(){
                devsFactory.deleteDevs().delete({id:$stateParams.id});
            }
            
            $scope.updateDev = function(){
                devsFactory.updateDevs().update({id:$stateParams.id},$scope.development);
            }



        }])

        .controller('DevImageUploadController', ['$scope','Upload',function($scope,Upload) {

            
            $scope.title="";
            
            //not workign as expected, images not uploaded to the one of the server folder
            $scope.submitDevImage = function() {
              if ($scope.formDevImage.file.$valid && $scope.file) {
                console.log($scope.title);
                $scope.upload($scope.file);
              }
            };
            
            $scope.upload = function (file) {
                Upload.upload({
                    url: 'http://localhost:3000/development/uploaddevimage',
                    method: 'POST',
                    fileFormDataName: 'file',
                    data: {file: file, 'title': $scope.title}
                }).then(function (resp) {
                    console.log('Success ' + resp.config.data.file.name + 'uploaded. Response: ' + resp.data);
                }, function (resp) {
                    console.log('Error status: ' + resp.status);
                }, function (evt) {
                    var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
                    console.log('progress: ' + progressPercentage + '% ' + evt.config.data.file.name);
                });
            };

            
        }])
        .controller('PropertyInfoController', ['$scope','propertyFactory',function($scope,propertyFactory) {
            
            $scope.propertyDescription = {title:"", areacode:"",inspectionbegindate:"",inspectionenddate:"",inspectiontime:"",auctiondate:"",auctiontime:"",address:"",size:"", price:"",car:"",washroom:"",bedroom:"",propertystatus:"",description:"",purchasetype:"",state:"",propertytype:""};

            $scope.purchasetype = [{value:"buy", label:"BUY"}, {value:"rent",label:"RENT"}];

            $scope.state = [{value:"act",label:"ACT"}, 
                             {value:"nsw", label:"NSW"}, {value:"vic",label:"VIC"},
                             {value:"qld", label:"QLD"}, {value:"sa",label:"SA"},
                             {value:"wa", label:"WA"}, {value:"tas",label:"TAS"},{value:"nt",label:"NT"}];

            $scope.propertystatus = [{value:"private sale", label:"PRIVATE SALE"},{value:"auction", label:"AUCTION"}, {value:"lease",label:"LEASE"}];


            $scope.propertytype = [{value:"apartment & unit",label:"APARTMENT & UNIT"},
                                    {value:"townhouse", label:"TOWNHOUSE"}, {value:"villa",label:"VILLA"},{value:"block of units",label:"BLOCK OF UNITS"},{value:"land",label:"LAND"},{value:"rural",label:"RURAL"}];

            $scope.usage = [{value:"residential", label:"RESIDENTIAL"}, {value:"commercial",label:"COMMERCIAL"}];

            //date configuration
           $scope.inlineOptions = {
                customClass: getDayClass,
                minDate: new Date(),
                showWeeks: true
              };

              $scope.dateOptions = {
                dateDisabled: null,
                formatYear: 'yy',
                maxDate: new Date(2020, 5, 22),
                minDate: new Date(),
                startingDay: 1
              };

              /* Disable weekend selection
              function disabled(data) {
                var date = data.date,
                  mode = data.mode;
                return mode === 'day' && (date.getDay() === 0 || date.getDay() === 6);
              }*/


              $scope.open1 = function() {
                $scope.popup1.opened = true;
              };

              $scope.open2 = function() {
                $scope.popup2.opened = true;
              };

              $scope.open3 = function() {
                $scope.popup3.opened = true;
              };

              $scope.setDate = function(year, month, day) {
                $scope.dt = new Date(year, month, day);
              };

              $scope.formats = ['dd-MMMM-yyyy', 'yyyy/MM/dd', 'dd.MM.yyyy', 'shortDate'];
              $scope.format = $scope.formats[0];
              $scope.altInputFormats = ['M!/d!/yyyy'];

              $scope.popup1 = {
                opened: false
              };

              $scope.popup2 = {
                opened: false
              };

              $scope.popup3 = {
                opened: false
              };

              var tomorrow = new Date();
              tomorrow.setDate(tomorrow.getDate() + 1);
              var afterTomorrow = new Date();
              afterTomorrow.setDate(tomorrow.getDate() + 1);
              $scope.events = [
                {
                  date: tomorrow,
                  status: 'full'
                },
                {
                  date: afterTomorrow,
                  status: 'partially'
                }
              ];

              function getDayClass(data) {
                var date = data.date,
                  mode = data.mode;
                if (mode === 'day') {
                  var dayToCheck = new Date(date).setHours(0,0,0,0);

                  for (var i = 0; i < $scope.events.length; i++) {
                    var currentDay = new Date($scope.events[i].date).setHours(0,0,0,0);

                    if (dayToCheck === currentDay) {
                      return $scope.events[i].status;
                    }
                  }
                }

                return '';
              }
            

            $scope.submitPropertyInfo = function()
            {
                console.log($scope.propertyDescription);
                propertyFactory.postProperty($scope.propertyDescription);
            }

        }])
        .controller('FeedbackController', ['$scope','feedbackFactory',function($scope,feedbackFactory) {
            
            $scope.feedback = {mychannel:"", firstName:"", lastName:"",telnumber:"",agree:false, email:"",comments:"" };

            $scope.channels = [{value:"tel", label:"Tel."}, {value:"Email",label:"Email"}];

            $scope.sendFeedback = function(){

                feedbackFactory.postFeedback().save({},$scope.feedback);
            }
        }])

        .controller('AgentFeedbackController', ['$scope','feedbackFactory',function($scope,feedbackFactory) {
            
            $scope.agentfeedback = {mychannel:"", firstName:"", lastName:"",telnumber:"",agree:false, email:"",comments:"" };

            $scope.agentchannels = [{value:"tel", label:"Tel."}, {value:"Email",label:"Email"}];

            $scope.sendAgentFeedback = function(){

                feedbackFactory.postEnquiry().save({},$scope.agentfeedback);
            }
        }]);
