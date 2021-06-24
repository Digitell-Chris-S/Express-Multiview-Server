const seeds = require('./seeds.json')
const Desktop = require('./models/desktop')
const Laptop = require('./models/laptop')

plantSeeds = () => {
   const desktops = seeds['desktop_encoders'];
   const laptops = seeds['laptop_encoders'];
    
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
};

module.exports =  plantSeeds;