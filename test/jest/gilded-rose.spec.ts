import { Item, GildedRose } from "@/gilded-rose";

describe("Gilded Rose", () => {
  it("should return the correct item name", () => {
    const gildedRose = new GildedRose([new Item("foo", 0, 0)]);
    const items = gildedRose.updateQuality();

    expect(items[0].name).toBe("foo");
  });

  it("should decrease sellIn and quality for normal items", () => {
    const gildedRose = new GildedRose([new Item("Normal Item", 10, 20)]);
    const items = gildedRose.updateQuality();

    expect(items[0].sellIn).toBe(9);
    expect(items[0].quality).toBe(19);
  });

  it("should not decrease quality below 0", () => {
    const gildedRose = new GildedRose([new Item("Normal Item", 10, 0)]);
    const items = gildedRose.updateQuality();

    expect(items[0].quality).toBe(0);
  });

  it("should increase quality for Aged Brie", () => {
    const gildedRose = new GildedRose([new Item("Aged Brie", 10, 40)]);
    const items = gildedRose.updateQuality();

    expect(items[0].sellIn).toBe(9);
    expect(items[0].quality).toBe(41);
  });

  it("should not increase quality above 50", () => {
    const gildedRose = new GildedRose([new Item("Aged Brie", 10, 50)]);
    const items = gildedRose.updateQuality();

    expect(items[0].quality).toBe(50);
  });

  it("should increase quality by 2 for Aged Brie when sellIn is below 0", () => {
    const gildedRose = new GildedRose([new Item("Aged Brie", -1, 48)]);
    const items = gildedRose.updateQuality();

    expect(items[0].quality).toBe(50);
  });

  it("should increase quality by 2 for Backstage passes with sellIn < 10", () => {
    const gildedRose = new GildedRose([
      new Item("Backstage passes to a TAFKAL80ETC concert", 9, 20),
    ]);
    const items = gildedRose.updateQuality();

    expect(items[0].quality).toBe(22);
  });

  it("should increase quality by 3 for Backstage passes with sellIn < 5", () => {
    const gildedRose = new GildedRose([
      new Item("Backstage passes to a TAFKAL80ETC concert", 4, 20),
    ]);
    const items = gildedRose.updateQuality();

    expect(items[0].quality).toBe(23);
  });

  it("should drop quality to 0 for Backstage passes after the concert", () => {
    const gildedRose = new GildedRose([
      new Item("Backstage passes to a TAFKAL80ETC concert", 0, 20),
    ]);
    const items = gildedRose.updateQuality();

    expect(items[0].quality).toBe(0);
  });

  it("should not decrease quality or sellIn for Sulfuras", () => {
    const gildedRose = new GildedRose([
      new Item("Sulfuras, Hand of Ragnaros", 0, 80),
    ]);
    const items = gildedRose.updateQuality();

    expect(items[0].sellIn).toBe(0);
    expect(items[0].quality).toBe(80);
  });

  it("should decrease quality twice as fast once the sellIn date has passed", () => {
    const gildedRose = new GildedRose([new Item("Normal Item", 0, 20)]);
    const items = gildedRose.updateQuality();

    expect(items[0].sellIn).toBe(-1);
    expect(items[0].quality).toBe(18);
  });
});
