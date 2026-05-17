"use strict";
// === 1. DATOVÁ ČÁST (Tvůj ceník) ===
const cenikKomponent = [
    { typ: 'CPU', znacka: "AMD", model: "Ryzen 5 7600", cena: 5500, param1: 6, param2: 3.8 },
    { typ: 'CPU', znacka: "AMD", model: "Ryzen 7 7800X3D", cena: 10500, param1: 8, param2: 4.2 },
    { typ: 'CPU', znacka: "AMD", model: "Ryzen 9 7950X", cena: 14000, param1: 16, param2: 4.5 },
    { typ: 'CPU', znacka: "Intel", model: "Core i5-14600K", cena: 7800, param1: 14, param2: 3.5 },
    { typ: 'CPU', znacka: "Intel", model: "Core i9-14900K", cena: 14500, param1: 24, param2: 3.2 },
    { typ: 'GPU', znacka: "NVIDIA", model: "RTX 4060 Ti", cena: 10500, param1: 8 },
    { typ: 'GPU', znacka: "NVIDIA", model: "RTX 4070 Super", cena: 16500, param1: 12 },
    { typ: 'GPU', znacka: "NVIDIA", model: "RTX 4080 Super", cena: 28000, param1: 16 },
    { typ: 'GPU', znacka: "AMD", model: "Radeon RX 7600 XT", cena: 8500, param1: 16 },
    { typ: 'GPU', znacka: "AMD", model: "Radeon RX 7900 XTX", cena: 25500, param1: 24 },
    { typ: 'Motherboard', znacka: "MSI", model: "B650 GAMING PLUS", cena: 4200, param1: "AM5" },
    { typ: 'Motherboard', znacka: "ASUS", model: "ROG STRIX B650-A", cena: 6000, param1: "AM5" },
    { typ: 'Motherboard', znacka: "GIGABYTE", model: "X670E AORUS", cena: 8500, param1: "AM5" },
    { typ: 'Motherboard', znacka: "ASUS", model: "PRIME Z790-P", cena: 5100, param1: "LGA1700" },
    { typ: 'Motherboard', znacka: "MSI", model: "MAG Z790 TOMAHAWK", cena: 6800, param1: "LGA1700" },
    { typ: 'RAM', znacka: "Kingston", model: "Fury Beast DDR5", cena: 2100, param1: 16 },
    { typ: 'RAM', znacka: "Kingston", model: "Fury Renegade DDR5", cena: 3400, param1: 32 },
    { typ: 'RAM', znacka: "G.Skill", model: "Flare X5 DDR5", cena: 3100, param1: 32 },
    { typ: 'RAM', znacka: "Corsair", model: "Vengeance DDR5", cena: 5800, param1: 64 },
    { typ: 'RAM', znacka: "Crucial", model: "Classic DDR5", cena: 1100, param1: 8 },
    { typ: 'Storage', znacka: "Samsung", model: "980 NVMe", cena: 2200, param1: 1000 },
    { typ: 'Storage', znacka: "Samsung", model: "990 PRO NVMe", cena: 4500, param1: 2000 },
    { typ: 'Storage', znacka: "Kingston", model: "KC3000", cena: 2100, param1: 1000 },
    { typ: 'Storage', znacka: "Crucial", model: "P3 Plus", cena: 3600, param1: 2000 },
    { typ: 'Storage', znacka: "WD", model: "Black SN850X", cena: 8900, param1: 4000 },
    { typ: 'PSU', znacka: "Corsair", model: "RM750x", cena: 2800, param1: 750 },
    { typ: 'PSU', znacka: "Corsair", model: "RM1000e", cena: 4200, param1: 1000 },
    { typ: 'PSU', znacka: "Seasonic", model: "Focus GX-650", cena: 2400, param1: 650 },
    { typ: 'PSU', znacka: "Be quiet!", model: "Pure Power 12 M", cena: 3100, param1: 850 },
    { typ: 'PSU', znacka: "MSI", model: "MAG A850GL", cena: 2700, param1: 850 }
];
// === 2. LOGICKÁ ČÁST (Třídy) ===
class HardwareComponent {
    znacka;
    model;
    cena;
    constructor(znacka, model, cena) {
        this.znacka = znacka;
        this.model = model;
        this.cena = cena;
        if (!znacka.trim() || !model.trim())
            throw new Error("Neplatná data.");
    }
    getCena() { return this.cena; }
    getZakladniInfo() { return `${this.znacka} ${this.model}`; }
}
class CPU extends HardwareComponent {
    cores;
    freq;
    constructor(z, m, c, cores, freq) {
        super(z, m, c);
        this.cores = cores;
        this.freq = freq;
    }
    getInfo() { return `[CPU] ${this.getZakladniInfo()} | ${this.cores} jader`; }
}
class GPU extends HardwareComponent {
    vram;
    constructor(z, m, c, vram) {
        super(z, m, c);
        this.vram = vram;
    }
    getInfo() { return `[GPU] ${this.getZakladniInfo()} | ${this.vram}GB VRAM`; }
}
class Motherboard extends HardwareComponent {
    socket;
    constructor(z, m, c, socket) {
        super(z, m, c);
        this.socket = socket;
    }
    getInfo() { return `[MB] ${this.getZakladniInfo()} | Socket ${this.socket}`; }
}
class RAM extends HardwareComponent {
    size;
    constructor(z, m, c, size) {
        super(z, m, c);
        this.size = size;
    }
    getInfo() { return `[RAM] ${this.getZakladniInfo()} | ${this.size}GB`; }
}
class Storage extends HardwareComponent {
    cap;
    constructor(z, m, c, cap) {
        super(z, m, c);
        this.cap = cap;
    }
    getInfo() { return `[Disk] ${this.getZakladniInfo()} | ${this.cap}GB`; }
}
class PSU extends HardwareComponent {
    watts;
    constructor(z, m, c, watts) {
        super(z, m, c);
        this.watts = watts;
    }
    getInfo() { return `[PSU] ${this.getZakladniInfo()} | ${this.watts}W`; }
}
// === 3. KOŠÍK A UI LOGIKA ===
class Cart {
    items = [];
    add(item) {
        this.items.push(item);
        this.updateUI();
    }
    // Metoda pro odstranění položky podle indexu
    remove(index) {
        this.items.splice(index, 1);
        this.updateUI();
    }
    updateUI() {
        const cartBtn = document.getElementById('cart-button');
        const cartList = document.getElementById('cart-items');
        const cartTotal = document.getElementById('cart-total');
        if (!cartBtn || !cartList || !cartTotal)
            return;
        let total = 0;
        cartList.innerHTML = "";
        this.items.forEach((item, index) => {
            total += item.getCena();
            const div = document.createElement('div');
            div.style.display = "flex";
            div.style.justifyContent = "space-between";
            div.style.marginBottom = "10px";
            div.style.padding = "5px";
            div.style.borderBottom = "1px solid #ddd";
            div.innerHTML = `
                <span>${item.getInfo()} - <strong>${item.getCena()} Kč</strong></span>
                <button class="remove-btn" style="background:#ff4d4d; color:white; border:none; border-radius:3px; cursor:pointer;">Odebrat</button>
            `;
            // Event listener pro odebírání
            div.querySelector('.remove-btn')?.addEventListener('click', () => {
                this.remove(index);
            });
            cartList.appendChild(div);
        });
        cartBtn.innerText = `🛒 Košík (${total} Kč)`;
        cartTotal.innerText = `Celkem: ${total} Kč`;
    }
}
class PCShop {
    cart = new Cart();
    start() {
        const grid = document.getElementById('product-grid');
        if (!grid)
            return;
        for (const data of cenikKomponent) {
            let component;
            if (data.typ === 'CPU')
                component = new CPU(data.znacka, data.model, data.cena, data.param1, data.param2);
            else if (data.typ === 'GPU')
                component = new GPU(data.znacka, data.model, data.cena, data.param1);
            else if (data.typ === 'Motherboard')
                component = new Motherboard(data.znacka, data.model, data.cena, data.param1);
            else if (data.typ === 'RAM')
                component = new RAM(data.znacka, data.model, data.cena, data.param1);
            else if (data.typ === 'Storage')
                component = new Storage(data.znacka, data.model, data.cena, data.param1);
            else
                component = new PSU(data.znacka, data.model, data.cena, data.param1);
            const card = document.createElement('div');
            card.className = 'card';
            card.innerHTML = `
                <h3>${component.getInfo().split('|')[0]}</h3>
                <p>${component.getInfo().split('|')[1] || ""}</p>
                <div class="price">${component.getCena()} Kč</div>
                <button class="buy-btn">Přidat</button>
            `;
            card.querySelector('.buy-btn')?.addEventListener('click', () => {
                this.cart.add(component);
            });
            grid.appendChild(card);
        }
    }
}
// Spuštění
window.onload = () => {
    try {
        const shop = new PCShop();
        shop.start();
    }
    catch (e) {
        console.error(e.message);
    }
};
