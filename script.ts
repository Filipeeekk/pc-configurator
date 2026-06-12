import { cenikKomponent } from './data';

// =================================================================================
// 1. DATOVÁ ABSTRAKCE (Třídy)
// =================================================================================

/**
 * Abstraktní třída HardwareComponent
 * ARCHITEKTURA: Slouží jako "šablona". Nemůžeme vytvořit obecnou komponentu, 
 * vždy musí jít o konkrétní typ (CPU, GPU...). Tím vynucujeme správnou strukturu.
 */
abstract class HardwareComponent {
    // ZAPOUZDŘENÍ : Vlastnosti jsou 'private', takže k nim 
    // zvenčí nikdo nemůže přistoupit a náhodně je změnit.
    constructor(private znacka: string, private model: string, private cena: number) {   
        // VALIDACE: Kontrola dat při vzniku objektu. Pokud jsou špatná, 
        // program hodí chybu hned, ne až později při výpočtu.
        if (!znacka.trim() || !model.trim()) throw new Error("Neplatná data.");
    }
    
    // PUBLIC ROZHRANÍ (Interface): Ven vystrkujeme pouze metody, které 
    // uživatel nebo košík potřebuje k práci.
    public getCena(): number { return this.cena; }
    
    // PROTECTED: Dostupná pouze pro tuto třídu a její potomky (CPU, GPU...), 
    // pro zbytek světa je neviditelná.
    protected getZakladniInfo(): string { return `${this.znacka} ${this.model}`; }
    
    // ABSTRAKTNÍ METODA: Nutí každého potomka, aby definoval, jak se popíše.
    // Díky tomu můžeme mít pole různých komponent a u každé zavolat getInfo().
    public abstract getInfo(): string;
}

// DĚDIČNOST (Inheritance): CPU dědí vše od HardwareComponent 
// a přidává si specifické parametry (cores, freq).
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

// =================================================================================
// 2. LOGIKA KOŠÍKU
// =================================================================================

class Cart {
    // PRIVATE: Seznam položek je zamčen. Nikdo nemůže 
    // ručně přepsat pole 'items', musí použít metody add() a remove().
    private items: HardwareComponent[] = [];

    public add(item: HardwareComponent): void {
        this.items.push(item);
        this.updateUI(); //Vždy po změně dat aktualizuje zobrazení
    }

    public remove(index: number): void {
        this.items.splice(index, 1);
        this.updateUI();
    }

    // PRIVÁTNÍ METODA: Tato logika patří pouze dovnitř košíku.
    private updateUI(): void {
        const cartBtn = document.getElementById('cart-button');
        const cartList = document.getElementById('cart-items');
        const cartTotal = document.getElementById('cart-total');

        if (!cartBtn || !cartList || !cartTotal) return;

        let total = 0;
        cartList.innerHTML = ""; // Reset DOMu: smaže starý obsah a vytvoříme nový

        this.items.forEach((item, index) => {
            total += item.getCena();
            
            const div = document.createElement('div');
            // Stylizace přímo přes JS
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
    public getTotal(): number {
        return this.items.reduce((sum, item) => sum + item.getCena(), 0);
    }

    public isEmpty(): boolean { return this.items.length === 0; }
    public getItems(): HardwareComponent[] { return this.items.slice(); } // Vrací kopii pole, aby někdo omylem neměnil originál
    public clear(): void { this.items = []; this.updateUI(); }
}

// =================================================================================
// 3. ŘÍDÍCÍ LOGIKA OBCHODU
// =================================================================================

class PCShop {
    public cart = new Cart();

    public start(): void {
        const grid = document.getElementById('product-grid');
        if (!grid) return;

        // TOVÁRNÍ VZOR (Factory): Převádí data z JSONu na objekty
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
                <img src="${data.img}" alt="${data.model}" class="product-image">
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

        const closeAllModals = () => {
            if (cartModal) cartModal.style.display = 'none';
            if (orderModal) orderModal.style.display = 'none';
            if (overlay) overlay.style.display = 'none';
        };

        // OVLÁDÁNÍ MODÁLNÍCH OKEN
        document.getElementById('cart-button')?.addEventListener('click', () => {
            closeAllModals();
            if (cartModal) cartModal.style.display = 'block';
            if (overlay) overlay.style.display = 'block';
        });
        document.getElementById('close-cart')?.addEventListener('click', () => {
            closeAllModals();
        });
        document.getElementById('close-order')?.addEventListener('click', () => {
            closeAllModals();
        });
        overlay?.addEventListener('click', () => {
            closeAllModals();
        });

        // PŘECHOD K OBJEDNÁVCE: Manipulace s DOMem (vložení dat do tabulky)
        document.getElementById('order-button')?.addEventListener('click', (e) => {
            e.preventDefault();
            if (shop.cart.isEmpty()) { alert('Košík je prázdný.'); return; }

            const orderTable = document.getElementById('order-table') as HTMLTableElement | null;
            if (!orderTable) return;

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

            if (cartModal) cartModal.style.display = 'none';
            if (orderModal) orderModal.style.display = 'block';
        });

        // ODESLÁNÍ: Validace vstupu a vyčištění košíku
        document.getElementById('submit-order')?.addEventListener('click', () => {
            const nameEl = document.getElementById('customer-name') as HTMLInputElement;
            if (!nameEl?.value.trim()) { alert('Vyplňte údaje.'); return; }
            
            document.getElementById('order-confirmation')!.innerText = `Děkujeme, objednávka byla přijata.`;
            shop.cart.clear(); // Košík je opět prázdný

           
        });

    } catch (e: any) {
        console.error("Chyba aplikace:", e.message);
    }
};