export type ISODate = `${number}-${number}-${number}`;

export type Event = {
  id: string;
  title: string;
  date: ISODate;
  time: string;
  location: string;
  description?: string;
  category: string;
};
