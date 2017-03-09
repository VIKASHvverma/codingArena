var codeChecker=angular.module('codeChecker',[])
.controller('codeController',
	function($scope,$http){
		$scope.nav='mdi-navigation-menu';
    $scope.app={};
		$scope.app.source="";
		$scope.app.lang=-1;
        $scope.app.results=[];
        $scope.app.mode='editor';
        $scope.menu=false;
        $scope.show=function(){
            $scope.menu=!$scope.menu;
						$scope.nav=$scope.nav=='mdi-navigation-arrow-forward'?'mdi-navigation-menu':'mdi-navigation-arrow-forward';
        };
		$scope.showEnv=function(){
			//swal({   title: "Instructions!",    });
			alertify.alert( $('#environment').html());
		};
		$scope.showSample=function(){
			alertify.alert( $('#sample').html());
		};
		$scope.showProfile=function(){
			alertify.alert( $('#profile').html());
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
                method: 'POST',
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

).controller('instructionController',function($scope){
	  $('ul.tabs').tabs();
		$scope.instructions={};
		$scope.instructions.environment=[
			{
				lang:'C',
				version:'gcc 4.9.2, C99 standard'
			},{
				lang:'C++',
				version:'g++ 4.9.2, C++11 standard'
			},{
				lang:'Java',
				version:'Sun Java 1.7.0_55'
			},{
				lang:'C#',
				version:'Mono C# compiler 3.2.8.0 .NET 4.0 CLR'
			},{
				lang:'PHP',
				version:'PHP 5.5.9'
			},{
				lang:'Python',
				version:'Python 2.7.6'
			},{
				lang:'Perl',
				version:'Perl (v5.18.2)'
			},{
                lang:'Go',
                version:'Go (v1.6)'
            }];
			$scope.instructions.statement="Print 'hello world' 5 times."
			$scope.instructions.samples=[
				{
					lang:'C',
					code:''
				},{
					lang:'C',
					code:''
				}
			];
			$scope.sample=$scope.instructions.samples[1];
			$scope.lang='c';

			$scope.getLang=function(name){
				$scope.lang=name;
				console.log(name);
			};
});
