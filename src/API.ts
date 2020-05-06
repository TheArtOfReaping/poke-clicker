/* tslint:disable */
/* eslint-disable */
//  This file was automatically generated and should not be edited.

export type CreateDailyDealInput = {
  id?: string | null,
  title: string,
  content: string,
  price?: number | null,
};

export type ModelDailyDealConditionInput = {
  title?: ModelStringInput | null,
  content?: ModelStringInput | null,
  price?: ModelIntInput | null,
  and?: Array< ModelDailyDealConditionInput | null > | null,
  or?: Array< ModelDailyDealConditionInput | null > | null,
  not?: ModelDailyDealConditionInput | null,
};

export type ModelStringInput = {
  ne?: string | null,
  eq?: string | null,
  le?: string | null,
  lt?: string | null,
  ge?: string | null,
  gt?: string | null,
  contains?: string | null,
  notContains?: string | null,
  between?: Array< string | null > | null,
  beginsWith?: string | null,
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
  size?: ModelSizeInput | null,
};

export enum ModelAttributeTypes {
  binary = "binary",
  binarySet = "binarySet",
  bool = "bool",
  list = "list",
  map = "map",
  number = "number",
  numberSet = "numberSet",
  string = "string",
  stringSet = "stringSet",
  _null = "_null",
}


export type ModelSizeInput = {
  ne?: number | null,
  eq?: number | null,
  le?: number | null,
  lt?: number | null,
  ge?: number | null,
  gt?: number | null,
  between?: Array< number | null > | null,
};

export type ModelIntInput = {
  ne?: number | null,
  eq?: number | null,
  le?: number | null,
  lt?: number | null,
  ge?: number | null,
  gt?: number | null,
  between?: Array< number | null > | null,
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
};

export type UpdateDailyDealInput = {
  id: string,
  title?: string | null,
  content?: string | null,
  price?: number | null,
};

export type DeleteDailyDealInput = {
  id?: string | null,
};

export type ModelDailyDealFilterInput = {
  id?: ModelIDInput | null,
  title?: ModelStringInput | null,
  content?: ModelStringInput | null,
  price?: ModelIntInput | null,
  and?: Array< ModelDailyDealFilterInput | null > | null,
  or?: Array< ModelDailyDealFilterInput | null > | null,
  not?: ModelDailyDealFilterInput | null,
};

export type ModelIDInput = {
  ne?: string | null,
  eq?: string | null,
  le?: string | null,
  lt?: string | null,
  ge?: string | null,
  gt?: string | null,
  contains?: string | null,
  notContains?: string | null,
  between?: Array< string | null > | null,
  beginsWith?: string | null,
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
  size?: ModelSizeInput | null,
};

export type CreateDailyDealMutationVariables = {
  input: CreateDailyDealInput,
  condition?: ModelDailyDealConditionInput | null,
};

export type CreateDailyDealMutation = {
  createDailyDeal:  {
    __typename: "DailyDeal",
    id: string,
    title: string,
    content: string,
    price: number | null,
  } | null,
};

export type UpdateDailyDealMutationVariables = {
  input: UpdateDailyDealInput,
  condition?: ModelDailyDealConditionInput | null,
};

export type UpdateDailyDealMutation = {
  updateDailyDeal:  {
    __typename: "DailyDeal",
    id: string,
    title: string,
    content: string,
    price: number | null,
  } | null,
};

export type DeleteDailyDealMutationVariables = {
  input: DeleteDailyDealInput,
  condition?: ModelDailyDealConditionInput | null,
};

export type DeleteDailyDealMutation = {
  deleteDailyDeal:  {
    __typename: "DailyDeal",
    id: string,
    title: string,
    content: string,
    price: number | null,
  } | null,
};

export type GetDailyDealQueryVariables = {
  id: string,
};

export type GetDailyDealQuery = {
  getDailyDeal:  {
    __typename: "DailyDeal",
    id: string,
    title: string,
    content: string,
    price: number | null,
  } | null,
};

export type ListDailyDealsQueryVariables = {
  filter?: ModelDailyDealFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListDailyDealsQuery = {
  listDailyDeals:  {
    __typename: "ModelDailyDealConnection",
    items:  Array< {
      __typename: "DailyDeal",
      id: string,
      title: string,
      content: string,
      price: number | null,
    } | null > | null,
    nextToken: string | null,
  } | null,
};

export type OnCreateDailyDealSubscription = {
  onCreateDailyDeal:  {
    __typename: "DailyDeal",
    id: string,
    title: string,
    content: string,
    price: number | null,
  } | null,
};

export type OnUpdateDailyDealSubscription = {
  onUpdateDailyDeal:  {
    __typename: "DailyDeal",
    id: string,
    title: string,
    content: string,
    price: number | null,
  } | null,
};

export type OnDeleteDailyDealSubscription = {
  onDeleteDailyDeal:  {
    __typename: "DailyDeal",
    id: string,
    title: string,
    content: string,
    price: number | null,
  } | null,
};
