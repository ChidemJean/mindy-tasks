import React, { useEffect, useRef, useState } from 'react';
import { styled } from '../styles/utils';

export type NoteData = {
   title: string,
   text: string,
   createdAt?: string,
   deadline?: string,
}

export type Props = {
   noteData: NoteData
}

const ResultBoxRoot = styled("div", {
   display: 'flex',
   width: '100%',
});

const ResultBoxTitle = styled("h1", {
   display: 'flex',
   width: '100%',
});

const ResultBoxText = styled("div", {
   display: 'flex',
   width: '100%',
   fontSize: '.7rem'
});

export const ResultBox: React.FC<Props> = ({ children, noteData }) => {

   const [ note, setNote ] = useState<NoteData>(noteData);

   return (
      <ResultBoxRoot>
         <ResultBoxTitle>{note.title}</ResultBoxTitle>
         <ResultBoxText dangerouslySetInnerHTML={{__html: note.text}} />
      </ResultBoxRoot>
   );
}