import axios from 'axios';
import { useState, useEffect } from 'react';

import './Example.css';
import Button from '@mui/material/Button';

type Word = {
    id: number;
    engWord: string;
    translation: string;
    projectName: string;
};

const Example = () => {
    const [wordsArray, setWordsArray] = useState<Word[]>();

    const getAllWords = () => {
        axios.get('/test')
            .then((res: { data: Word[] }) => {
                setWordsArray(res.data);
            })
            .catch(err => {
                setWordsArray(undefined);

                console.error('Error in basic server request.', err.response.data.message);
            });
    };

    useEffect(() => {
        getAllWords();
    }, []);

    const addWord = () => {
        const newWord: Word = {
            id: 70,
            engWord: 'dog',
            translation: 'כלב',
            projectName: 'client'
        };

        axios.post('/test', newWord)
            .then((res) => {
                console.log('Added!', res);
            })
            .catch(err => {
                console.error(`Couldn't add the new word '${ newWord.engWord }'.`, err.response.data.message);
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
            The words are:
            { wordsArray && wordsArray.map(word =>
                <div key={ word.id }>
                    In { word.projectName } project - the translation for { word.engWord } is { word.translation }
                </div>
            )}
            <div className='buttons'>
                <Button variant='contained' onClick={ addWord }>add</Button>
                <Button variant='contained' onClick={ getAllWords }>get all</Button>
                <Button variant='contained' onClick={ updateWord }>update</Button>
                <Button variant='contained' onClick={ deleteWord }>delete</Button>
            </div>
        </div>
    );
};

export default Example;
