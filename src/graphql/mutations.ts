// tslint:disable
// eslint-disable
// this is an auto generated file. This will be overwritten

export const createDailyDeal = /* GraphQL */ `
  mutation CreateDailyDeal(
    $input: CreateDailyDealInput!
    $condition: ModelDailyDealConditionInput
  ) {
    createDailyDeal(input: $input, condition: $condition) {
      id
      title
      content
      price
    }
  }
`;
export const updateDailyDeal = /* GraphQL */ `
  mutation UpdateDailyDeal(
    $input: UpdateDailyDealInput!
    $condition: ModelDailyDealConditionInput
  ) {
    updateDailyDeal(input: $input, condition: $condition) {
      id
      title
      content
      price
    }
  }
`;
export const deleteDailyDeal = /* GraphQL */ `
  mutation DeleteDailyDeal(
    $input: DeleteDailyDealInput!
    $condition: ModelDailyDealConditionInput
  ) {
    deleteDailyDeal(input: $input, condition: $condition) {
      id
      title
      content
      price
    }
  }
`;
