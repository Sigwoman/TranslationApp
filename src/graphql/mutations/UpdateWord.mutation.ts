import gql from 'graphql-tag'

const UPDATE_WORD_BY_ID = gql`
    mutation updateWordById($id: BigInt!, $patch: WordstranslationPatch!) {
        updateWordstranslationById(input: { id: $id, wordstranslationPatch: $patch }) {
            clientMutationId
        }
    }
`;

export default UPDATE_WORD_BY_ID;
