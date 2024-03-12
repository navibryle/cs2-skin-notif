import {z} from 'zod';
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

export const BitskinEntryZodSchema = z.object(
  {
    name:z.string(),
    price_avg: z.number(),
    price_max: z.number(),
    price_min: z.number(),
    quantity: z.number(),
    skin_id: z.number(),
  }
)
