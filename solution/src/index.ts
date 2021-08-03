import { parseProduct, Product } from "./vending-machine/products";
import { calculateChangeAndGetCoins, parseCoinsGetSum } from "./vending-machine/coins";

export type VendingAction = { change: number[], product: Product }

export function getVendingResult(command: string): VendingAction {
    const inputArray = command.split(" ");
    const productString: string | undefined = inputArray.pop();

    const product: Product = parseProduct(productString);
    const moneyDeposited: number = parseCoinsGetSum(inputArray);
    const coinsReturned: number[] = calculateChangeAndGetCoins(moneyDeposited, product);

    return {
        product: product,
        change: coinsReturned,
    }
}
