export class Item {
  name: string;
  sellIn: number;
  quality: number;

  constructor(name: string, sellIn: number, quality: number) {
    this.name = name;
    this.sellIn = sellIn;
    this.quality = quality;
  }
}

export class GildedRose {
  items: Array<Item>;

  constructor(items = [] as Array<Item>) {
    this.items = items;
  }

  updateQuality() {
    this.items.forEach((item) => {
      this.updateItem(item);
    });

    return this.items;
  }

  private updateItem(item: Item) {
    if (item.name === "Sulfuras, Hand of Ragnaros") {
      return;
    }

    this.updateSellIn(item);
    this.updateQualityForItem(item);
  }

  private updateSellIn(item: Item) {
    item.sellIn -= 1;
  }

  private updateQualityForItem(item: Item) {
    switch (item.name) {
      case "Aged Brie":
        this.updateAgedBrie(item);
        break;
      case "Backstage passes to a TAFKAL80ETC concert":
        this.updateBackstagePasses(item);
        break;
      default:
        this.updateNormalItem(item);
    }
  }

  private updateAgedBrie(item: Item) {
    this.increaseQuality(item);

    if (item.sellIn < 0) {
      this.increaseQuality(item);
    }
  }

  private updateBackstagePasses(item: Item) {
    this.increaseQuality(item);

    if (item.sellIn < 10) {
      this.increaseQuality(item);
    }

    if (item.sellIn < 5) {
      this.increaseQuality(item);
    }

    if (item.sellIn < 0) {
      item.quality = 0;
    }
  }

  private updateNormalItem(item: Item) {
    this.decreaseQuality(item);

    if (item.sellIn < 0) {
      this.decreaseQuality(item);
    }
  }

  private increaseQuality(item: Item) {
    if (item.quality < 50) {
      item.quality += 1;
    }
  }

  private decreaseQuality(item: Item) {
    if (item.quality > 0) {
      item.quality -= 1;
    }
  }
}
