import gql from 'graphql-tag'

const DELETE_WORD_BY_ID = gql`
    mutation deleteWord($id: BigInt!) {
        deleteWordstranslationById(input: { id: $id }) {
            clientMutationId
            deletedWordstranslationId
        }
    }
`;

export default DELETE_WORD_BY_ID;
