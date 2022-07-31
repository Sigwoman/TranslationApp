import gql from 'graphql-tag'

const CREATE_WORD = gql`
    mutation createWord($newWord: WordstranslationInput!) {
        createWordstranslation(input: { wordstranslation: $newWord }) {
            clientMutationId
        }
    }
`;

export default CREATE_WORD;
