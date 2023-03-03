const btn = document.querySelector('.btn')
const result = document.querySelector('.result')

function request(url, callback) {
    let xhr = new XMLHttpRequest()
    xhr.open('GET', url, true)
    xhr.onload = function () {
        if (xhr.status = 200) {
            const reqResult = JSON.parse(xhr.response)
            if (callback) {
                callback(reqResult)
            }
        }
    }
    xhr.send()
}

function displayResult(data) {
    let cards = ''
    data.forEach(item => {
        const cardBlock = `<div class="card">
        <img
          src="${item.download_url}"
          class="card-image"
        />
        <p>${item.author}</p>
      </div>`
        cards = cards + cardBlock
    })
    result.innerHTML = cards
}

btn.addEventListener('click', () => {
    const input = document.getElementById('input').value
    if (input > 10 || input < 1) {
        result.innerHTML = 'число вне диапазона от 1 до 10'
    } else if (input <= 10 && input >= 1) {
        const reqUrl = `https://picsum.photos/v2/list?limit=${input}`
        request(reqUrl, displayResult)
    }
})