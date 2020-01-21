var http = require('http');
var scraperjs = require('scraperjs');
var COMMON = require('./common.js');
var tmp = scraperjs.StaticScraper.create('http://www.meilleurtaux.com/credit-immobilier/barometre-des-taux.html');
var CronJob = require('cron').CronJob;
var cronJob = new CronJob({
    cronTime: '0 0 8 * * *', 
    onTick: function() {
        process();
    }
});
cronJob.start();

var process = function(){
    tmp.scrape(function($) {
        return $(".col-ans").map(function() {
            var t = $(this);
            //console.log(t.text())
            console.log(t.text().replace(/\t/g,"").split(/\n/g));
            return normalize(t.text().replace(/\t/g,"").split(/\n/g)[3]);
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
        pushValue(new Date(),7,values[0]);
        pushValue(new Date(),10,values[1]);
        pushValue(new Date(),12,values[2]);
        pushValue(new Date(),15,values[2]);
        pushValue(new Date(),20,values[3]);
        pushValue(new Date(),25,values[4]);
        //
    })
}

var normalize = function(text){
    return text.replace(/\n/g," ").replace(/\t/g," ").replace(/\r/g," ");
};

process();

var pushValue = function(date,years,rate){
    console.log(date+":"+years+":"+rate);
    var data = {
        rate: {
            date: date,
            years: years,
            rate: rate.replace(',','.')
        }
    }
    COMMON.ror_post(data,"hephaistos_ror.slapps.fr","/rates.json");
}

