import gql from 'graphql-tag';

const GET_ALL_WORDS = gql`
  query getAllWords {
    allWordstranslations {
      nodes {
        id
        projectName
        translation
        englishWord
      }
    }
  }
`;

export default GET_ALL_WORDS;
