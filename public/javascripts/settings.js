const tabContainer = document.getElementById('tab-container')
const tabs = tabContainer.children

const desktopWidget = document.getElementById('desktops-container')
const laptopWidget = document.getElementById('laptops-container')
const userWidget = document.getElementById('users-container')
const enclosureWidget = document.getElementById('enclosures-container')
const radiusWidget = document.getElementById('radius-container')

const desktopSearch = document.getElementById('desktop-search')
const laptopSearch = document.getElementById('laptop-search')



// Update Displayed section based on selected tab
const ShowWidget = (str) => {
    const sections = [desktopWidget, laptopWidget, enclosureWidget, radiusWidget, userWidget]
    sections.forEach(section => {
        if(str != section.id){
            section.style.display = "none"
        }
        else{
            section.style.display = "block"
        }
    })
}

// filter function encoder
const SearchFilter = (str, arr) => {
    Array.from(arr).forEach(item => {
        if( item.textContent.includes(str.toLowerCase()) ){
            item.style.display = "block"
        }
        else{
            item.style.display = "none"
        }
    })
}

// toggle the collapsed state of the input element
const ToggleContainer = (element) => {
    element.classList.toggle('collapsed')
}   

// -------Event handlers----------
// -------------------------------

// Init the page on load
window.onload = () => {
    ShowWidget('desktops-container')
    // ToggleContainer(navMenu)
}


// Visually change selected tab and call showWidget to update page contents
tabContainer.onclick = (e) => {
    // Remove selected class from any children that have it
    Object.values(tabs).forEach(tab => {
        if(tab.classList.contains('tab-selected')){
            tab.classList.remove('tab-selected')
        }
    });
    // add selected class to target
    e.target.classList.toggle('tab-selected')
    // Update page contents
    ShowWidget(`${e.target.textContent.toLowerCase()}-container`)
}

// Desktop Search Event handler
desktopSearch.onkeyup = (e) => {
    SearchFilter(desktopSearch.value, desktopWidget.childNodes[5].children)
}

// Laptop Search Event handler
laptopSearch.onkeyup = (e) => {
    SearchFilter(laptopSearch.value, laptopWidget.childNodes[5].children)
}

console.log("pineapple")