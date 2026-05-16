"use strict";
// Pole s daty 
const cenikKomponent = [
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
    // === Motherboard ===
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
    // === Storage ===
    { typ: 'Storage', znacka: "Samsung", model: "980 NVMe", cena: 2200, param1: 1000 },
    { typ: 'Storage', znacka: "Samsung", model: "990 PRO NVMe", cena: 4500, param1: 2000 },
    { typ: 'Storage', znacka: "Kingston", model: "KC3000", cena: 2100, param1: 1000 },
    { typ: 'Storage', znacka: "Crucial", model: "P3 Plus", cena: 3600, param1: 2000 },
    { typ: 'Storage', znacka: "WD", model: "Black SN850X", cena: 8900, param1: 4000 },
    // === PSU ===
    { typ: 'PSU', znacka: "Corsair", model: "RM750x", cena: 2800, param1: 750 },
    { typ: 'PSU', znacka: "Corsair", model: "RM1000e", cena: 4200, param1: 1000 },
    { typ: 'PSU', znacka: "Seasonice", model: "Focus GX-650", cena: 2400, param1: 650 },
    { typ: 'PSU', znacka: "Be quiet!", model: "Pure Power 12 M", cena: 3100, param1: 850 },
    { typ: 'PSU', znacka: "MSI", model: "MAG A850GL", cena: 2700, param1: 850 }
];
//Vzor pro všechny komponenty
class HardwareComponent {
    znacka;
    model;
    cena;
    // Konstruktor: zkontroluje správnost dat a vytvoří komponentu
    constructor(znacka, model, cena) {
        if (!znacka.trim() || !model.trim())
            throw new Error("Značka a model nesmí být prázdné.");
        if (cena < 0)
            throw new Error("Cena nesmí být záporná.");
        this.znacka = znacka;
        this.model = model;
        this.cena = cena;
    }
    // Veřejná funkce pro bezpečné přečtení ceny zvenčí
    getCena() {
        return this.cena;
    }
    // Pomocné funkce pro skládání textu v podtřídách
    getZnacka() { return this.znacka; }
    getModel() { return this.model; }
    getZakladniInfo() { return `${this.znacka} ${this.model}`; }
}
// PODTŘÍDY: Specifičtí potomci, kteří dědí z HardwareComponent
// Procesor (přidává jádra a frekvenci)
class CPU extends HardwareComponent {
    cores;
    freq;
    constructor(znacka, model, cena, cores, freq) {
        super(znacka, model, cena);
        this.cores = cores;
        this.freq = freq;
        if (cores <= 0 || freq <= 0)
            throw new Error("Parametry musí být kladné.");
    }
    getInfo() { return `[CPU] ${this.getZakladniInfo()} | Jádra: ${this.cores}, Takt: ${this.freq} GHz`; }
}
// Grafická karta (přidává paměť VRAM)
class GPU extends HardwareComponent {
    vram;
    constructor(znacka, model, cena, vram) {
        super(znacka, model, cena);
        this.vram = vram;
        if (vram <= 0)
            throw new Error("Parametr musí být kladný.");
    }
    getInfo() { return `[GPU] ${this.getZakladniInfo()} | VRAM: ${this.vram} GB`; }
}
// Základní deska (přidává patici/socket)
class Motherboard extends HardwareComponent {
    socket;
    constructor(znacka, model, cena, socket) {
        super(znacka, model, cena);
        this.socket = socket;
        if (!socket.trim())
            throw new Error("Socket nesmí být prázdný.");
    }
    getInfo() { return `[Základní deska] ${this.getZakladniInfo()} | Socket: ${this.socket}`; }
}
// Operační paměť (přidává kapacitu RAM)
class RAM extends HardwareComponent {
    size;
    constructor(znacka, model, cena, size) {
        super(znacka, model, cena);
        this.size = size;
        if (size <= 0)
            throw new Error("Parametr musí být kladný.");
    }
    getInfo() { return `[RAM] ${this.getZakladniInfo()} | Kapacita: ${this.size} GB`; }
}
// Úložiště (přidává kapacitu disku)
class Storage extends HardwareComponent {
    capacity;
    constructor(znacka, model, cena, capacity) {
        super(znacka, model, cena);
        this.capacity = capacity;
        if (capacity <= 0)
            throw new Error("Parametr musí být kladný.");
    }
    getInfo() { return `[Úložiště] ${this.getZakladniInfo()} | Kapacita: ${this.capacity} GB`; }
}
// Napájecí zdroj (přidává výkon ve Wattech)
class PSU extends HardwareComponent {
    watts;
    constructor(znacka, model, cena, watts) {
        super(znacka, model, cena);
        this.watts = watts;
        if (watts <= 0)
            throw new Error("Parametr musí být kladný.");
    }
    getInfo() { return `[Zdroj] ${this.getZakladniInfo()} | Výkon: ${this.watts} W`; }
}
// KOŠÍK: Správa vybraných položek a výpis do konzole
class Cart {
    // Pole pro shromažďování vytvořených komponent
    items = [];
    // Přidá komponentu do pole košíku
    add(item) {
        this.items.push(item);
    }
    // Projde celý košík, polymorfně vypíše info o každé položce a sečte cenu
    showCart() {
        let total = 0;
        console.log("========== NÁKUPNÍ KOŠÍK (Celá nabídka) ==========");
        for (const item of this.items) {
            console.log(item.getInfo()); // Polymorfní výpis – sám pozná typ podtřídy
            console.log("Cena:", item.getCena(), "Kč");
            console.log("");
            total += item.getCena();
        }
        console.log("==================================================");
        console.log("CELKEM ZA VŠECHNY POLOŽKY:", total, "Kč");
    }
}
// SPUŠTĚNÍ APLIKACE: Převod dat na objekty a jejich otestování
class PCShop {
    start() {
        const cart = new Cart();
        for (const data of cenikKomponent) {
            // Pro každý řádek v ceníku vytvoříme konkrétní objekt podle jeho typu
            if (data.typ === 'CPU') {
                const procesor = new CPU(data.znacka, data.model, data.cena, data.param1, data.param2);
                cart.add(procesor);
            }
            else if (data.typ === 'GPU') {
                const grafika = new GPU(data.znacka, data.model, data.cena, data.param1);
                cart.add(grafika);
            }
            else if (data.typ === 'Motherboard') {
                const deska = new Motherboard(data.znacka, data.model, data.cena, data.param1);
                cart.add(deska);
            }
            else if (data.typ === 'RAM') {
                const pamet = new RAM(data.znacka, data.model, data.cena, data.param1);
                cart.add(pamet);
            }
            else if (data.typ === 'Storage') {
                const disk = new Storage(data.znacka, data.model, data.cena, data.param1);
                cart.add(disk);
            }
            else if (data.typ === 'PSU') {
                const zdroj = new PSU(data.znacka, data.model, data.cena, data.param1);
                cart.add(zdroj);
            }
        }
        cart.showCart();
    }
}
// Spuštění celého programu
try {
    const shop = new PCShop();
    shop.start();
}
finally { }
