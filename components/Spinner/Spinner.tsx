import React from 'react';
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css"
import Loader from 'react-loader-spinner';
import { Center } from '@chakra-ui/react';

export default function Spinner(props: any) {
    return (
    <>
        {props.isLoading ?
        <Center mt="15rem">
            <Loader
                type="Grid"
                color="#00BFFF"
                height={100}
                width={100}
                timeout={10000}/>
        </Center>
        : null}
    </>
    );
};


