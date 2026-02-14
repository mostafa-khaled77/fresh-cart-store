import { Category } from "@/interfaces/category.interface";
import { log } from "console";

export default async function getSpecificCategotries(_id: string):Promise<Category> {
  let res = await fetch(
    `${process.env.BASE_URL}/categories/${_id}`, {
      method: 'GET',
        next :{revalidate : 60}
    }
  );
  let {data} = await res.json();
  return data;
}
