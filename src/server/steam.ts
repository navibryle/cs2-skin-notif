/* TODO: query steam api here */

'use server'
import { db } from "./db";


export default async function getSkinsForGun(gunName : string) {
    return await db.sKINS.findMany({
        select:{
            NAME: true,
        },
        where:{
            GUN_NAME:{
                contains:"Tec-9"
            }
        }
    });
}
