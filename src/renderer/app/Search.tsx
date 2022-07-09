import { hot } from 'react-hot-loader/root';
import React, { useEffect, useRef, useState } from 'react';
import { ContextMenuDemo } from '../components/ContextMenu';
import { blackA } from '@radix-ui/colors';
import { globalCss, styled } from '@stitches/react';
import { MagnifyingGlassIcon } from '@radix-ui/react-icons';

const globalStyles = globalCss({
    '*': { 
        margin: 0, 
        padding: 0,
        background: 'transparent',
        fontFamily: "Arial",
        boxSizing: 'border-box'
    },
    "html, body": {
        width: '100vw',
        height: '100vh',
        overflow: 'hidden',
    },
    "#root": {
        padding: "20px",
        width: '100vw',
        height: '100vh',
        overflow: 'hidden',
    }
});

const Flex = styled('div', {
    position: 'relative',
    display: 'flex',
    height: 'fit-content',
    backgroundColor: 'transparent',
    borderRadius: 4,
    boxShadow: `0 5px 20px 3px ${blackA.blackA9}`,
});

const Input = styled('input', {
    position: 'relative',
    zIndex: 1,
    all: 'unset',
    width: '100%',
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 4,
    padding: '0 10px 0 70px',
    height: 60,
    fontSize: 22,
    lineHeight: 1,
    color: 'white',
    backgroundColor: 'rgba(0,0,0,0.8)',
    boxShadow: `0 0 0 0px rgba(0,0,0,0.8)`,
    '&:focus': { boxShadow: `0 0 0 2px rgba(255,255,255, 0.1)` },
});

const IconGlass = styled(MagnifyingGlassIcon, {
    position: 'absolute',
    zIndex: 2,
    width: '28px',
    height: '28px',
    left: '20px',
    top: '50%',
    transform: 'translateY(-50%)',
    color: 'white',
    fontSize: '2rem',
    padding: '0'
});

const ResultsArea = styled('div', {
    position: 'absolute',
    width: '100%',
    zIndex: 0,
    color: 'white',
    variants: {
        state: {
            open:  { top: '50px', transition: '.4s', opacity: 1 },
            close: { top: '0', transition: '.55s', opacity: 0 }
        }
    }
});

export const ResultsBox: React.FC<any> = ({ children, open }) => {
    return (
        <ResultsArea state={open ? 'open' : 'close'}>
            teste = {children}
        </ResultsArea>
    );
}

export const Search: React.FC<{}> = () => {

    const [ isOpen, SetIsOpen ] = useState(false);
    const [ message, setMessage ] = useState("");
    const inputRef = useRef(null);
    const focus = () => {inputRef.current &&  inputRef.current.focus()}

    const getUsers = async () => {
        const user = await window.Main.execute("get/users");
        console.log(user);
    }

    useEffect(() => {
        globalStyles();
        focus();
        getUsers();
    });

    const checkInputEvent = (e: any) => {
        let value: string = e.target.value;
        setMessage(value);
        SetIsOpen(value.length > 0);
    }

    return (
        <Flex css={{ padding: '0', flexWrap: 'wrap', alignItems: 'center' }}>
            <IconGlass />
            <Input ref={inputRef} type="text" id="firstName" placeholder="Pesquise uma nota ou tarefa..." onKeyUp={checkInputEvent}/>
            <ResultsBox open={isOpen}>
                <h1>{message}</h1>
            </ResultsBox>
        </Flex>
    );
};

const useFocus = () => {
    const htmlElRef = useRef(null);
    const setFocus = () => {htmlElRef.current &&  htmlElRef.current.focus()}

    return [ htmlElRef, setFocus ] 
}

export default hot(Search);
