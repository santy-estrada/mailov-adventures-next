import { gql } from '@apollo/client';

export const GET_ACTIVITIES_BY_PARTNERSHIP = gql`
  query GetActivitiesByPartnership($partnershipId: Int!) {
    activitiesForPartnership(partnershipId: $partnershipId) {
      id
      activityType
      user{
        id
        name
      }
      date
    }
  }
`;

export const CREATE_ACTIVITY = gql`
  mutation createActivity($createActivityInput: CreateActivityInput!) {
    createActivity(createActivityInput: $createActivityInput) {
      id
      activityType
      partnershipIds{
        id
    }
      user {
        id
        name
      }
    }
  }
`;

export const DELETE_ACTIVITY = gql`
  mutation removeActivity($id: ID!) {
    removeActivity(id: $id) 
  }
`;

export const UPDATE_ACTIVITY = gql`
  mutation updateActivity($id: ID!, $updateActivityInput: UpdateActivityInput!) {
    updateActivity(id: $id, updateActivityInput: $updateActivityInput) {
      id
      activityType
      user {
        id
        name
      }
      partnershipIds {
        id
      }
    }
  }
`;

