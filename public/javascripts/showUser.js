const unlock = document.querySelector('#unlock-btn')

const inputs = [ ...document.querySelectorAll('input'), document.querySelector('select'), document.querySelector('#sub') ] 


let locked = true;

ToggleLock = () => {
    if(locked){
        locked = false
        ToggleInputs()
    }
    else{
        locked = true
        ToggleInputs()
    }
}

ToggleInputs = () => {
    inputs.forEach(item => {
        if(locked){
            item.disabled = true
            item.classList.add('disabled')
        }
        else{
            item.disabled = false
            item.classList.remove('disabled')
        }
    })
}

unlock.onclick = () => {
    ToggleLock()
}
