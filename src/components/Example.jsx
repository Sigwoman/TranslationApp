import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Example = () => {
    const [param, setParam] = useState();

    useEffect(() => {
        axios.get('http://localhost:7776/test/')
            .then(res => {
                setParam(res.data);
            })
            .catch(err => {
                setParam('Server is down');
            });
    }, []);

    return (
        <div>
            The message is: { param }
        </div>
    );
};

export default Example;
