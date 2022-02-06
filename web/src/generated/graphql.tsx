import gql from 'graphql-tag';
import * as Urql from 'urql';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type Cart = {
  __typename?: 'Cart';
  createdAt: Scalars['String'];
  id: Scalars['Float'];
  updatedAt: Scalars['String'];
};

export type CartIdInput = {
  id: Scalars['Float'];
};

export type CartItem = {
  __typename?: 'CartItem';
  cart: Cart;
  createdAt: Scalars['String'];
  id: Scalars['Float'];
  product: Product;
  updatedAt: Scalars['String'];
};

export type FieldResponse = {
  __typename?: 'FieldResponse';
  field: Scalars['String'];
  message: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  createCart: Cart;
  createCartItem: CartItem;
  createOrder: Order;
  createOrderItem: OrderItems;
  createProduct: Product;
  deleteCart?: Maybe<Cart>;
  deleteOrder: Scalars['Boolean'];
  deleteOrderItem: Scalars['Boolean'];
  deleteProduct: Scalars['Boolean'];
  deleteUser: Scalars['Boolean'];
  login: UserResponse;
  logout: Scalars['Boolean'];
  register: UserResponse;
  updateCart?: Maybe<Cart>;
  updateCartItem: CartItem;
  updateOrder: Order;
  updateOrderItem: OrderItems;
  updateProduct?: Maybe<Product>;
  updateUser?: Maybe<User>;
};


export type MutationCreateCartItemArgs = {
  cartId: CartIdInput;
  productId: ProductIdInput;
};


export type MutationCreateOrderArgs = {
  price: Scalars['Float'];
  quantity: Scalars['Float'];
  status: Scalars['String'];
  user: UserInputType;
};


export type MutationCreateOrderItemArgs = {
  orderId: OrderIdInput;
  productId: ProductIdInput;
};


export type MutationCreateProductArgs = {
  description: Scalars['String'];
  name: Scalars['String'];
  price: Scalars['Float'];
  quantity: Scalars['Float'];
};


export type MutationDeleteCartArgs = {
  id: Scalars['Float'];
};


export type MutationDeleteOrderArgs = {
  id: Scalars['Float'];
};


export type MutationDeleteOrderItemArgs = {
  id: Scalars['Float'];
};


export type MutationDeleteProductArgs = {
  id: Scalars['Float'];
};


export type MutationDeleteUserArgs = {
  id: Scalars['Float'];
};


export type MutationLoginArgs = {
  options: UsernamePasswordInput;
};


export type MutationRegisterArgs = {
  email: Scalars['String'];
  options: UsernamePasswordInput;
};


export type MutationUpdateCartArgs = {
  id: Scalars['Float'];
};


export type MutationUpdateCartItemArgs = {
  cartId: Scalars['Float'];
  id: Scalars['Float'];
  productId: Scalars['Float'];
};


export type MutationUpdateOrderArgs = {
  id: Scalars['Float'];
  price: Scalars['Float'];
  quantity: Scalars['Float'];
  status: Scalars['String'];
};


export type MutationUpdateOrderItemArgs = {
  id: Scalars['Float'];
  order: Scalars['Float'];
  product: Scalars['Float'];
};


export type MutationUpdateProductArgs = {
  description: Scalars['String'];
  id: Scalars['Float'];
  name: Scalars['String'];
  price: Scalars['Float'];
  quantity: Scalars['Float'];
};


export type MutationUpdateUserArgs = {
  id: Scalars['Float'];
  password: Scalars['String'];
  username: Scalars['String'];
};

export type Order = {
  __typename?: 'Order';
  createdAt: Scalars['String'];
  id: Scalars['Float'];
  price: Scalars['Float'];
  quantity: Scalars['Float'];
  status: Scalars['String'];
  updatedAt: Scalars['String'];
  user: User;
};

export type OrderIdInput = {
  id: Scalars['Float'];
};

export type OrderItems = {
  __typename?: 'OrderItems';
  createdAt: Scalars['String'];
  id: Scalars['Float'];
  order: Order;
  product: Product;
  updatedAt: Scalars['String'];
};

export type Product = {
  __typename?: 'Product';
  createdAt: Scalars['String'];
  description: Scalars['String'];
  id: Scalars['Float'];
  name: Scalars['String'];
  price: Scalars['Float'];
  quantity: Scalars['Int'];
  updatedAt: Scalars['String'];
};

export type ProductIdInput = {
  id: Scalars['Float'];
};

export type Query = {
  __typename?: 'Query';
  cartById: Cart;
  cartItemById: CartItem;
  cartItems: Array<CartItem>;
  carts: Array<Cart>;
  me?: Maybe<User>;
  order: Order;
  orderItem: OrderItems;
  orderItems: Array<OrderItems>;
  orders: Array<Order>;
  product?: Maybe<Product>;
  products: Array<Product>;
  user?: Maybe<User>;
  users: Array<User>;
};


export type QueryCartByIdArgs = {
  id: Scalars['Float'];
};


export type QueryCartItemByIdArgs = {
  id: Scalars['Float'];
};


export type QueryOrderArgs = {
  id: Scalars['Float'];
};


export type QueryOrderItemArgs = {
  id: Scalars['Float'];
};


export type QueryProductArgs = {
  id: Scalars['Float'];
};


export type QueryUserArgs = {
  id: Scalars['Float'];
};

export type User = {
  __typename?: 'User';
  createdAt: Scalars['String'];
  email: Scalars['String'];
  id: Scalars['Float'];
  updatedAt: Scalars['String'];
  username: Scalars['String'];
};

export type UserInputType = {
  id: Scalars['Float'];
};

export type UserResponse = {
  __typename?: 'UserResponse';
  errors?: Maybe<Array<FieldResponse>>;
  user?: Maybe<User>;
};

export type UsernamePasswordInput = {
  password: Scalars['String'];
  username: Scalars['String'];
};

export type FullUserFragment = { __typename?: 'User', id: number, username: string, email: string, createdAt: string, updatedAt: string };

export type ShortUserFragment = { __typename?: 'User', id: number, username: string };

export type LoginMutationVariables = Exact<{
  options: UsernamePasswordInput;
}>;


export type LoginMutation = { __typename?: 'Mutation', login: { __typename?: 'UserResponse', user?: { __typename?: 'User', id: number, email: string, username: string } | null | undefined, errors?: Array<{ __typename?: 'FieldResponse', field: string, message: string }> | null | undefined } };

export type LogoutMutationVariables = Exact<{ [key: string]: never; }>;


export type LogoutMutation = { __typename?: 'Mutation', logout: boolean };

export type RegisterMutationVariables = Exact<{
  email: Scalars['String'];
  options: UsernamePasswordInput;
}>;


export type RegisterMutation = { __typename?: 'Mutation', register: { __typename?: 'UserResponse', user?: { __typename?: 'User', id: number, email: string } | null | undefined, errors?: Array<{ __typename?: 'FieldResponse', field: string, message: string }> | null | undefined } };

export type MeQueryVariables = Exact<{ [key: string]: never; }>;


export type MeQuery = { __typename?: 'Query', me?: { __typename?: 'User', id: number, username: string } | null | undefined };

export const FullUserFragmentDoc = gql`
    fragment FullUser on User {
  id
  username
  email
  createdAt
  updatedAt
}
    `;
export const ShortUserFragmentDoc = gql`
    fragment ShortUser on User {
  id
  username
}
    `;
export const LoginDocument = gql`
    mutation Login($options: UsernamePasswordInput!) {
  login(options: $options) {
    user {
      id
      email
      username
    }
    errors {
      field
      message
    }
  }
}
    `;

export function useLoginMutation() {
  return Urql.useMutation<LoginMutation, LoginMutationVariables>(LoginDocument);
};
export const LogoutDocument = gql`
    mutation Logout {
  logout
}
    `;

export function useLogoutMutation() {
  return Urql.useMutation<LogoutMutation, LogoutMutationVariables>(LogoutDocument);
};
export const RegisterDocument = gql`
    mutation Register($email: String!, $options: UsernamePasswordInput!) {
  register(email: $email, options: $options) {
    user {
      id
      email
    }
    errors {
      field
      message
    }
  }
}
    `;

export function useRegisterMutation() {
  return Urql.useMutation<RegisterMutation, RegisterMutationVariables>(RegisterDocument);
};
export const MeDocument = gql`
    query Me {
  me {
    ...ShortUser
  }
}
    ${ShortUserFragmentDoc}`;

export function useMeQuery(options: Omit<Urql.UseQueryArgs<MeQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<MeQuery>({ query: MeDocument, ...options });
};