import React from 'react';

export default function IllustrationContainer(props: any) {

    return (
        <>
        {!props.isLoading && !props.displayGraph ?
            <img src={require(`../../Assets/img/${props.src}`)} alt={props.alt} height={props.height} width={props.width}/>
        : null}
        </>
    )
};
