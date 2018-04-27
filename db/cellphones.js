
let map = new Map();

map.set('IPhone 8',{'model':'IPhone 8','brand':'Apple','price':15000.0,'release':2017});
map.set('Galaxy S8 Plus',{'model':'Galaxy S8 Plus','brand':'Samsung','price':18000.0,'release':2017});
map.set('Galaxy S8',{'model':'Galaxy S8','brand':'Samsung','price':14000.0,'release':2017});
map.set('Alcatel',{'model':'Alcatel','brand':'Alcatel','price':15000.0,'release':2017});
map.set('3320a',{'model':'3320a','brand':'Nokia','price':1000.0,'release':1999});

// // let XMLize = new XMLSerializer();
// map.forEach((element,_,set_) => {
//     process.stdout.write(JSON.stringify(element)+'\n');
//     // process.stdout.write(XMLize.serializeToString(element)+'\n');
// });
// process.stdout.write(map.keys.;
// map.set('3320a','hola');
// process.stdout.write(JSON.stringify(Array.from(map.values())));
module.exports.phones = map;
module.exports.getAll = () => {
    return JSON.stringify(Array.from(map.values()))
};