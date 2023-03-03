window.addEventListener('DOMContentLoaded', () => {
    if (localStorage.getItem('dataArray')) {
        const data = JSON.parse(localStorage.getItem('dataArray'))
        console.log(Array.isArray(data))
        let cards = ''
        data.forEach(item => {
            let url = item.download_url
            let author = item.author
            const cardBlock = `<div class="card">
    <img src="${url}" class="card-image"/>
    <h5 class='author'>${author}</h5>
     </div>`
            cards += cardBlock
            resultRequest.innerHTML = cards
        })
    }
})

async function useRequest(url) {
    const options = {
        method: 'GET',
        mode: 'cors'
    }

    await fetch(url, options)
        .then((response) => {
            return response.json()
        })
        .then((data) => {
            const itemsArray = data
            localStorage.setItem('dataArray', JSON.stringify(itemsArray))
            console.log(itemsArray)
            let cards = ''
            itemsArray.forEach(item => {
                let url = item.download_url
                let author = item.author
                const cardBlock = `<div class="card">
        <img src="${url}" class="card-image"/>
        <h5 class='author'>${author}</h5>
         </div>`
                cards += cardBlock
                resultRequest.innerHTML = cards
            })

        })
        .catch(() => {
            console.log('error')
        })
}


const resultRequest = document.querySelector(".result");
const btn = document.querySelector(".btn");

btn.addEventListener('click', () => {
    let number = Number(document.querySelector('.input-number').value)
    let limit = Number(document.querySelector('.input-limit').value)
    console.log(typeof number, typeof limit)
    let checkNumber = number >= 1 && number <= 10 && typeof number == 'number'
    let checkLimit = limit >= 1 && limit <= 10 && typeof limit == 'number'
    if (!checkNumber && !checkLimit) {
        resultRequest.innerHTML = 'Номер страницы и лимит вне диапазона от 1 до 10'
    } else if (!checkNumber) {
        resultRequest.innerHTML = 'Номер страницы вне диапазона от 1 до 10'
    } else if (!checkLimit) {
        resultRequest.innerHTML = 'Лимит вне диапазона от 1 до 10'
    } else {
        let inputUrl = `https://picsum.photos/v2/list?page=${number}&limit=${limit}`
        useRequest(inputUrl)
    }
})

