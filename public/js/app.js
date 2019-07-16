console.log('client site javascript')
const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const mesg_1 = document.querySelector('#mesg-1')
const mesg_2 = document.querySelector('#mesg-2')


weatherForm.addEventListener('submit', (event) => {
    event.preventDefault()
       const location = search.value

       mesg_1.textContent = 'Loading...'
       mesg_2.textContent = ''
    
    fetch('/weather?address='+location).then((response) => {
    response.json().then((data) => {
        if(data.error){
            mesg_1.textContent = data.error
        }else{
            mesg_1.textContent = data.forecast
            mesg_2.textContent = data.location
            mesg_3.textContent = data.address
        }
    })
})
})