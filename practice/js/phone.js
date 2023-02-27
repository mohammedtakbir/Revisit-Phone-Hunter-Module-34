async function loadPhones(search, dataLimit) {
    loading(true);
    const res = await fetch(`https://openapi.programming-hero.com/api/phones?search=${search}`);
    const data = await res.json();
    displayPhones(data.data, dataLimit);
};
function displayPhones(phones, dataLimit) {
    const error = document.getElementById('error');
    const seeMore = document.getElementById('see-more-btn');
    if (phones.length < 1) {
        loading(false);
        error.classList.remove('d-none');
        seeMore.classList.add('d-none');
    } else {
        error.classList.add('d-none');
    }

    if (dataLimit && phones.length > 10) {
        phones = phones.slice(0, 10);
        seeMore.classList.remove('d-none');
    }else{
        seeMore.classList.add('d-none');
    }

    const phoneContainer = document.getElementById('phone-container');
    phoneContainer.textContent = '';
    for (let i = 0; i < phones.length; i++) {
        const phone = phones[i];
        const { brand, image, phone_name, slug } = phone;
        const phoneDiv = document.createElement('div');
        phoneDiv.classList.add('col');
        phoneDiv.innerHTML = `
        <div class="card p-4">
        <img src="${image}" class="card-img-top w-50 mx-auto" alt="...">
        <div class="card-body text-center">
            <h3 class="card-title">${brand}</h3>
            <h5 class="card-title">${phone_name}</h5>
        </div>
        <div class="d-flex justify-content-center">
            <button class="btn btn-secondary">Details</button>
        </div>
        </div>
        `;
        phoneContainer.appendChild(phoneDiv);
        loading(false);
    }
};

function dataProcess(dataLimit) {
    loading(true);
    const searchField = document.getElementById('search-field');
    const searchText = searchField.value;
    loadPhones(searchText, dataLimit);
}

document.getElementById('search-btn').addEventListener('click', function () {
    dataProcess(10);
})

document.getElementById('search-field').addEventListener('keypress', (e) => {
    if(e.key === 'Enter'){
        dataProcess(10);
    }
})

document.getElementById('see-more-btn').addEventListener('click', () => {
    dataProcess();
})

function loading(isLoading) {
    const loading = document.getElementById('loading');
    if (isLoading) {
        loading.classList.remove('d-none');
    } else {
        loading.classList.add('d-none');
    }
}

loadPhones('samsung');