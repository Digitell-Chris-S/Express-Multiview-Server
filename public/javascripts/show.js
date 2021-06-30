const unlockBtn = document.getElementById('unlock-btn')
let locked = false


CheckLocked = (l) => {
    const name = document.getElementById('name')
    const link = document.getElementById('link')
    const submit = document.querySelector('#sub')

    const fields = [name, link, submit]

    if(!l){
        fields.forEach(field => {
            field.classList.remove('disabled')
            field.disabled = false
        })
    }
    else{
        fields.forEach(field => {
            field.classList.add('disabled')
            field.disabled = true
        })
    }

}


unlockBtn.onclick = () => {
    CheckLocked(locked)
    if(locked){
        unlockBtn.textContent = "Unlock"
        locked = false
    }
    else{
        unlockBtn.textContent = "lock"
        locked = true
    }
}