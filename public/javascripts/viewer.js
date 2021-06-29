
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

let sidebarExpanded = false;
let settingsExpanded = false;

// Add iframe to area, Might add some local storage to thin in the future for local session persisance
// Display Frame Windows
DisplayWindows = (url, id) => {
    let frameContent = `
    <article class="frame-container rounded-1" id="frame-container" data-id=${id}>
        <div class="frame-header">
            <img id="remove-btn" class="btn remove-btn icon-small" src="icons/delete.svg">
            <img id="report-btn" class="btn icon-small" src="icons/report.svg" data-id="${id}">
        </div>
        <iframe src="${url}" frameborder="0" width="800" height="500"></iframe>
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
        element.removeChild(document.getElementById('placeholder'))
    }
}

SetWindowView = (v) => {
    let css = ''
    switch (v){
        case 'col':
            css = " display: grid; grid-auto-rows: auto 1fr; grid-template-columns: 1fr; gap: 0px 0px; place-items:center;"
            break;
        case 'Dcol':
            css = " display: grid; grid-auto-rows: auto 1fr; grid-template-columns: 1fr 1fr; gap: 0px 0px; place-items:center;"
            break;
        case 'Tcol':
            css = " display: grid; grid-auto-rows: auto 1fr; grid-template-columns: 1fr 1fr 1fr; gap: 0px 0px; place-items:center;"
            break;
        
    } 
    windowCont.style.cssText = css
}


// --------------------Event handlers-----------------------------
// Startup Functions
window.onload = () => {
    // CheckFirstRun()
    // check if main container is empty and show a placeholder 
    Placeholder(windowCont)
    SetWindowView('col')
}

// Pass the value of the view changer to SetWindowView on change
viewChanger.onchange = (e) => {
    SetWindowView(e.target.value)
}

// Delete window event listener
windowCont.onclick = (e) => {
    if(e.target.id == "remove-btn"){
       let cont = e.target.parentNode.parentNode;
       windowCont.removeChild(cont);
       Placeholder(windowCont);
    }
    else if( e.target.id == "report-btn" ){
        // cache the ID of the window
       localStorage.setItem('windowCache', e.target.dataset.id)
        // redirect to the edit form
       window.location.replace("report.html")
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
        id = e.target.dataset.id
        DisplayWindows(link, id);
    }
    else if(e.target.id == "add-btn"){
        if(urlInput.value != ""){
            DisplayWindows(urlInput.value)
        }
        else{
            alert('Error:No Input Provided')
        }
    }
    else if(e.target.classList.contains("clear-btn")){
        windowCont.innerHTML = ''
        Placeholder(windowCont);
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

