
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

// Check to see if local storage is empty
// CheckFirstRun = () => {
//     if(localStorage.getItem('test') == null){
//         LoadData('test');
//     }
//     else{
//         console.log("Welcome Back")
//         DisplayData('test', desktopEncoderCont)
//     }
// }

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

// --------------------Event handlers-----------------------------
// Startup Functions
window.onload = () => {
    // CheckFirstRun()
    // check if main container is empty and show a placeholder 
    Placeholder(windowCont)
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
    sidebar.classList.toggle('expanded-width')
    if(sidebar.classList.contains('expanded-width')){
        menuBtn.src = "icons/leftArrow.svg"
    }
    else{
        menuBtn.src= "icons/menu.svg"
    }
}

// button for setting menu
settingBtn.onclick = () => {
    settingPanel.classList.toggle('expanded-height')
    if(settingPanel.classList.contains('expanded-height')){
        settingBtn.src = "icons/upArrow.svg"
    }
    else{
        settingBtn.src = "icons/gear.svg"
    }
}


// Sidebar button click events
sidebar.onclick = (e) => {
    console.log(e.target)
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

