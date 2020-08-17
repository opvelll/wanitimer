/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getPlan = /* GraphQL */ `
  query GetPlan($id: ID!) {
    getPlan(id: $id) {
      id
      startDate
      settingDays
      createdAt
      updatedAt
      owner
    }
  }
`;
export const listPlans = /* GraphQL */ `
  query ListPlans(
    $filter: ModelPlanFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listPlans(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        startDate
        settingDays
        createdAt
        updatedAt
        owner
      }
      nextToken
    }
  }
`;
