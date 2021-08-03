export enum Product {
    A = "A",
    B = "B",
    C = "C",
}

export const productPriceChart: Record<Product, number> = {
    [Product.A]: 95,
    [Product.B]: 126,
    [Product.C]: 233,
}

export function parseProduct(inputProduct: string | undefined) {
    const product = inputProduct as Product;
    if (Object.values(Product).includes(product)) {
        return product;
    }
    throw new Error(`${inputProduct} is not a supported product!`);
}
