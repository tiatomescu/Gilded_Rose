class Item {
	constructor(name, sellIn, quality) {
		this.name = name;
		this.sellIn = sellIn;
		this.quality = quality;
	}
}

class Shop {
	constructor(items = []) {
		this.items = items;
	}
	updateQuality(conjured) {
		this.items = this.items.map((item) => {
			if (item.quality == 50) return item;
			switch (item.name) {
				case "Backstage passes to a TAFKAL80ETC concert":
					if (item.sellIn <= 10) {
						item.quality++;
					}
					if (item.sellIn <= 5) {
						item.quality++;
					}
					item.quality++;
					if (item.sellIn === 0) {
						item.quality = 0;
					}
					break;
				case "Aged Brie":
					item.quality++;
					break;
				case "Sulfuras, Hand of Ragnaros":
					break;
				default:
					let degradeRate = 1;
					if (conjured) degradeRate = 2;
					if (item.sellIn == 0 && item.quality > 2) {
						item.quality -= 2 * degradeRate;
					} else if (item.quality > 1) {
						item.quality -= 1 * degradeRate;
					}
					break;
			}
			return item;
		});
		return this.items;
	}
}

module.exports = {
	Item,
	Shop,
};
