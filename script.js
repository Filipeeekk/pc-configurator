"use strict";
class HardwareComponent {
    znacka;
    model;
    cena;
    constructor(znacka, model, cena) {
        this.znacka = znacka;
        this.model = model;
        this.cena = cena;
    }
}
class CPU extends HardwareComponent {
    cores;
    freq;
    constructor(znacka, model, cena, cores, freq) {
        super(znacka, model, cena);
        this.cores = cores;
        this.freq = freq;
    }
    getInfo() {
        return `CPU: ${this.znacka} ${this.model}, ${this.cena} jader, ${this.freq} GHz`;
    }
}
class GPU extends HardwareComponent {
    vram;
    constructor(znacka, model, cena, vram) {
        super(znacka, model, cena);
        this.vram = vram;
    }
    getInfo() {
        return `GPU: ${this.znacka} ${this.model}, ${this.vram} GB VRAM`;
    }
}
class Motherboard extends HardwareComponent {
    socket;
    constructor(znacka, model, cena, socket) {
        super(znacka, model, cena);
        this.socket = socket;
    }
    getInfo() {
        return `Motherboard: ${this.socket}`;
    }
}
class RAM extends HardwareComponent {
    size;
    constructor(znacka, model, cena, size) {
        super(znacka, model, cena);
        this.size = size;
    }
    getInfo() {
        return `RAM: ${this.size} GB`;
    }
}
class Storage extends HardwareComponent {
    capacity;
    constructor(znacka, model, cena, capacity) {
        super(znacka, model, cena);
        this.capacity = capacity;
    }
    getInfo() {
        return `Storage: ${this.capacity} GB`;
    }
}
class PSU extends HardwareComponent {
    watts;
    constructor(znacka, model, cena, watts) {
        super(znacka, model, cena);
        this.watts = watts;
    }
    getInfo() {
        return `PSU: ${this.watts} W`;
    }
}
class Cart {
    items = [];
    add(item) {
        this.items.push(item);
    }
    showCart() {
        let total = 0;
        console.log("===== KOŠÍK =====");
        for (let item of this.items) {
            console.log(item.getInfo());
            console.log("Cena:", item.price, "Kč\n");
            total += item.price;
        }
        console.log("CELKEM:", total, "Kč");
    }
}
const cpu = new CPU("AMD", "Ryzen 7", 10000, 8, 4.2);
const gpu = new GPU("NVIDIA", "RTX 4070", 16000, 12);
const mb = new Motherboard("MSI", "B650", 4500, "AM5");
const ram = new RAM("Kingston", "Fury", 2000, 32);
const ssd = new Storage("Samsung", "980", 3000, 1000);
const psu = new PSU("Corsair", "RM750", 2500, 750);
const cart = new Cart();
cart.add(cpu);
cart.add(gpu);
cart.add(mb);
cart.add(ram);
cart.add(ssd);
cart.add(psu);
cart.showCart();
