export type ProductProps = {
  params: {
    slug: string;
  };
};

export type ProductTileProps = {
  slug: string;
  img: string;
  title: string;
  description: string;
  price: string;
};

export type EventProps = {
  preventDefault(): unknown;
  target: {
    name: any;
    value: any;
  };
};

export type orderProps = {
  userId: string;
  products: [
    {
      productId: string;
      amount: Number;
      size: string;
      color: string;
    }
  ];
  address: string;
  subTotal: Number;
  status: string;
};
