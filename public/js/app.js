console.log('Client side script loaded')

const weatherForm = document.querySelector('form')
const element = document.querySelector('input')
const messageOne = document.querySelector('#message1')
const messageTwo = document.querySelector('#message2')

weatherForm.addEventListener('submit' , (event) => {
    event.preventDefault()
    const location = element.value

    messageOne.textContent='Loading...'
    messageTwo.textContent=''

    fetch('http://localhost:3000/weather?address='+location).then((response) => {
    response.json().then((data) => {
        if(data.error){
           messageOne.textContent=data.error
        }else{
            messageOne.textContent=data.forecast
            messageTwo.textContent=data.location
        }
    })
})
})