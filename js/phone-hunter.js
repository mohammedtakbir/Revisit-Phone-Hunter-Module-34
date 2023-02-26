const loading = document.getElementById('loading');
async function loadPhones(search, dataLimit) {
    loading.innerText = 'Loading.......';
    try {
        const url = `https://openapi.programming-hero.com/api/phones?search=${search}`
        const res = await fetch(url);
        const phones = await res.json();
        displayPhones(phones.data, dataLimit);
        loading.innerText = ''
    }
    catch (err) {
        console.log(err);
    }
};
const displayPhones = (phones, dataLimit) => {
    const error = document.getElementById('error');
    if (phones.length < 1) {
        error.innerText = 'Something went wrong. Please try again.'
        loading.innerText = '';
    } else {
        error.innerText = '';
    }

    const seeMore = document.getElementById('see-more');
    if (dataLimit && phones.length > 10) {
        phones = phones.slice(0, 10);
        seeMore.classList.remove('d-none');

    } else {    
        seeMore.classList.add('d-none');
    }

    let i = 0;
    const phoneContainer = document.getElementById('phone-container');
    phoneContainer.textContent = '';
    while (i < phones.length) {
        const phone = phones[i];
        const { image, brand, phone_name, slug } = phone;
        const phoneDiv = document.createElement('div');
        phoneDiv.classList.add('col');
        phoneDiv.innerHTML = `
        <div class="card p-4">
            <img src="${image}" class="card-img-top w-50 mx-auto" alt="...">
            <div class="card-body text-center">
                <h4 class="card-title">${brand}</h4>
                <h5 class="card-title">${phone_name}</h5>
            </div>
        </div>
        `;
        phoneContainer.appendChild(phoneDiv);
        loading.innerText = '';
        i++;
    }
}

function process(dataLimit){
    loading.innerText = 'Loading.......';
    const searchField = document.getElementById('search-field');
    const searchText = searchField.value;
    loadPhones(searchText, dataLimit);
}

document.getElementById('search-btn').addEventListener('click', () => {
    process(10);
})

document.getElementById('see-more').addEventListener('click', function(){
    process();
})





loadPhones('samsung');

