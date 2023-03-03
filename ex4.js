async function useRequest(url) {
    const options = {
        method: 'GET',
        mode: 'cors'
    }
    await fetch(url, options)
        .then((response) => {
            let url = response.url
            console.log(url)
            return url
        })
        .then((url) => {
            let cards = ''
            const cardBlock = `<div class="card">
        <img src="${url}" class="card-image"/>
         </div>`
            cards += cardBlock
            resultRequest.innerHTML = cards

        })
        .catch(() => {
            console.log('error')
        })
}

const resultRequest = document.querySelector(".result");
const btn = document.querySelector(".btn");

btn.addEventListener('click', () => {
    const width = document.querySelector('.input-width').value
    const height = document.querySelector('.input-height').value
    if (width > 300 || width < 100 || width === 0 || height > 300 || height < 100 || height === 0) {
        const error = `<div class="error_number"><p>Числа вне диапазона от 100 до 300</p></div>`
        resultRequest.innerHTML = error;
    } else {
        let inputUrl = `https://picsum.photos/${width}/${height}`
        useRequest(inputUrl)
    }
})