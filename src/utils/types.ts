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

export type WatchList = {
  skinId: bigint,
  userId: string,
  price: bigint
}

export const WatchListQuerySchema = z.object(
  {
    skinId: z.bigint(),
    userId:z.string(),
    price: z.string().or(z.null()),
    tier: z.string()
  }
)


export const WatchlistCreateQuerySchema = z.object(
  {
    skinName:z.string(),
    gunName:z.string(),
    id:z.string(),
    tier:z.string()
  }
)