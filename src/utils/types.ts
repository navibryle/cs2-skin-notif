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


