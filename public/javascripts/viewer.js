
// Selectors (there are unused things in here...probobly)

// The longer this is here the more I dont like it
const laptopEncoderCont = document.getElementById('laptopEncoderBtn-Container');
const urlInput = document.getElementById("input-address");
const windowCont = document.getElementById("window-container");
const frameCont = document.getElementById("frame-container");
const encoderList = document.getElementById("select-machine");
const menuBtn = document.getElementById("menu-btn");
const collapseBtn = document.getElementById("collapse-btn");
const sidebar = document.getElementById('sidebar');
const desktopEncoderCont = document.getElementById("desktopEncoder-Container");
const importBtn = document.getElementById("import-btn");
const settingBtn = document.getElementById("setting-btn");
const settingPanel = document.getElementById('settings');
const msg = document.getElementById("status-message");
const viewCont = document.getElementById('view-container');
const searchbox = document.getElementById('input-search');
const viewChanger = document.getElementById('view-changer')

// Global Variables
let sidebarExpanded = false;
let settingsExpanded = false;
// Dynamic size of iframes
let frameSize = window.innerWidth - 200;


// Add iframe to area, Might add some local storage to thin in the future for local session persisance
// Display Frame Windows
DisplayWindows = (url) => {
    let frameContent = `
    <article class="frame-container rounded-1" id="frame-container">
        <div class="frame-header">
            <img id="remove-btn" class="btn remove-btn icon-small" src="icons/delete.svg">
            <img id="report-btn" class="btn icon-small" src="icons/report.svg" >
        </div>
        <iframe src="${url}" frameborder="0" width="${frameSize}" height="600"></iframe>
    </article>`

    windowCont.insertAdjacentHTML('afterbegin', frameContent);

    delbtn = document.getElementsByClassName("del-btn")
    
    Placeholder(windowCont);
}

// create a place holder when area is empty
Placeholder = (element) => {
    if(element.childElementCount == 0){
        element.insertAdjacentHTML('afterbegin', `
        <article class="placeholder p-2 rounded-1 text-center" id="placeholder">
        <img class="icon-med" src="icons/sad.svg">
        <h3>There is nothing here</h3>
        </article>
        `)
    }
    else{
        // Check is placeholder element is actually on the page before trying to remove it
        if(document.getElementById('placeholder' != null)){
            element.removeChild(document.getElementById('placeholder'))
        }
    }
}

// Set layout and frame size based on user input
SetWindowView = (v) => {
    let css = ''
    switch (v){
        case 'col':
            css = " display: grid; grid-auto-rows: auto 1fr; grid-template-columns: 1fr; gap: 0px 0px; place-items:center; width:100vw;"
            frameSize = window.innerWidth - 100
            break;
        case 'Dcol':
            css = " display: grid; grid-auto-rows: auto 1fr; grid-template-columns: 1fr 1fr; gap: 0px 0px; place-items:center;"
            frameSize = (window.innerWidth - 75) / 2
            break;
        case 'Tcol':
            css = " display: grid; grid-auto-rows: auto 1fr; grid-template-columns: 1fr 1fr 1fr; gap: 0px 0px; place-items:center;"
            frameSize = (window.innerWidth - 100) / 3
            break;
    } 
    // change the grid layout of the frame container
    windowCont.style.cssText = css

    const frames = document.querySelectorAll('iframe')
    // update the size of existing iframes already on the page
    Array.from(frames).forEach(frame => {
        frame.width = frameSize;
    })
}

// Read Local Storage and return value
ReadCache = (tag) => {
    return localStorage.getItem(tag)
}

// Store selected links in Local storage
CacheFrames = (link) => {
    let storedFrames = ReadCache('frames')
    // Check if there are any frames cached and append onto that
    if(storedFrames && storedFrames.length){
        let oldFrames = JSON.parse(storedFrames)
        oldFrames.push(link)
        localStorage.setItem('frames', JSON.stringify(oldFrames))
    }
    // if cache is empty create cache
    else{
        links = [link]
        RenderCachedFrames(links)
        localStorage.setItem('frames', JSON.stringify(links))
    }
}

// Pull links from local storage and render them to the page
RenderCachedFrames = (l) => {
    if(l && l.length){
        l.forEach(link => {
            DisplayWindows(l)
        })
    }
}

RemoveCachedFrame = (l) => {
    const frames = JSON.parse(ReadCache('frames'))
    const filtered = frames.filter(f => f != l )
    localStorage.setItem('frames', JSON.stringify(filtered))
}

// Show Loading Overlay
PrettyLoad = () => {
   document.querySelector('.overlay').style.display = 'grid'
   setTimeout(() => {
       document.querySelector('.overlay').style.display = 'none'
   }, 2 * 1000)
}

// --------------------Event handlers-----------------------------
// Startup Functions
window.onload = () => {
    // Check caches and render any previous frames 
    RenderCachedFrames(JSON.parse( localStorage.getItem('frames')) )
    // Set Default View
    SetWindowView('col')
    // check if main container is empty and show a placeholder 
    Placeholder(windowCont)
    if(localStorage.getItem('frames') && localStorage.getItem('frames') != null){
        PrettyLoad()
    }

}

// resize all the frame when the user changes the window size
window.onresize = () => {
    SetWindowView(viewChanger.value) 
}

// Pass the value of the view changer to SetWindowView on change
viewChanger.onchange = (e) => {
    SetWindowView(e.target.value)
}

// Delete window event listener
windowCont.onclick = (e) => {
    if(e.target.id == "remove-btn"){
       let cont = e.target.parentNode;
    //This Feels Very gross....why?
       const frame = cont.parentNode.childNodes[3].src;
        // Remove cached link from storage
       RemoveCachedFrame(frame)

       windowCont.removeChild(cont.parentNode);
       Placeholder(windowCont);

    }
    else if( e.target.id == "report-btn" ){
        
       
        // redirect to the edit form
       window.location.replace('')
    }
}

// menu button for sidebar
menuBtn.onclick = () => {
    if(settingsExpanded){
        settingPanel.classList.toggle('expanded-height')
    }
    sidebar.classList.toggle('expanded-width')
    if(sidebar.classList.contains('expanded-width')){
        menuBtn.src = "icons/leftArrow.svg"
        sidebarExpanded = true;
    }
    else{
        menuBtn.src= "icons/menu.svg"
        sidebarExpanded = false;
    }
}

// button for setting menu
settingBtn.onclick = () => {
    if(sidebarExpanded){
        sidebar.classList.toggle('expanded-width')
    }
    settingPanel.classList.toggle('expanded-height')
    if(settingPanel.classList.contains('expanded-height')){
        settingBtn.src = "icons/upArrow.svg"
        settingsExpanded = true;
    }
    else{
        settingBtn.src = "icons/gear.svg"
        settingsExpanded = false;
    }
}


// Sidebar button click events
sidebar.onclick = (e) => {
    if(e.target.id == "enc-btn"){
        link = e.target.dataset.link
        DisplayWindows(link);
        CacheFrames(link)
    }
    else if(e.target.id == "add-btn"){
        if(urlInput.value != ""){
            DisplayWindows(urlInput.value)
        }
        else{
            alert('Error:No Input Provided')
        }
    }
    else if(e.target.id == "clear-all" ){
        windowCont.innerHTML = ''
        Placeholder(windowCont);
        localStorage.clear()
    }
}

searchbox.onkeyup = () => {
    const searchTerm = searchbox.value.toLowerCase();
    if(searchTerm != ""){
        sidebar.style.justifyContent = "start"
    }
    else{
        sidebar.style.justifyContent = "sapce-around"
    }   

    let laptops = Array.from(laptopEncoderCont.children).forEach(item => {
        sTerm = item.textContent.toLocaleLowerCase()
        if(sTerm.includes(searchTerm)){
            item.style.display = "block"
        }
        else{
            item.style.display = 'none'
        }
    })
    let desktops = Array.from(desktopEncoderCont.children).forEach(item => {
        sTerm = item.textContent.toLocaleLowerCase()
        if(sTerm.includes(searchTerm)){
            item.style.display = "block"
        }
        else{
            item.style.display = 'none'
        }
    })
}

