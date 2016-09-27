//prod
var serverSocket = "slapps.fr:3030";
//dev
//var serverSocket = "localhost:3030";
'use strict';

/* Controllers */

var rssReaderControllers = angular.module('rssReaderControllers', []);
rssReaderControllers.controller('MainCtrl', ['$scope','Rates',
        function($scope, Rates) {
            // CHART
            //$scope.labels = ["January", "February", "March", "April", "May", "June", "July"];
            $scope.series = ['25 ans','20 ans','15 ans'];
            $scope.labels = []
            $scope.data = [[],[],[]]
            $scope.datasetOverride = [{ fill : false },{ fill : false },{ fill : false }];
            Rates.getRates().success(function(response){
                response.forEach(function(rate){
                    if(rate.years==25){
                        console.log(rate);
                        $scope.labels.push(rate.date);
                        $scope.data[0].push(rate.rate);
                    }
                    if(rate.years==20){
                        console.log(rate);
                        $scope.data[1].push(rate.rate);
                    }

                    if(rate.years==15){
                        console.log(rate);
                        $scope.data[2].push(rate.rate);
                    }

                })
            });
            $scope.onClick = function (points, evt) {
                console.log(points, evt);
            };
            //Default values
            $scope.defaultTotalValue = 223100;
            $scope.defaultInsuranceRate = 0.22;
            $scope.defaultRate = 2.67;
            $scope.defaultYears = 25;

            $scope.monthlyCost = 0;
            $scope.totalCost = 0;
            $scope.monthlyTotalCost = 0;
            //$scope.loanCost = 0;
            //$scope.insuranceCost = 0;
            $scope.costRate = 0;

            $scope.updateAA=function(){
                if($scope.insuranceRate==null)
                    $scope.insuranceRate= $scope.defaultInsuranceRate;
                if($scope.totalValue==null)
                    $scope.totalValue = $scope.defaultTotalValue;
                if($scope.rate==null)
                    $scope.rate = $scope.defaultRate;
                if($scope.years==null)
                    $scope.years= $scope.defaultYears;
                var TODO = "?";
                var monthlyRate = $scope.rate/12/100;
                var months = $scope.years*12;
                if($scope.rate!=0)
                    $scope.monthlyCost=parseInt(($scope.totalValue*monthlyRate)/(1-Math.pow(1+monthlyRate,-months)));
                else
                    $scope.monthlyCost=parseInt($scope.totalValue/months);

                $scope.totalCost=parseInt($scope.monthlyCost*months-$scope.totalValue);
                $scope.monthlyTotalCost=parseInt($scope.totalCost/months);
                $scope.loanCost=TODO;
                $scope.insuranceCost=TODO;
                $scope.costRate=parseInt(($scope.totalCost)/($scope.totalValue)*100);
            };

        }]);
