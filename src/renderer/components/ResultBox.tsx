import { blackA, grayA } from '@radix-ui/colors';
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
   flexDirection: 'column',
   width: '100%',
   backgroundColor: '$gray-900',
   padding: '18px',
   borderRadius: 4,
   marginBottom: '15px',
   boxShadow: `0 5px 20px 3px ${grayA.grayA1}`,
	'&:focus': { boxShadow: `0 0 0 2px rgba(255,255,255, 0.1)` },
   '& .header': {
      '& .title': {
         display: 'flex',
         width: '100%',
         fontSize: '1.04rem',
         color: '$white',
      },
   },
   '& .text': {
      display: 'flex',
      width: '100%',
      fontSize: '.7rem'
   }
});

export const ResultBox: React.FC<Props> = ({ children, noteData }) => {

   const [ note, setNote ] = useState<NoteData>(noteData);

   return (
      <ResultBoxRoot>
         <div className='header'>
            <h1 className='title'>{note.title}</h1>
         </div>
         <div className='content'>
            <div dangerouslySetInnerHTML={{__html: note.text}}></div>
         </div>
      </ResultBoxRoot>
   );
}