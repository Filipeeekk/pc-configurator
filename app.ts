// === 1. DATOVÁ ČÁST (Tvůj ceník) ===

interface IComponentRawData {
    typ: 'CPU' | 'GPU' | 'Motherboard' | 'RAM' | 'Storage' | 'PSU';
    znacka: string;
    model: string;
    cena: number;
    param1: string | number;
    param2?: number;
}
// Pole s daty 
const cenikKomponent: IComponentRawData[] = [
        // === CPU ===
    { typ: 'CPU', znacka: "AMD", model: "Ryzen 5 7600", cena: 5500, param1: 6, param2: 3.8 },
    { typ: 'CPU', znacka: "AMD", model: "Ryzen 7 7800X3D", cena: 10500, param1: 8, param2: 4.2 },
    { typ: 'CPU', znacka: "AMD", model: "Ryzen 9 7950X", cena: 14000, param1: 16, param2: 4.5 },
    { typ: 'CPU', znacka: "Intel", model: "Core i5-14600K", cena: 7800, param1: 14, param2: 3.5 }, 
    { typ: 'CPU', znacka: "Intel", model: "Core i9-14900K", cena: 14500, param1: 24, param2: 3.2 }, 
        // === GPU ===
    { typ: 'GPU', znacka: "NVIDIA", model: "RTX 4060 Ti", cena: 10500, param1: 8 },
    { typ: 'GPU', znacka: "NVIDIA", model: "RTX 4070 Super", cena: 16500, param1: 12 },
    { typ: 'GPU', znacka: "NVIDIA", model: "RTX 4080 Super", cena: 28000, param1: 16 },
    { typ: 'GPU', znacka: "AMD", model: "Radeon RX 7600 XT", cena: 8500, param1: 16 },
    { typ: 'GPU', znacka: "AMD", model: "Radeon RX 7900 XTX", cena: 25500, param1: 24 },
        // === MOTHERBOARD ===
    { typ: 'Motherboard', znacka: "MSI", model: "B650 GAMING PLUS", cena: 4200, param1: "AM5" },
    { typ: 'Motherboard', znacka: "ASUS", model: "ROG STRIX B650-A", cena: 6000, param1: "AM5" },
    { typ: 'Motherboard', znacka: "GIGABYTE", model: "X670E AORUS", cena: 8500, param1: "AM5" },
    { typ: 'Motherboard', znacka: "ASUS", model: "PRIME Z790-P", cena: 5100, param1: "LGA1700" },
    { typ: 'Motherboard', znacka: "MSI", model: "MAG Z790 TOMAHAWK", cena: 6800, param1: "LGA1700" },
        // === RAM ===
    { typ: 'RAM', znacka: "Kingston", model: "Fury Beast DDR5", cena: 2100, param1: 16 },
    { typ: 'RAM', znacka: "Kingston", model: "Fury Renegade DDR5", cena: 3400, param1: 32 },
    { typ: 'RAM', znacka: "G.Skill", model: "Flare X5 DDR5", cena: 3100, param1: 32 },
    { typ: 'RAM', znacka: "Corsair", model: "Vengeance DDR5", cena: 5800, param1: 64 },
    { typ: 'RAM', znacka: "Crucial", model: "Classic DDR5", cena: 1100, param1: 8 },
        // === STORAGE ===
    { typ: 'Storage', znacka: "Samsung", model: "980 NVMe", cena: 2200, param1: 1000 },
    { typ: 'Storage', znacka: "Samsung", model: "990 PRO NVMe", cena: 4500, param1: 2000 },
    { typ: 'Storage', znacka: "Kingston", model: "KC3000", cena: 2100, param1: 1000 },
    { typ: 'Storage', znacka: "Crucial", model: "P3 Plus", cena: 3600, param1: 2000 },
    { typ: 'Storage', znacka: "WD", model: "Black SN850X", cena: 8900, param1: 4000 },
    // === PSU ===  
    { typ: 'PSU', znacka: "Corsair", model: "RM750x", cena: 2800, param1: 750 },
    { typ: 'PSU', znacka: "Corsair", model: "RM1000e", cena: 4200, param1: 1000 },
    { typ: 'PSU', znacka: "Seasonic", model: "Focus GX-650", cena: 2400, param1: 650 },
    { typ: 'PSU', znacka: "Be quiet!", model: "Pure Power 12 M", cena: 3100, param1: 850 },
    { typ: 'PSU', znacka: "MSI", model: "MAG A850GL", cena: 2700, param1: 850 }
];

// === 2. LOGICKÁ ČÁST (Třídy) ===

abstract class HardwareComponent {
    constructor(private znacka: string, private model: string, private cena: number) {
        if (!znacka.trim() || !model.trim()) throw new Error("Neplatná data.");
    }
    public getCena(): number { return this.cena; }
    protected getZakladniInfo(): string { return `${this.znacka} ${this.model}`; }
    public abstract getInfo(): string;
}

class CPU extends HardwareComponent {
    constructor(z: string, m: string, c: number, private cores: number, private freq: number) { super(z, m, c); }
    public getInfo(): string { return `[CPU] ${this.getZakladniInfo()} | ${this.cores} jader`; }
}

class GPU extends HardwareComponent {
    constructor(z: string, m: string, c: number, private vram: number) { super(z, m, c); }
    public getInfo(): string { return `[GPU] ${this.getZakladniInfo()} | ${this.vram}GB VRAM`; }
}

class Motherboard extends HardwareComponent {
    constructor(z: string, m: string, c: number, private socket: string) { super(z, m, c); }
    public getInfo(): string { return `[MB] ${this.getZakladniInfo()} | Socket ${this.socket}`; }
}

class RAM extends HardwareComponent {
    constructor(z: string, m: string, c: number, private size: number) { super(z, m, c); }
    public getInfo(): string { return `[RAM] ${this.getZakladniInfo()} | ${this.size}GB`; }
}

class Storage extends HardwareComponent {
    constructor(z: string, m: string, c: number, private cap: number) { super(z, m, c); }
    public getInfo(): string { return `[Disk] ${this.getZakladniInfo()} | ${this.cap}GB`; }
}

class PSU extends HardwareComponent {
    constructor(z: string, m: string, c: number, private watts: number) { super(z, m, c); }
    public getInfo(): string { return `[PSU] ${this.getZakladniInfo()} | ${this.watts}W`; }
}

// === 3. KOŠÍK A UI LOGIKA ===


class Cart {
    private items: HardwareComponent[] = [];

    public add(item: HardwareComponent): void {
        this.items.push(item);
        this.updateUI();
    }

    // Metoda pro odstranění položky podle indexu
    public remove(index: number): void {
        this.items.splice(index, 1);
        this.updateUI();
    }

    private updateUI(): void {
        const cartBtn = document.getElementById('cart-button');
        const cartList = document.getElementById('cart-items');
        const cartTotal = document.getElementById('cart-total');

        if (!cartBtn || !cartList || !cartTotal) return;

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
    private cart = new Cart();

    public start(): void {
        const grid = document.getElementById('product-grid');
        if (!grid) return;

        for (const data of cenikKomponent) {
            let component: HardwareComponent;

            if (data.typ === 'CPU') component = new CPU(data.znacka, data.model, data.cena, data.param1 as number, data.param2!);
            else if (data.typ === 'GPU') component = new GPU(data.znacka, data.model, data.cena, data.param1 as number);
            else if (data.typ === 'Motherboard') component = new Motherboard(data.znacka, data.model, data.cena, data.param1 as string);
            else if (data.typ === 'RAM') component = new RAM(data.znacka, data.model, data.cena, data.param1 as number);
            else if (data.typ === 'Storage') component = new Storage(data.znacka, data.model, data.cena, data.param1 as number);
            else component = new PSU(data.znacka, data.model, data.cena, data.param1 as number);

            const card = document.createElement('div');
            card.className = 'card';
            card.innerHTML = `
                <h3>${component.getInfo().split('|')[0]}</h3>
                <p>${component.getInfo().split('|')[1] || ""}</p>
                <div class="price">${component.getCena()} Kč</div>
                <button class="buy-btn">Přidat</button>`;

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
    } catch (e: any) {
        console.error(e.message);
    }
};