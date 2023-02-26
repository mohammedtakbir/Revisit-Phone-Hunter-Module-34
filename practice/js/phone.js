async function loadPhones() {
    const res = await fetch('https://openapi.programming-hero.com/api/phones?search=samsung');
    const data = await res.json();
    displayPhones(data.data);
};
function displayPhones(phones) {
    const phoneContainer = document.getElementById('phone-container');
    for (let i = 0; i < phones.length; i++) {
        const phone = phones[i];
        const { brand, image, phone_name, slug } = phone;
        console.log(phone);

        const phoneDiv = document.createElement('div');
        phoneDiv.classList.add('col');
        phoneDiv.innerHTML = `
        <div class="card p-3">
        <img src="${image}" class="card-img-top w-50 mx-auto" alt="...">
        <div class="card-body text-center">
            <h3 class="card-title">${brand}</h3>
            <h5 class="card-title">${phone_name}</h5>
        </div>
        </div>
        `;
        phoneContainer.appendChild(phoneDiv);
    }
};

loadPhones();