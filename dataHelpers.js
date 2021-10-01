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

    try{
        await Desktop.deleteMany({})
        await Laptop.deleteMany({})
        await Radius.deleteMany({})
        await Enclosure.deleteMany({})
    }
    catch(err){
        console.log(err);
    }

   desktops.forEach(s => {
        let seed = new Desktop({
            name:s.name,
            link:s.link
        })
        seed.save()
    })
    laptops.forEach(s => {
        let seed = new Laptop({
            name:s.name,
            link:s.link
        })
        seed.save()
    })
    radius.forEach(s => {
        let seed = new Radius({
            name:s.name,
            link:s.link
        })
        seed.save()
    })
    enclosures.forEach(s => {
        let seed = new Enclosure({
            name:s.name,
            link:s.link
        })
        seed.save()
    })
};

module.exports =  plantSeeds;