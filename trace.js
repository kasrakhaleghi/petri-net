const fs = require('fs-extra');
const xml2js = require('xml2js');
const parser = new xml2js.Parser();

const path = "trace.xml";

// خواندن یک 
// trace
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


var activities = myParser(strXML)

// Mapping 
activitiesMap = activities.map(item => {
    switch (item) {
        case 'In Progress':
            return 'A'

        case 'Wait - User':
            return 'B'

        case 'In Call':
            return 'C'
    
        case 'Resolved':
            return 'D'
                
        case 'Closed':
            return 'E';
    }
})

// پاک کردن آیتم هایی که 
// undefiend
// هستند
activitiesMapWithFilter = activitiesMap.filter(item=>{
    if (item !== undefined)
        return item
})
 
// حذف عضوهای تکراری
let uniqueActivities = [...new Set(activitiesMapWithFilter)];
console.log(uniqueActivities);

// ساختن مجموعه زوج مرتب
let pairs = []
for (let index = 0; index < uniqueActivities.length - 1 ; index++) {
    const element = uniqueActivities[index];
    const nextElement = uniqueActivities[index+1];
    pairs.push(`(${element}, ${nextElement})`)
    
}

// نمایش زوج های مرتب
console.log(pairs);