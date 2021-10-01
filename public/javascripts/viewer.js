// until Ping plotter changes the way their live links work there will be no caching of choosen frames

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
DisplayWindows = (url, id) => {
    let frameContent = `
    <article class="frame-container rounded-1" id="frame-container" data-id="${id}">
        <div class="frame-header">
            <button id="remove-btn" class="btn-small grid-center remove-btn cancel-button">Remove</button>
            <a href="/viewer/report/${id}"><button class="btn-small warn-btn">Report an Issue</button></a>
        </div>
        <iframe src="${url}" frameborder="0" width="${frameSize}" height="600"></iframe>
    </article>`

    windowCont.insertAdjacentHTML('afterbegin', frameContent);

    delbtn = document.getElementsByClassName("del-btn")
    
    Placeholder(windowCont);
}

// create a place holder when area is empty
Placeholder = (element) => {
   
    if(element.children.length === 0){
        console.log("Add Placeholder")
        element.insertAdjacentHTML('afterbegin', `
        <article class="placeholder p-2 rounded-1 text-center" id="placeholder">
        <img class="icon-med" src="icons/sad.svg">
        <h3>There is nothing here</h3>
        </article>
        `)
    }
    else{
        console.log("remove placeholder")
        // Check is placeholder element is actually on the page before trying to remove it
        if(document.getElementById('placeholder') != null){
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


// Set Encoder view using encoder view radio boxes
SetEncoderView = (v) => {
    // set the value of the encoder view to the default
    encoderView[0].checked = true
    // set the value of the view changer to the default
    viewChanger.value = 'col'
    // set the size of the frame to the default
    SetWindowView('col')
}

// --------------------Event handlers-----------------------------
// Startup Functions
window.onload = () => {
    // Set Default View
    SetWindowView('col')
    // check if main container is empty and show a placeholder 
    Placeholder(windowCont)
    
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
// some parts of this are unused from when active windows were stored in local storage
windowCont.onclick = (e) => {
    if(e.target.id == "remove-btn"){
       let cont = e.target.parentNode;
        //This Feels Very gross....why...Has I ever?
       const frame = cont.parentNode.childNodes[3].src;
       
       
       windowCont.removeChild(cont.parentNode);
       Placeholder(windowCont);

    }
    else if( e.target.id == "report-btn" ){
        const cont = e.target.parentNode
        const frameId = cont.parentNode.dataset.id
        
        // redirect to the edit form
        // window.location.replace('')
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
        // adjust the window container width to stop overflow
        windowCont.style.width = "90vw"
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
        sidebar.style.justifyContent = "space-around"
    }   
    
    // look through the buttons in each encoder container and hide those that dont match the search term
    const encContainers = document.querySelectorAll('.encoder-container')
    Array.from(encContainers).forEach(enc => {
        const buttons = enc.children
        Array.from(buttons).forEach(btn => {
            // Check if the button text matches the search term and hide if it does not
            if(btn.innerText.toLowerCase().indexOf(searchTerm) == -1){
                btn.style.display = 'none'
            }
            else{
                btn.style.display = 'block'
            }
        })
        console.log(enc.childNodes)
        if(enc.children == 0){
            console.log('hide')
            enc.parentElement.style.display = 'none'
        }
    })
}

