const tabContainer = document.getElementById('tab-container')
const tabs = tabContainer.children
const desktopWidget = document.getElementById('desktops-container')
const laptopWidget = document.getElementById('laptops-container')
const userWidget = document.getElementById('users-container')

const desktopSearch = document.getElementById('desktop-search')
const laptopSearch = document.getElementById('laptop-search')

const navMenu = document.getElementById('setting-nav')

// Update Displayed section based on selected tab
const ShowWidget = (str) => {
    const sections = [desktopWidget, laptopWidget, userWidget]
    sections.forEach(section => {
        if(str != section.id){
            section.style.display = "none"
        }
        else{
            section.style.display = "block"
        }
    })
}

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

const ToggleContainer = (element) => {
    element.classList.toggle('collapsed')
}   

// -------Event handlers----------
// -------------------------------

// Init the page on load
window.onload = () => {
    ShowWidget('desktops-container')
    ToggleContainer(navMenu)
}

// (In menu) Collapse and Expand menu
document.getElementById('collapse-btn').onclick = () => {
    ToggleContainer(navMenu)
}

document.getElementById('nav-btn').onclick = () => {
    ToggleContainer(navMenu)
}

// Visually change selected tab and call showWidget to update page contents
tabContainer.onclick = (e) => {
    // Remove selected class from any children that have it
    Object.values(tabs).forEach(tab => {
        if(tab.classList.contains('tab-selected')){
            tab.classList.remove('tab-selected')
        }
    });
    // add class to target
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