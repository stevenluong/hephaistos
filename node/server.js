var http = require('http');
var scraperjs = require('scraperjs');
var COMMON = require('./common.js');
scraperjs.StaticScraper.create('http://www.meilleurtaux.com/credit-immobilier/barometre-des-taux.html')
.scrape(function($) {
    return $(".tfix").map(function() {
        return normalize($(this).text());
    }).get();
})
.then(function(values) {
    console.log(values);
    /*
    for(var i=0;i<values.length/3;i++){ 
        console.log(values[i*3]); 
    }
    */
    //HARDCODE
    console.log(values[0]); 
    pushValue(new Date(),15,values[0]);
    console.log(values[3]); 
    pushValue(new Date(),20,values[3]);
    console.log(values[6]); 
    pushValue(new Date(),25,values[6]);

    console.log(values[9]); 
    pushValue(new Date(),7,values[9]);
    console.log(values[12]); 
    pushValue(new Date(),10,values[12]);
    console.log(values[15]); 
    pushValue(new Date(),12,values[15]);
    })
var normalize = function(text){
    return text.replace(/\n/g," ").replace(/\t/g," ").replace(/\r/g," ");
};

var pushValue = function(date,years,rate){
    console.log(date+":"+years+":"+rate);
    var data = {
        rate: {
            date: date,
            years: years,
            rate: rate.replace(',','.')
        }
    }
    COMMON.ror_post(data,"slapps.fr","/hephaistos/ror/rates.json");
}
