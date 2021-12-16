const seeds = require('./seeds.json');
const Desktop = require('./models/desktop');
const Laptop = require('./models/laptop');
const Radius = require('./models/radius');
const Enclosure = require('./models/enclosure');

plantSeeds = async () => {
    const desktops = seeds['desktop_encoders'];
    const laptops = seeds['laptop_encoders'];
    const radius = seeds['radius_encoders']; 
    const enclosures = seeds['enclosure_encoders'];

    const datasets = [desktops, laptops, radius, enclosures];
    const models = [Desktop, Laptop, Radius, Enclosure]

    try{
        // Wipe out the previous data in the table
        for(let i = 0; i < models.length; i++) {
            var m = models[i]
            m.deleteMany({});
        }

        datasets.forEach(set => {
            set.forEach( (s, index) => {
                console.log(models[index])
            })
        })
    }
    catch(err){
        console.log(err);
    }


//    desktops.forEach(s => {
//         let seed = new Desktop({
//             name:s.name,
//             link:s.link
//         })
//         seed.save()
//     })
//     laptops.forEach(s => {
//         let seed = new Laptop({
//             name:s.name,
//             link:s.link
//         })
//         seed.save()
//     })
//     radius.forEach(s => {
//         let seed = new Radius({
//             name:s.name,
//             link:s.link
//         })
//         seed.save()
//     })
//     enclosures.forEach(s => {
//         let seed = new Enclosure({
//             name:s.name,
//             link:s.link
//         })
//         seed.save()
//     })
};

module.exports =  plantSeeds;