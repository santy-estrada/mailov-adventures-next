import { gql } from '@apollo/client';

export const GET_DATE_IDEAS_PER_PARTNERSHIP = gql`
  query GetDateIdeas($partnershipId: Int!) {
    dateIdeasForPartnership(partnershipId: $partnershipId) {
      id
      idea
      category
      enthusiasm
      done
      user {
        id
        name
      }
    }
  }
`;

export const SET_AS_DONE = gql`
  mutation SetAsDone($id: ID!, $updateDateIdeaInput: UpdateDateIdeaInput!) {
    updateDateIdea(id: $id, updateDateIdeaInput: $updateDateIdeaInput) {
      id
      done
    }
  }
`;

export const ADD_REVIEW = gql`
  mutation SetAsDone($id: ID!, $updateDateIdeaInput: UpdateDateIdeaInput!) {
    updateDateIdea(id: $id, updateDateIdeaInput: $updateDateIdeaInput) {
      id
      review
    }
  }
`;

export const CREATE_DATE_IDEA = gql`
  mutation CreateDateIdea($createDateIdeaInput: CreateDateIdeaInput!) {
    createDateIdea(createDateIdeaInput: $createDateIdeaInput) {
      idea
      category
      enthusiasm
      partnershipIds{
        id
    }
      user {
        id
      }
    }
  }
`;

