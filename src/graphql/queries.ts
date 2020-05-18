// tslint:disable
// eslint-disable
// this is an auto generated file. This will be overwritten

export const getDailyDeal = /* GraphQL */ `
  query GetDailyDeal($id: ID!) {
    getDailyDeal(id: $id) {
      id
      title
      content
      price
    }
  }
`;
export const listDailyDeals = /* GraphQL */ `
  query ListDailyDeals(
    $filter: ModelDailyDealFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listDailyDeals(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        title
        content
        price
      }
      nextToken
    }
  }
`;
