abstract class HardwareComponent {
  constructor(
    public znacka: string,
    public model: string,
    public cena: number
  ) {}

  abstract getInfo(): string;
}

class CPU extends HardwareComponent {
  constructor(
    znacka: string,
    model: string,
    cena: number,
    public cores: number,
    public freq: number
  ) {
    super(znacka, model, cena);
  }

  getInfo(): string {
    return `CPU: ${this.znacka} ${this.model}, ${this.cena} jader, ${this.freq} GHz`;
  }
}

class GPU extends HardwareComponent {
  constructor(
    znacka: string,
    model: string,
    cena: number,
    public vram: number
  ) {
    super(znacka, model, cena);
  }

  getInfo(): string {
    return `GPU: ${this.znacka} ${this.model}, ${this.vram} GB VRAM`;
  }
}

class Motherboard extends HardwareComponent {
  constructor(
    znacka: string,
    model: string,
    cena: number,
    public socket: string
  ) {
    super(znacka, model, cena);
  }

  getInfo(): string {
    return `Motherboard: ${this.socket}`;
  }
}

class RAM extends HardwareComponent {
  constructor(
    znacka: string,
    model: string,
    cena: number,
    public size: number
  ) {
    super(znacka, model, cena);
  }

  getInfo(): string {
    return `RAM: ${this.size} GB`;
  }
}

class Storage extends HardwareComponent {
  constructor(
    znacka: string,
    model: string,
    cena: number,
    public capacity: number
  ) {
    super(znacka, model, cena);
  }

  getInfo(): string {
    return `Storage: ${this.capacity} GB`;
  }
}

class PSU extends HardwareComponent {
  constructor(
    znacka: string,
    model: string,
    cena: number,
    public watts: number
  ) {
    super(znacka, model, cena);
  }

  getInfo(): string {
    return `PSU: ${this.watts} W`;
  }
}

class Cart {
  items: HardwareComponent[] = [];

  add(item: HardwareComponent) {
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
