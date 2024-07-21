import { DataSchema } from "@/app/project/page";

export default function getMockData(): DataSchema[] {
  return [
    {
      column_name: "Sample Data",
      cards: [
        {
          card_id: "6ab6b11e-cb62-4d02-8871-91a60aa6dc96",
          card_name: "Sample name 1",
          card_desc: "Sample desc 1",
        },
        {
          card_id: "c28eb2ee-3452-42ba-8763-f69da87aa880",
          card_name: "Sample name 2",
          card_desc: "Sample desc 2",
        },
        {
          card_id: "86afbd5f-03c6-44b4-a832-478e7704dc2f",
          card_name: "Sample name 5",
          card_desc: "Sample desc 5",
        },
      ],
      color: "Red",
      column_id: "c40d34ce-9f37-4b42-8ef9-717da248d2a7",
    },
    {
      column_name: "Sample Data 2",
      cards: [
        {
          card_id: "35991cf5-aa31-40fd-ac98-87f03bcdc231",
          card_name: "Sample name 3",
          card_desc: "Sample desc 3",
        },
        {
          card_id: "5526a50b-dac6-4e42-b71a-e2bb5ca1bf9a",
          card_name: "Sample name 6",
          card_desc: "Sample desc 6",
        },
      ],
      color: "Gray",
      column_id: "cae402af-3e15-441c-841e-e9ad1c515a14",
    },
    {
      column_name: "Sample Data 3",
      cards: [
        {
          card_id: "3af8e1ec-56c9-4922-b214-12dc5a526843",
          card_name: "Sample name 4",
          card_desc: "Sample desc 4",
        },
      ],
      color: "Blue",
      column_id: "83b0afcd-b8cd-464d-8e80-9abcad555576",
    },
  ];
}
