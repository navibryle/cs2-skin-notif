export type Prices = {
    fNew: string | null;
    fTesteted: string | null;
    minWear: string | null;
    wellWorn: string | null;
    bScarred: string | null;
};

export type GetSkinPrice = (gunName: string, skinName: string) => Promise<Prices>;

export type StackEntry = {
    title:string;
    href:string;
}
export type BitskinEntry = {
    name: string;
    price_avg: number,
    price_max: number,
    price_min: number,
    quantity: number,
    skin_id: number
}
