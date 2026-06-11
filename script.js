import { cenikKomponent } from './data.js';
// =================================================================================
// 1. DATOVÁ ABSTRAKCE (Třídy)
// =================================================================================
/**
 * Abstraktní třída HardwareComponent
 * ARCHITEKTURA: Slouží jako "šablona". Nemůžeme vytvořit obecnou komponentu,
 * vždy musí jít o konkrétní typ (CPU, GPU...). Tím vynucujeme správnou strukturu.
 */
class HardwareComponent {
    // ZAPOUZDŘENÍ (Encapsulation): Vlastnosti jsou 'private', takže k nim 
    // zvenčí nikdo nemůže přistoupit a náhodně je změnit.
    constructor(znacka, model, cena) {
        this.znacka = znacka;
        this.model = model;
        this.cena = cena;
        // VALIDACE: Kontrola dat při vzniku objektu. Pokud jsou špatná, 
        // program hodí chybu hned, ne až později při výpočtu.
        if (!znacka.trim() || !model.trim())
            throw new Error("Neplatná data.");
    }
    // PUBLIC ROZHRANÍ (Interface): Ven vystrkujeme pouze metody, které 
    // uživatel nebo košík potřebuje k práci.
    getCena() { return this.cena; }
    // PROTECTED: Dostupná pouze pro tuto třídu a její potomky (CPU, GPU...), 
    // pro zbytek světa je neviditelná.
    getZakladniInfo() { return `${this.znacka} ${this.model}`; }
}
// DĚDIČNOST (Inheritance): CPU dědí vše od HardwareComponent 
// a přidává si specifické parametry (cores, freq).
class CPU extends HardwareComponent {
    constructor(z, m, c, cores, freq) {
        super(z, m, c);
        this.cores = cores;
        this.freq = freq;
    }
    getInfo() { return `[CPU] ${this.getZakladniInfo()} | ${this.cores} jader`; }
}
class GPU extends HardwareComponent {
    constructor(z, m, c, vram) {
        super(z, m, c);
        this.vram = vram;
    }
    getInfo() { return `[GPU] ${this.getZakladniInfo()} | ${this.vram}GB VRAM`; }
}
class Motherboard extends HardwareComponent {
    constructor(z, m, c, socket) {
        super(z, m, c);
        this.socket = socket;
    }
    getInfo() { return `[MB] ${this.getZakladniInfo()} | Socket ${this.socket}`; }
}
class RAM extends HardwareComponent {
    constructor(z, m, c, size) {
        super(z, m, c);
        this.size = size;
    }
    getInfo() { return `[RAM] ${this.getZakladniInfo()} | ${this.size}GB`; }
}
class Storage extends HardwareComponent {
    constructor(z, m, c, cap) {
        super(z, m, c);
        this.cap = cap;
    }
    getInfo() { return `[Disk] ${this.getZakladniInfo()} | ${this.cap}GB`; }
}
class PSU extends HardwareComponent {
    constructor(z, m, c, watts) {
        super(z, m, c);
        this.watts = watts;
    }
    getInfo() { return `[PSU] ${this.getZakladniInfo()} | ${this.watts}W`; }
}
// =================================================================================
// 2. LOGIKA KOŠÍKU
// =================================================================================
class Cart {
    constructor() {
        // PRIVATE: Seznam položek je zamčen v "trezoru". Nikdo nemůže 
        // ručně přepsat pole 'items', musí použít metody add() a remove().
        this.items = [];
    }
    add(item) {
        this.items.push(item);
        this.updateUI(); // Vždy po změně dat aktualizujeme zobrazení
    }
    remove(index) {
        this.items.splice(index, 1);
        this.updateUI();
    }
    // PRIVÁTNÍ METODA: Tato logika patří pouze dovnitř košíku, 
    // nikdo jiný nepotřebuje vědět, jak se vykresluje HTML.
    updateUI() {
        const cartBtn = document.getElementById('cart-button');
        const cartList = document.getElementById('cart-items');
        const cartTotal = document.getElementById('cart-total');
        if (!cartBtn || !cartList || !cartTotal)
            return;
        let total = 0;
        cartList.innerHTML = ""; // Reset DOMu: smažeme starý obsah a vytvoříme nový
        this.items.forEach((item, index) => {
            total += item.getCena();
            const div = document.createElement('div');
            // Stylizace přímo přes JS (lze i přes CSS třídy)
            div.style.display = "flex";
            div.style.justifyContent = "space-between";
            div.style.marginBottom = "10px";
            div.style.padding = "5px";
            div.style.borderBottom = "1px solid #ddd";
            div.innerHTML = `
                <span>${item.getInfo()} - <strong>${item.getCena()} Kč</strong></span>
                <button class="remove-btn" style="background:#ff4d4d; color:white; border:none; border-radius:3px; cursor:pointer; padding: 2px 6px;">Odebrat</button>
            `;
            // EVENT LISTENER: Propojení kliknutí na tlačítko s logikou třídy
            div.querySelector('.remove-btn')?.addEventListener('click', () => {
                this.remove(index);
            });
            cartList.appendChild(div);
        });
        cartBtn.innerText = `🛒 Košík (${total} Kč)`;
        cartTotal.innerText = `Celkem: ${total} Kč`;
    }
    // REDUCE: Elegatní způsob, jak projít pole a vypočítat jednu hodnotu (součet)
    getTotal() {
        return this.items.reduce((sum, item) => sum + item.getCena(), 0);
    }
    isEmpty() { return this.items.length === 0; }
    getItems() { return this.items.slice(); } // Vracíme kopii pole, aby někdo omylem neměnil originál
    clear() { this.items = []; this.updateUI(); }
}
// =================================================================================
// 3. ŘÍDÍCÍ LOGIKA OBCHODU
// =================================================================================
class PCShop {
    constructor() {
        this.cart = new Cart();
        this.filter = 'Vše';
    }
    get categories() {
        return ['Vše', ...new Set(cenikKomponent.map(item => item.typ))];
    }
    createComponent(data) {
        if (data.typ === 'CPU')
            return new CPU(data.znacka, data.model, data.cena, data.param1, data.param2);
        if (data.typ === 'GPU')
            return new GPU(data.znacka, data.model, data.cena, data.param1);
        if (data.typ === 'Motherboard')
            return new Motherboard(data.znacka, data.model, data.cena, data.param1);
        if (data.typ === 'RAM')
            return new RAM(data.znacka, data.model, data.cena, data.param1);
        if (data.typ === 'Storage')
            return new Storage(data.znacka, data.model, data.cena, data.param1);
        return new PSU(data.znacka, data.model, data.cena, data.param1);
    }
    start() {
        this.renderFilters();
        this.renderProducts();
    }
    renderFilters() {
        const filterNav = document.getElementById('filter-nav');
        if (!filterNav)
            return;
        filterNav.innerHTML = '';
        this.categories.forEach(category => {
            const btn = document.createElement('button');
            btn.className = 'filter-btn';
            if (category === this.filter) btn.classList.add('active');
            btn.textContent = category;
            btn.addEventListener('click', () => {
                this.filter = category;
                this.updateFilterButtons();
                this.renderProducts();
            });
            filterNav.appendChild(btn);
        });
    }
    updateFilterButtons() {
        document.querySelectorAll('#filter-nav .filter-btn').forEach(button => {
            if (button.textContent === this.filter) button.classList.add('active');
            else button.classList.remove('active');
        });
    }
    renderProducts() {
        const grid = document.getElementById('product-grid');
        if (!grid)
            return;
        grid.innerHTML = '';
        const products = this.filter === 'Vše' ? cenikKomponent : cenikKomponent.filter(i => i.typ === this.filter);
        products.forEach(data => {
            const component = this.createComponent(data);
            const card = document.createElement('div');
            card.className = 'card';
            card.innerHTML = `
                <img src="${data.img}" alt="${data.model}" class="product-image">
                <h3>${component.getInfo().split('|')[0]}</h3>
                <p>${component.getInfo().split('|')[1] || ''}</p>
                <div class="price">${component.getCena()} Kč</div>
                <button class="buy-btn">Přidat</button>`;
            card.querySelector('.buy-btn')?.addEventListener('click', () => {
                this.cart.add(component);
            });
            grid.appendChild(card);
        });
    }
}
// =================================================================================
// 4. SPUŠTĚNÍ A UDÁLOSTI (Entry point)
// =================================================================================
window.onload = () => {
    // TRY-CATCH: Ošetření kritických chyb (pokud chybí element v HTML, program nepadne)
    try {
        const shop = new PCShop();
        shop.start();
        const cartModal = document.getElementById('cart-modal');
        const orderModal = document.getElementById('order-modal');
        const overlay = document.getElementById('modal-overlay');
        const closeCartBtn = document.getElementById('close-cart');
        const closeOrderBtn = document.getElementById('close-order');
        const closeAllModals = () => {
            if (cartModal)
                cartModal.style.display = 'none';
            if (orderModal)
                orderModal.style.display = 'none';
            if (overlay)
                overlay.style.display = 'none';
        };
        // OVLÁDÁNÍ MODÁLNÍCH OKEN
        document.getElementById('cart-button')?.addEventListener('click', () => {
            closeAllModals();
            if (cartModal)
                cartModal.style.display = 'block';
            if (overlay)
                overlay.style.display = 'block';
        });
        closeCartBtn?.addEventListener('click', closeAllModals);
        closeOrderBtn?.addEventListener('click', closeAllModals);
        overlay?.addEventListener('click', closeAllModals);
        // PŘECHOD K OBJEDNÁVCE: Manipulace s DOMem (vložení dat do tabulky)
        document.getElementById('order-button')?.addEventListener('click', (e) => {
            e.preventDefault();
            if (shop.cart.isEmpty()) {
                alert('Košík je prázdný.');
                return;
            }
            const orderTable = document.getElementById('order-table');
            if (!orderTable)
                return;
            orderTable.innerHTML = `<thead><tr><th>Položka</th><th class="text-right">Cena</th></tr></thead>
                                    <tbody></tbody><tfoot><tr><td>Celkem</td><td class="text-right">${shop.cart.getTotal()} Kč</td></tr></tfoot>`;
            const tbody = orderTable.querySelector('tbody');
            if (tbody) {
                shop.cart.getItems().forEach(item => {
                    const row = document.createElement('tr');
                    row.innerHTML = `<td>${item.getInfo()}</td><td class="text-right">${item.getCena()} Kč</td>`;
                    tbody.appendChild(row);
                });
            }
            if (cartModal)
                cartModal.style.display = 'none';
            if (orderModal)
                orderModal.style.display = 'block';
        });
        // ODESLÁNÍ: Validace vstupu a vyčištění košíku
        document.getElementById('submit-order')?.addEventListener('click', () => {
            const nameEl = document.getElementById('customer-name');
            if (!nameEl?.value.trim()) {
                alert('Vyplňte údaje.');
                return;
            }
            document.getElementById('order-confirmation').innerText = `Děkujeme, objednávka byla přijata.`;
            shop.cart.clear(); // Košík je opět prázdný
        });
    }
    catch (e) {
        console.error("Chyba aplikace:", e.message);
    }
};
