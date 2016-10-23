//prod
var serverSocket = "slapps.fr:3030";
//dev
//var serverSocket = "localhost:3030";
'use strict';

/* Controllers */

var mainControllers = angular.module('mainControllers', []);
mainControllers.controller('MainCtrl', ['$scope','Rates','Simulation',
        function($scope, Rates,Simulation) {
            // CHART
            //$scope.labels = ["January", "February", "March", "April", "May", "June", "July"];
            $scope.series = ['25 ans','20 ans','15 ans','12 ans','10 ans', '7 ans'];
            $scope.labels = [];
            $scope.data = [[],[],[],[],[],[]];
            $scope.todayRate = [];
            $scope.datasetOverride = [{ fill : false },{ fill : false },{ fill : false },{ fill : false },{ fill : false },{ fill : false }];
            Rates.getRates().success(function(response){
                response.forEach(function(rate){
                    if(rate.years==25){
                        $scope.labels.push(rate.date);
                        $scope.data[0].push(rate.rate);
                        $scope.todayRate[0]=rate.rate;
                    }
                    if(rate.years==20){
                        $scope.data[1].push(rate.rate);
                        $scope.todayRate[1]=rate.rate;
                    }

                    if(rate.years==15){
                        $scope.data[2].push(rate.rate);
                        $scope.todayRate[2]=rate.rate;
                    }

                    if(rate.years==12){
                        $scope.data[3].push(rate.rate);
                        $scope.todayRate[3]=rate.rate;
                    }

                    if(rate.years==10){
                        $scope.data[4].push(rate.rate);
                        $scope.todayRate[4]=rate.rate;
                    }
                    if(rate.years==7){
                        $scope.data[5].push(rate.rate);
                        $scope.todayRate[5]=rate.rate;
                    }

                })
                //var size = $scope.data[0].length;
                //console.log($scope.data[5][size-1])
            });
            $scope.onClick = function (points, evt) {
                console.log(points, evt);
            };
            //Default values
            $scope.defaultTotalValue = 223100;
            $scope.defaultInsuranceRate = 0.22;
            $scope.defaultRate = 2.15;
            $scope.defaultYears = 25;

            $scope.monthlyCost = 0;
            $scope.totalCost = 0;
            $scope.monthlyTotalCost = 0;
            //$scope.loanCost = 0;
            //$scope.insuranceCost = 0;
            $scope.costRate = 0;

            var simulate=function(){
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
            simulate();
            $scope.simulateAndTrace = function(){
                simulate();
                var simulation = new Simulation({
                    at: new Date(),
                    totalValue: $scope.totalValue,
                    rate: $scope.rate,
                    years: $scope.years,
                    monthlyCost: $scope.monthlyCost,
                    totalCost: $scope.totalCost,
                    monthlytotalCost: $scope.monthlyTotalCost,
                    costRate: $scope.costRate
                });
                console.log(simulation);
                Simulation.save(simulation);
            }
        }]);
