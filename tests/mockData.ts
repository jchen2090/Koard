import { DataSchema } from "@/app/project/page";

export default function getMockData(): DataSchema[] {
  return [
    {
      column_name: "Sample Data",
      cards: [
        {
          card_id: "0",
          card_name: "Sample name 1",
          card_desc: "Sample desc 1",
        },
        {
          card_id: "1",
          card_name: "Sample name 2",
          card_desc: "Sample desc 2",
        },
        {
          card_id: "4",
          card_name: "Sample name 5",
          card_desc: "Sample desc 5",
        },
      ],
      color: "Red",
      column_id: "1",
    },
    {
      column_name: "Sample Data 2",
      cards: [
        {
          card_id: "2",
          card_name: "Sample name 3",
          card_desc: "Sample desc 3",
        },
        {
          card_id: "5",
          card_name: "Sample name 6",
          card_desc: "Sample desc 6",
        },
      ],
      color: "Gray",
      column_id: "2",
    },
    {
      column_name: "Sample Data 3",
      cards: [
        {
          card_id: "3",
          card_name: "Sample name 4",
          card_desc: "Sample desc 4",
        },
      ],
      color: "Blue",
      column_id: "3",
    },
  ];
}
