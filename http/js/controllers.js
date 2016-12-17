//prod
//var serverSocket = "slapps.fr:3030";
//dev
//var serverSocket = "localhost:3030";
'use strict';

/* Controllers */

var mainControllers = angular.module('mainControllers', []);
mainControllers.controller('MainCtrl', ['$scope','Rates','Simulation',
        function($scope, Rates,Simulation) {
            $scope.simulations= [];
            $scope.simulation= {};
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

            $scope.simulation.monthlyCost = 0;
            $scope.simulation.totalCost = 0;
            $scope.simulation.monthlyTotalCost = 0;
            //$scope.loanCost = 0;
            //$scope.insuranceCost = 0;
            $scope.simulation.costRate = 0;

            var simulate=function(){
                var TODO = "?";
                if($scope.simulation.insuranceRate==null)
                    $scope.simulation.insuranceRate= $scope.defaultInsuranceRate;
                if($scope.simulation.totalValue==null)
                    $scope.simulation.totalValue = $scope.defaultTotalValue;
                var totalValue = $scope.simulation.totalValue;
                //Rate processing
                var rate = $scope.simulation.rate;
                if(rate==null)
                    rate = $scope.defaultRate;
                if(isNaN(rate)){
                    rate = rate.replace(",",".");
                }
                $scope.simulation.rate = rate;
                var monthlyRate = rate/12/100;
                if($scope.simulation.years==null)
                    $scope.simulation.years= $scope.defaultYears;
                var months = $scope.simulation.years*12;
                if(rate!=0)
                    $scope.simulation.monthlyCost=parseInt((totalValue*monthlyRate)/(1-Math.pow(1+monthlyRate,-months)));
                else
                    $scope.simulation.monthlyCost=parseInt(totalValue/months);
                $scope.simulation.totalCost=parseInt($scope.simulation.monthlyCost*months-totalValue);
                var totalCost = $scope.simulation.totalCost;
                $scope.simulation.monthlyTotalCost=parseInt(totalCost/months);
                $scope.simulation.loanCost=TODO;
                $scope.simulation.insuranceCost=TODO;
                $scope.simulation.costRate=parseInt(totalCost/totalValue*100);
            };
            simulate();
            $scope.simulateAndTrace = function(){
                simulate();
                var s = {
                    at: new Date(),
                    totalValue: $scope.simulation.totalValue,
                    rate: $scope.simulation.rate,
                    years: $scope.simulation.years,
                    monthlyCost: $scope.simulation.monthlyCost,
                    totalCost: $scope.simulation.totalCost,
                    monthlytotalCost: $scope.simulation.monthlyTotalCost,
                    costRate: $scope.simulation.costRate
                };
                if(isValid(s)){
                    $scope.simulations.push(s)
                    var simulation = new Simulation(s);
                    Simulation.save(simulation);
                }
            }
        }]);
var isValid = function(simulation){
    if(isNaN(simulation.totalCost)){
        console.log("NAN");
        return false;
    }
    return true;
}
