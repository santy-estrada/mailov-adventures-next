import { gql } from '@apollo/client';

export const GET_USERS_QUERY = gql`
  query GetUsers {
    users {
      id
      name
      email
      points
      facts {
        id
        content
      }
      dateIdeas {
        id
        title
      }
      questions {
        id
        question
      }
      activities {
        id
        description
      }
      partnershipsAsUser1 {
        id
      }
      partnershipsAsUser2 {
        id
      }
    }
  }
`;

export const CREATE_USER_MUTATION = gql`
  mutation CreateUser($createUserInput: CreateUserInput!) {
    createUser(createUserInput: $createUserInput) {
      id
      name
      email
    }
  }
`;

export const GET_USER_PARTNERSHIP = gql`
  query getUserPartnershipDetails($userId: Int!) {
    getUserPartnershipDetails(userId: $userId) {
      id
      user1 {
        id
        name
      }
      user2 {
        id
        name
      }
      status
      startDate
    }
  }
`;


export const UPDATE_USER_MUTATION = gql`
  mutation UpdateUser($id: ID!, $input: UpdateUserInput!) {
    updateUser(id: $id, input: $input) {
      id
      name
      email
      points
    }
  }
`;

export const DELETE_USER_MUTATION = gql`
  mutation DeleteUser($id: ID!) {
    deleteUser(id: $id)
  }
`;
