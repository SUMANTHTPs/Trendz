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

export type UserProps = {
  name: string;
  email: string;
  password: string;
};

export type StoredProductProps = {
  availableQuantity: number;
  category: string;
  color: string;
  createdAt: string;
  description: string;
  img: string;
  price: number;
  size: string;
  slug: string;
  title: string;
  updatedAt: string;
  __v: number;
  _id: string;
};
