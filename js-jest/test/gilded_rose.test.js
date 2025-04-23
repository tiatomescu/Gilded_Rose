const { Item, Shop } = require("../src/gilded_rose.js");
// You need more tests than just the ones written here, this is just to get you started.
// USE COVERAGE GUTTERS TO GUIDE YOUR TEST WRITING
describe("Gilded Rose Pin Down Tests", () => {
	test("Normal items should degrade in quality by 1 each day", () => {
		let normalItem = new Item("normal", 10, 20); //build
		const gildedRose = new Shop([normalItem]);

		const items = gildedRose.updateQuality(); //operate

		expect(items[0].quality).toBe(19); //check
	});

	test('Quality of "Aged Brie" should increase by 1 each day', () => {
		let agedBrie = new Item("Aged Brie", 10, 20);
		const gildedRose = new Shop([agedBrie]);

		const items = gildedRose.updateQuality();

		expect(items[0].quality).toBe(21);
	});

	test('Quality of "Backstage passes" should increase by 3 when there are 5 days or less', () => {
		let backstagePass = new Item(
			"Backstage passes to a TAFKAL80ETC concert",
			5,
			20
		);
		const gildedRose = new Shop([backstagePass]);

		const items = gildedRose.updateQuality();

		expect(items[0].quality).toBe(23);
	});

	test("Once the sell by date has passed, Quality degrades twice as fast", () => {
		let freshFlowers = new Item("Fresh Flowers", 0, 20);
		const gildedRose = new Shop([freshFlowers]);

		const items = gildedRose.updateQuality();

		expect(items[0].quality).toBe(18);
	});

	test("The Quality of an item is never negative", () => {
		let freshFlowers = new Item("Fresh Flowers", 0, 0);
		const gildedRose = new Shop([freshFlowers]);

		const items = gildedRose.updateQuality();

		expect(items[0].quality).toBe(0);
	});

	test("The Quality of an item is never more than 50", () => {
		let agedBrie = new Item("Aged Brie", 10, 50);
		const gildedRose = new Shop([agedBrie]);

		const items = gildedRose.updateQuality();

		expect(items[0].quality).toBe(50);
	});

	test('"Sulfuras", being a legendary item, never has to be sold or decreases in Quality', () => {
		let sulfuras = new Item("Sulfuras, Hand of Ragnaros", 10, 20);
		const gildedRose = new Shop([sulfuras]);

		const items = gildedRose.updateQuality();

		expect(items[0].sellIn).toBe(10);
		expect(items[0].quality).toBe(20);
	});

	test('"Backstage passes", like aged brie, increases in Quality as its SellIn value approaches', () => {
		let backstage = new Item(
			"Backstage passes to a TAFKAL80ETC concert",
			12,
			20
		);
		const gildedRose = new Shop([backstage]);

		const items = gildedRose.updateQuality();

		expect(items[0].quality).toBe(21);
	});

	test("Quality increases by 2 when there are 10 days or less", () => {
		let backstage = new Item(
			"Backstage passes to a TAFKAL80ETC concert",
			10,
			20
		);
		const gildedRose = new Shop([backstage]);

		const items = gildedRose.updateQuality();

		expect(items[0].quality).toBe(22);
	});

	test("Quality drops to 0 after the concert", () => {
		let backstage = new Item(
			"Backstage passes to a TAFKAL80ETC concert",
			0,
			20
		);
		const gildedRose = new Shop([backstage]);

		const items = gildedRose.updateQuality();

		expect(items[0].quality).toBe(0);
	});

	test('"Conjured" items degrade in Quality twice as fast as normal items', () => {
		let freshFlowers = new Item("Fresh Flowers", 10, 20);
		const gildedRose = new Shop([freshFlowers]);

		const items = gildedRose.updateQuality(true);

		expect(items[0].quality).toBe(18);
	});

	test("Item returns something", () => {
		let freshFlowers = new Item("Fresh Flowers", 10, 20);
		const gildedRose = new Shop([freshFlowers]);

		const items = gildedRose.updateQuality();

		expect(items).toEqual([freshFlowers]);
	});

	test("Returns an empty array if there are no items", () => {
		const gildedRose = new Shop();
		const items = gildedRose.updateQuality();
		expect(items).toEqual([]);
	});

	test("Module exports ", () => {
		expect(Item).toBeTruthy();
		expect(Shop).toBeTruthy();
	});
});
