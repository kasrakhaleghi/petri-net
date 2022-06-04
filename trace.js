const fs = require('fs-extra');
const xml2js = require('xml2js');
const parser = new xml2js.Parser();

const path = "trace.xml";

var strXML = fs.readFileSync(path).toString()
 

function myParser(data) {

    var arr =[]

    parser.parseString(data, function(err, res) {
        res.trace.event.forEach(element => { 
            element.string.forEach(element => { 
               for(key in element) { 
                   if(element.hasOwnProperty(key)) { 
                       var transition = element[key]; 
                       if(transition['key']=='lifecycle:transition'){
                            arr.push(transition['value'])
                       }
                   }
               }
            });
        }); 
    });
    return arr
}

console.log(myParser(strXML));

 