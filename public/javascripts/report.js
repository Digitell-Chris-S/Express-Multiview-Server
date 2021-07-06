const input = document.querySelector('select')
const submit = document.querySelector('#submit-btn')
const textarea = document.querySelector('textarea')
const msg = document.querySelector('#message')
const form = document.querySelector('form')


ShowTextArea = () => {
    if(input.value != 'other'){
            msg.style.display = 'none'
            textarea.required = false
    }
    else{
            msg.style.display = 'block'
            textarea.required = true
    }
}

CheckInput = () => {
    if(input.value == ""){
        submit.classList.add('disabled')
        submit.disabled = true
    }
    else{
        submit.classList.remove('disabled')
        submit.disabled = false
    }
}

input.onchange = () => {
    CheckInput()
    ShowTextArea()
}

window.onload = () => {
    CheckInput()
    ShowTextArea()
}

