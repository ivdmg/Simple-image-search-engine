const accessKey = '5jp651mOnLs4lu_4-8LfoiTWoZOJ0GLlMn0Yu0r4Npw';

const searchBox = document.getElementById('search-box');
const searchInput = document.getElementById('search-input');
const searchResult = document.getElementById('search-result');
const searchMoreBtn = document.getElementById('show-more-btn');

let keyword = '';
let page = 1;

async function searchImage() {
    const url = `https://api.unsplash.com/search/photos?page=${page}&query=${keyword}&client_id=${accessKey}&per_page=12`
    const response = await fetch(url);
    const data = await response.json();
    
    if(page === 1){
        searchResult.innerHTML = ""
    }

    data.results.map((result)=>{
        const imageSubstrate = document.createElement('div');
        imageSubstrate.className = 'imageSubstrate'
        const image = document.createElement('img');
        image.src = result.urls.small;
        const imageLink = document.createElement('a');
        imageLink.href = result.links.html
        imageLink.target = "_blank"

        imageSubstrate.appendChild(imageLink)
        imageLink.appendChild(image)
        searchResult.appendChild(imageSubstrate)
        
    })
}

searchBox.addEventListener('submit', (e) => {
    e.preventDefault();
    keyword = searchInput.value;
    if(keyword !== ''){
        searchMoreBtn.style.display = "block";
        page = 1;
        searchImage();
    }
})

searchMoreBtn.addEventListener('click', ()=>{
    page++
    searchImage();
})