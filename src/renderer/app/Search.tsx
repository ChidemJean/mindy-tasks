import { hot } from 'react-hot-loader/root';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { ContextMenuSearch } from '../components/ContextMenu';
import { blackA } from '@radix-ui/colors';
import { createStitches, globalCss } from '@stitches/react';
import { MagnifyingGlassIcon } from '@radix-ui/react-icons';
import * as ContextMenuPrimitive from '@radix-ui/react-context-menu';
import { styled } from '../styles/utils';
import { ResultsBox } from '../components/SearchResultsBox';
import { ResultBox } from '../components/ResultBox';
import { api } from '../../main/bridge';
import { apiCreateTask, apiGetUsers, apiSearchTasks } from '../api';
import _ from 'lodash';

const Flex = styled('div', {
	position: 'relative',
	display: 'flex',
	height: 'fit-content',
	backgroundColor: 'transparent',
	borderRadius: 4
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

export const Search: React.FC<{}> = () => {

	const [isOpen, SetIsOpen] = useState(false);
	const [message, setMessage] = useState("");
	const [tasks, setTasks] = useState([]);

	const debounceFn = useCallback(
		_.debounce(async (value) => {
			let tasks = await apiSearchTasks({ user: "d024a9b0-70e3-4755-ba10-acc4492eed39", term: value});
			setTasks(tasks);
			console.log(tasks);
		}, 300), 
	[]);

	const inputRef: any = useRef(null);
	const focus = () => { inputRef.current && inputRef.current.focus() }

	const getUsers = async () => {
		const users = await apiGetUsers();
		console.log(users);
	}

	useEffect(() => {
		focus();
	}, []);

	const checkInputEvent = async (e: any) => {
		let value: string = e.target.value;
		setMessage(value);
		SetIsOpen(value.length > 0);

		if (e.key === "Enter") {
			let createUserCMd = "create:task";
			let hasCmd = value.substring(0, createUserCMd.length) == createUserCMd;
			
			if (hasCmd) {
				const cmdContent = value.substring(createUserCMd.length, value.length)?.trim();
				if (cmdContent) {
					await apiCreateTask({
						user: "d024a9b0-70e3-4755-ba10-acc4492eed39",
						title: value.substring(createUserCMd.length, value.length).trim(),
						text: 'teste texto'
					});
				} else {
					alert("corpo do comando vazio!");
				}
				inputRef.current.value = "";
			}

			return;
		}

		debounceFn(value);
	}

	return (
		<Flex css={{ padding: '0', flexDirection: 'column', alignItems: 'center' }}>
			<Flex css={{ position: 'relative', zIndex: 2, width: '100%', boxShadow: `0 5px 20px 3px ${blackA.blackA9}`, }}>
				<IconGlass css={{ userSelect: 'none', drag: true }} onClick={(e) => getUsers()} />
				<Input ref={inputRef} type="text" id="firstName" placeholder="Pesquise uma nota ou tarefa..." onKeyUp={checkInputEvent} />
			</Flex>
			<ResultsBox open={isOpen} css={{ mt: '1rem' }}>
				{(tasks.map(v => (
					<ResultBox key={v.id} noteData={{ ...v } as any}/>
				)))}
			</ResultsBox>
		</Flex>
	);
};

export default hot(Search);
