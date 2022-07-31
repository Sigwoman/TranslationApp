import axios from 'axios';
import { useState, useEffect } from 'react';
import { useQuery, useMutation } from '@apollo/client';

import './Example.css';
import Button from '@mui/material/Button';

import GET_ALL_WORDS from '../graphql/query/getAllWords.query';
import CREATE_WORD from '../graphql/mutations/AddWord.mutation';
import UPDATE_WORD_BY_ID from '../graphql/mutations/UpdateWord.mutation';
import DELETE_WORD_BY_ID from '../graphql/mutations/DeleteWord.mutation';

type Word = {
    id: number;
    englishWord: string | undefined;
    engWord: string | undefined;
    translation: string;
    projectName: string;
};

interface updateWord {
    id: number
    englishWord: string
    translation: string
};

const Example = () => {
    const [wordsArray, setWordsArray] = useState<Word[]>();
    const { data, error, loading } = useQuery(GET_ALL_WORDS);
    const [updateWordById] = useMutation(UPDATE_WORD_BY_ID);
    const [addWordClient] = useMutation(CREATE_WORD);
    const [deleteWordById] = useMutation(DELETE_WORD_BY_ID);

    useEffect(() => {
        if (data) {
            if (data && data.allWordstranslations && data.allWordstranslations.nodes) {
                setWordsArray(data.allWordstranslations.nodes)
            }
        }
        if (error) {
            console.log(error);
        }
        if (loading) {
            console.log('loading');
        }
    }, [data, error, loading]);

    const getAllWords = () => {
        axios.get('/test')
            .then((res: { data: Word[] }) => {
              console.log(res.data)
                setWordsArray(res.data);
            })
            .catch(err => {
                setWordsArray(undefined);

                console.error('Error in basic server request.', err.response.data.message);
            });
    };

    const addWordServer = () => {
        const newWord: Word = {
            id: 70,
            engWord: 'dog',
            englishWord: 'dog',
            translation: 'כלב',
            projectName: 'client'
        };
        
        axios.post('/test', newWord)
            .then((res) => {
                console.log('Added!', res);
            })
            .catch(err => {
                console.error(`Couldn't add the new word '${ newWord.englishWord }'.`, err.response.data.message);
            });
    };

    const updateWord = () => {
        const wordToUpdate = 2;

        axios.put(`/test/${ wordToUpdate }`, { translation: 'בדיקה 2' })
            .then((res) => {
                console.log('Updated!', res);
            })
            .catch(err => {
                console.error(`Couldn't update the word with id ${ wordToUpdate }.`, err.response.data.message);
            });
    };

    const deleteWord = () => {
        const wordToDelete = 1;

        axios.delete(`/test/${ wordToDelete }`)
            .then((res) => {
                console.log('Deleted!', res);
            })
            .catch(err => {
                console.error(`Couldn't delete the word with id ${ wordToDelete }.`, err.response.data.message);
            });
    };

    return (
        <div>
            <h2>🚀 Hello 🚀</h2>
            <br />
            { wordsArray && wordsArray.map((word: Word) => (
                <div key={ word.id }>
                    In { word.projectName } project - the translation for { word.englishWord || word.engWord } is { word.translation }
                </div>
            ))}
            <br />
            <h4>Server buttons:</h4>
            <div className='buttons'>
                <Button variant='contained' onClick={ getAllWords }>get all</Button>
                <Button variant='contained' onClick={ addWordServer }>add</Button>
                <Button variant='contained' onClick={ updateWord }>update</Button>
                <Button variant='contained' onClick={ deleteWord }>delete</Button>
            </div>
            <h4>Client buttons:</h4>
            <div className='buttons'>
                <Button
                    variant='contained'
                    onClick={ () => {
                        addWordClient({ variables: {  
                            newWord: {
                                id: 15,
                                uniqueKey: 'newWord',
                                projectName: 'client',
                                englishWord: 'new',
                                translation: 'חדש'
                            }
                        } });
                    } }
                >
                    CREATE
                </Button>
                <Button
                    variant='contained'
                    onClick={ () => {
                        updateWordById({ variables: {
                            id: 2,
                            patch: {
                                englishWord: 'word',
                                translation: 'מילה'
                            }
                        } });
                    } }
                >
                  update
                </Button>
                <Button
                    variant='contained'
                    onClick={ () => {
                      deleteWordById({ variables: { id: 15 } });
                    } }
                >
                    delete
                </Button>
            </div>
        </div>
    );
};

export default Example;
