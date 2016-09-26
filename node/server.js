var http = require('http');
var scraperjs = require('scraperjs');
scraperjs.StaticScraper.create('http://www.meilleurtaux.com/credit-immobilier/barometre-des-taux.html')
.scrape(function($) {
    return $(".tfix").map(function() {
        return normalize($(this).text());
    }).get();
})
.then(function(values) {
    console.log(values);
    for(var i=0;i<values.length/3;i++){ 
        console.log(values[i*3+2]); 
    }
    //HARDCODE
    pushValue(new Date(),7,values[11]);
    pushValue(new Date(),10,values[14]);
    pushValue(new Date(),12,values[17]);
    pushValue(new Date(),15,values[2]);
    pushValue(new Date(),20,values[5]);
    pushValue(new Date(),25,values[8]);

})
var normalize = function(text){
    return text.replace(/\n/g," ").replace(/\t/g," ").replace(/\r/g," ");
};

var pushValue = function(date,years,rate){
    console.log(date+":"+years+":"+rate);
    //TODO DATE ?
    ror_post(date,years,rate);
}
function ror_post(date,years,rate){
    var data = {
        rate: {
            date: date,
            years: years,
            rate: rate.replace(',','.')
        }
    };
    var dataStr = JSON.stringify(data);
    var options = {
        host: "slapps.fr",
        port: 80,
        path: '/hephaistos/ror/rates.json',
        method: 'POST',
        headers: {
            'Content-Length': dataStr.length,
            'Content-Type': 'application/json'
        }
    };
    var str = '';

    var req = http.request(options, function(res) {
        res.setEncoding('utf8');
        res.on('data', function(data) {
            str += data;
        });

        res.on('end', function() {
            //console.log(str);
        })

        res.on('error', function(error) {
            //console.log(error);
        })
    })
    req.on('error',function(e){
        console.log(e);
        console.log("SLerror");
    });
    req.end(dataStr);
}
