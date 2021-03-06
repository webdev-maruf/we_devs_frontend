import React, {Component} from 'react';
import { Link } from 'react-router-dom';

export default function NotFound(){    
    return (
        <>
            <h2>Not Found</h2>
            <Link to="/">Go Home</Link>
        </>
    )
    
}