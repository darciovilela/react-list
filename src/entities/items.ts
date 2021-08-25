export interface Item {
  id?: number;
  title: string;
  sendDate: Date;
}

export const emptyItem: Item = {
  title: '',
  sendDate: new Date(),
};
