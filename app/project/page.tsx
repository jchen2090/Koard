import { getData } from "@/lib/supabase/queries";
import Board from "./board";

export interface CardSchema {
  card_id: string;
  card_name: string;
  card_desc: string;
}

export interface DataSchema {
  column_name: string;
  cards: CardSchema[];
  color: string;
}

export default async function Project() {
  const data = await getData();
  console.log(data);
  return <Board data={data} />;
}
