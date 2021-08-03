import { Product, productPriceChart } from "./products";

const allowedCoinValues: number[] = [50, 20, 10, 5, 2, 1];

export function parseCoinsGetSum(coinStrings: string[], coinValues = allowedCoinValues): number {
    let sum = 0;
    for (const s of coinStrings) {
        const parsed: number = Number(s);
        if (isNaN(parsed)) {
            throw new Error(`Cannot parse coin value ${s}. It's not numeric`)
        } else if (!coinValues.includes(parsed)) {
            throw new Error(`Coin value ${parsed} is not allowed!`);
        } else {
            sum += parsed;
        }
    }
    return sum;
}

export function calculateChangeAndGetCoins(moneyDeposited: number, product: Product) {
    const productPrice: number = productPriceChart[product];
    const moneyRemaining: number = moneyDeposited - productPrice;
    if (moneyRemaining < 0) {
        throw new Error(`Not enough money to buy product ${product}. Missing ${moneyRemaining * -1} cents`)
    }
    return calculateCoinsForChange(moneyRemaining);
}

export function calculateCoinsForChange(amount: number): number[] {
    let currentAmount = amount;
    let coinIndex = 0;
    const changeCoins: number[] = [];
    while (currentAmount > 0) {
        const currentCoin = allowedCoinValues[coinIndex];
        if (currentAmount >= currentCoin) {
            currentAmount -= currentCoin;
            changeCoins.push(currentCoin);
        } else {
            coinIndex++;
        }
    }
    return changeCoins;
}
