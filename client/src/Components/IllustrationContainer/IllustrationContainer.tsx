import React from 'react';

export default function IllustrationContainer(props: any) {
    return (
        <>
        {!props.isLoading && !props.displayGraph ?
            <img src={require(`../../Assets/img/${props.src}`)} alt={props.alt} height="400px" width="400px"/>
        : null}
        </>
    )
};
