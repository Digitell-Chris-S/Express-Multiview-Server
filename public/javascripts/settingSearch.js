
// Search Class
class Search{
    constructor(searchElement, targetElement){
        this.searchBox = searchElement;
        this.target = targetElement;
    }

    search = () => {
        const keyword = this.searchBox.value;
        const buttons = this.target.querySelectorAll('.enc-btn');
        console.log(keyword, buttons)
        Array.from(buttons).forEach(button => {
            if(button.innerText.includes(keyword)){
                button.style.display = 'block';
            }
            else{
                button.style.display = 'none';
            }
        })   
    }
}

// Desktop Search Elements
const deskSearch = document.querySelector('#desktop-search');
const deskContainer = document.querySelector('#desktops-container');

// Laptop Search Elements
const lapSearch = document.querySelector('#laptop-search');
const lapContainer = document.querySelector('#laptops-container');

// Enclosure Search Elements
const encSearch = document.querySelector('#enclosure-search');
const encContainer = document.querySelector('#enclosures-container');

// Radius Search Elements
const radiusSearch = document.querySelector('#radius-search');
const radiusContainer = document.querySelector('#radius-container');


// Desktop Container instance of search
const dSearch = new Search(deskSearch, deskContainer);
// Laptop Container instance of search
const lSearch = new Search(lapSearch, lapContainer);
// Enclosure Container instance of search
const eSearch = new Search(encSearch, encContainer);
// Radius Container instance of search
const rSearch = new Search(radiusSearch, radiusContainer);

deskSearch.onkeyup = (e) => {
    dSearch.search() 
}

lapSearch.onkeyup = (e) => {
    lSearch.search()
}

encSearch.onkeyup = (e) => {
    eSearch.search()
}

radiusSearch.onkeyup = (e) => {
    rSearch.search()
}