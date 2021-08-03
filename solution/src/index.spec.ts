import { getVendingResult } from './index';
import { parseProduct, Product } from "./vending-machine/products";
import { calculateCoinsForChange, parseCoinsGetSum } from "./vending-machine/coins";

describe('getVendingResult', () => {
    it('should return product B and 14 cents for 1.40 USD with product B selected', () => {
        expect(getVendingResult('50 50 20 20 B')).toEqual({
            change: [10, 2, 2],
            product: 'B',
        });
    });

    it('should return product C and no change for 2.33 USD with product C selected', () => {
        expect(getVendingResult('50 50 50 50 20 10 2 1 C')).toEqual({
            change: [],
            product: 'C',
        });
    });

    it('should fail for 70 cents with product A selected', () => {
        expect(() => getVendingResult('50 10 10 A'))
            .toThrow("Not enough money to buy product A. Missing 25 cents")
    });

    // TODO
    // Any other cases?
    it('correct product can be parsed', () => {
        expect(parseProduct('A')).toEqual(Product.A)
    });

    it('incorrect product cannot be parsed', () => {
        expect(() => parseProduct('Z')).toThrow("Z is not a supported product!");
    });

    it('coin values are parsed correctly', () => {
        expect(parseCoinsGetSum(["50", "20", "10", "5", "2", "1"])).toEqual(88);
    });

    it('coin values are parsed correctly', () => {
        expect(() => parseCoinsGetSum(["Z"])).toThrow("Cannot parse coin value Z. It's not numeric");
    });

    it('coin values are parsed correctly', () => {
        expect(() => parseCoinsGetSum(["51"])).toThrow(`Coin value 51 is not allowed!`);
    });

    it('precisely all coins used in the change', () => {
        expect(calculateCoinsForChange(88)).toEqual([50, 20, 10, 5, 2, 1]);
    });
});
