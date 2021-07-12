const unlock = document.querySelector('#unlock-btn')
const passForm = document.querySelector('#pass-edit')
const userForm = document.querySelector('#user-edit')
const inputs = [ ...document.querySelectorAll('input'), document.querySelector('select'), ...document.querySelectorAll('.sub') ] 


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
            item.placeholder = "Locked"
            item.disabled = true
            item.classList.add('disabled')
        }
        else{
            item.placeholder = 'Enter Changes'
            item.disabled = false
            item.classList.remove('disabled')
        }
    })
}

CheckPassword = () => {
    const password1 = document.querySelector('#password1')
    const password2 = document.querySelector('#password2')
    if(password1 != "" && password2 != ""){
        if(password1 != password2){
            return false
        }
        else{
            return true
        }
    }
}

unlock.onclick = () => {
    ToggleLock()
}

window.onload = () => {
    ToggleInputs()
}
 
passForm.onsubmit = () => {
    if(!CheckPassword()){
        e.preventDefault()
        alert('Passwords do not match')
    }
}