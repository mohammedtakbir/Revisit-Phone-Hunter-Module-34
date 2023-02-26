async function loadPhones(search) {
    const url = `https://openapi.programming-hero.com/api/phones?search=${search}`
    const res = await fetch(url);
    const phones = await res.json();
    displayPhones(phones.data);
};
const displayPhones = (phones) => {
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
        i++;
    }
}
document.getElementById('search-btn').addEventListener('click', () => {
    const searchField = document.getElementById('search-field');
    const searchText = searchField.value;
    loadPhones(searchText);
})
loadPhones('samsung');

