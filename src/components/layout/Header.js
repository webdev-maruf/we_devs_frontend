import React, {Component} from 'react';
import { BrowserRouter } from 'react-router-dom';
import Navigations from '../layout/Navigations';

export default class Header extends Component {
    render(){
        return (
            
            <>
            <BrowserRouter>
            <Navigations />
        </BrowserRouter>

            </>
        )
    }
}