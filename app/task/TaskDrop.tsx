'use client';

import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import "../css/task-drop.css";
import { Dispatch, SetStateAction, useState } from 'react';
import { statusDBUpdate } from '@/lib/taskService';
import { Task } from '../type/task';

interface TaskDropProps {
    setTasks: Dispatch<SetStateAction<Task[]>>;
    selectFilters: string[];
    setFilterList: Dispatch<SetStateAction<Task[]>>;
    status?: string;
    taskId: string;
    scale: string;
}

export default function TaskDrop({ setTasks, selectFilters, setFilterList, status, taskId, scale }: TaskDropProps) {

    const [cur, setCur] = useState<string>(status || '할일');
    const [click, setClick] = useState<boolean>(false);

    const statusList = [
        'todo',
        'doing',
        'done'
    ]

    const statusUpdate = (select: string) => {
        setCur(select);
    }

    return (
        <DropdownMenu.Root open={click} onOpenChange={setClick} key={taskId}>
            <DropdownMenu.Trigger asChild>
                <button
                    className='task-status-btn'
                    onClick={() => {
                        setClick(!click)
                    }}
                    style={{
                        width: 'fit-content',
                        scale: scale
                    }}
                >
                    {cur}
                    <img
                        src="./arrow_drop_down.svg"
                        alt=""
                        style={{
                            transform: click ? 'rotate(180deg)' : 'rotate(0deg)',
                            transition: 'transform 0.5s',
                            position: 'fixed',
                            marginLeft: '60px'
                        }}
                    />
                </button>
            </DropdownMenu.Trigger>
            <DropdownMenu.Portal>
                <DropdownMenu.Content className='task-status-drop-content'
                    style={{ scale: scale }}
                >
                    {statusList.filter(s => s !== cur).map(s => (
                        <DropdownMenu.Item
                            key={s}
                            className='task-status'
                            onClick={() => {
                                statusUpdate(s);
                                statusDBUpdate(taskId, s);
                                setFilterList(list => selectFilters.length === 0 ? list.map(t => t.id === taskId ? { ...t, status: s as Task['status'] } : t) : list.map(t => t.id === taskId ?
                                    { ...t, status: s as Task['status'] } : t
                                ).filter(t => selectFilters.includes(t.status)));
                                setTasks(task => task.map(t => t.id === taskId ? { ...t, status: s as Task['status'] } : t));
                            }}
                        >
                            {s}
                        </DropdownMenu.Item>
                    ))}
                </DropdownMenu.Content>
            </DropdownMenu.Portal>
        </DropdownMenu.Root>
    )
}