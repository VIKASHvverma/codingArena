var codeChecker=angular.module('codeChecker',[])
.controller('codeController',
	function($scope,$http){

        $scope.app={};
		$scope.app.source="";
		$scope.app.lang=-1;
        $scope.app.results=[];
        $scope.app.mode='editor';
        $scope.menu=false;
        $scope.show=function(){
            $scope.menu=!$scope.menu;
        };
        $scope.app.reset=function(){
            $scope.app.mode='editor';
            $scope.app.results=[];
        };
        var validate=function(){
            if(!$scope.app.source){
                swal({   title: "Error!",   text: "Source Code is required!",   type:'error' });
                return false;
            }
            if(jQuery('#lang').val()==-1){
                swal({   title: "Error!",   text: "Select a language!",   type:'warning' });
                return false;
            }
            return true;
        };
        $scope.check=function(){
            $scope.app.results=[];
            if(!validate())
                return;

            $scope.app.lang=parseInt(jQuery('#lang').val());
            $scope.app.mode='fetching';
            jQuery('#resultAreaNav').trigger('click');

            $http({
                url: 'check',
                method: 'GET',
                params: {
                    source: $scope.app.source,
                    lang: $scope.app.lang
                }
            }).then(function(data){

                console.log(data.data);
                var error=false;

                try{
                    if(data.data.indexOf('Error')){
                        error=true;

                    $scope.app.results=[{
                        title:'Message',
                        info:'Error!'
                    }];
                    console.log(data.data);
                    }
                }catch(err){

                }

                if(!error){
                    var result=JSON.parse(JSON.stringify(data.data));
                    $scope.app.results=[{
                        title:'Message',
                        info:result.message
                    },
                    {
                        title:'Compile Message',
                        info:result.compilemessage
                    },
                    {
                        title:'Result',
                        info:result.result
                    }
                    ];
                }

                 console.log($scope.app.results);
                 $scope.app.mode='editor';

            }).catch(function(err){
                console.log(err);
                $scope.app.results=[{
                        title:'Message',
                        info:"Error"
                    }];
                    console.log($scope.app.results);
                    $scope.app.mode='editor';
            });
        };


	}

);
