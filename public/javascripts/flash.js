// Check if there is a flash message exists.... Here to prevent errors
if(document.querySelectorAll('.flash-container').length){
    // flash message dissmiss button
    document.getElementById('dissmiss-btn').onclick = (e) => {
        e.target.parentNode.parentNode.style.display = 'none'
    }
}