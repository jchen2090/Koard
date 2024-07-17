import { getData } from "@/lib/supabase/queries";
import Board from "./board";
import getMockData from "@/tests/mockData";

export interface CardSchema {
  card_id: string;
  card_name: string;
  card_desc: string;
}

export interface DataSchema {
  column_name: string;
  column_id: string;
  cards: CardSchema[];
  color: string;
}

export default async function Project() {
  let data: DataSchema[];

  if (process.env.NODE_ENV === "production") {
    data = await getData();
  } else {
    data = getMockData();
  }

  return <Board data={data} />;
}
