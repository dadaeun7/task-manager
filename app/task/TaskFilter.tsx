'use client'

import { Dispatch, SetStateAction, useEffect, useState } from "react";
import "../css/task-filter.css";
import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import { Task } from "@/app/type/task";


const statusSelects = ['todo', 'doing', 'done'] as const;

export default function TaskFilter({ addBar, setAddBar, tasks, filterList, setFilterList, selectFilters, setSelectFilters }:
    {
        addBar: Boolean,
        setAddBar: Dispatch<SetStateAction<Boolean>>,
        tasks: Task[],
        filterList: Task[],
        setFilterList: Dispatch<SetStateAction<Task[]>>,
        selectFilters: string[],
        setSelectFilters: Dispatch<SetStateAction<string[]>>,
    }) {


    const [findIndex, setFindIndex] = useState<string>('');

    const toggleFilter = (status: string) => {

        const newFilter = selectFilters.includes(status) ? selectFilters.filter(s => s !== status) : [...selectFilters, status];
        setSelectFilters(newFilter);

        if (newFilter.length === 0 || status === '초기화') {
            setSelectFilters([]);
            setFilterList(tasks);
        } else {
            const filterTasks = tasks.filter(t => newFilter.includes(t.status));
            setFilterList(filterTasks);
        }
    }

    const toggleFindFilter = (find: string) => {

        const findTasks = filterList.filter(f => f.title.toLowerCase().includes(find.toLowerCase()));
        setFilterList(findTasks);
    }

    const enterEvent = (event: React.KeyboardEvent<HTMLElement>, find: string) => {

        if (event.key === 'Enter') {
            if (find === '') {
                setFilterList(tasks);
                return;
            }
            toggleFindFilter(find);
        }
    }

    return (<div className="task-filter-bar">
        <div className="task-filter-bar-find">
            <input type="text"
                className="task-filter-bar-find-input"
                value={findIndex}
                onChange={(e) => setFindIndex(e.target.value)}
                placeholder="작업 검색하기"
                onKeyDown={(e) => enterEvent(e, findIndex)}
            />
            <img
                className="task-filter-bar-find-img"
                src="./search.svg"
                onClick={() => {
                    toggleFindFilter(findIndex)
                }}
            />
        </div>
        <div className="task-filter-bar-right" style={{ display: 'flex', gap: '5px' }}>
            <div className="task-filter-bar-select">
                <DropdownMenu.Root>
                    <DropdownMenu.Trigger asChild
                        style={{ display: 'flex' }}>
                        <button className="task-filter-bar-select-btn">작업 상태
                            {selectFilters.length > 0 && (<span className="task-filter-bar-select-count">
                                {selectFilters.length}
                            </span>)}
                        </button>
                    </DropdownMenu.Trigger>
                    <DropdownMenu.Portal>
                        <DropdownMenu.Content className="task-filter-bar-select-content">
                            {statusSelects.map(status => (
                                <DropdownMenu.CheckboxItem
                                    key={status}
                                    className="filter-bar-select-item"
                                    checked={selectFilters.includes(status)}
                                    onCheckedChange={() => toggleFilter(status)}>
                                    <DropdownMenu.ItemIndicator className="indicator">
                                        ✔️
                                    </DropdownMenu.ItemIndicator>
                                    {status}
                                </DropdownMenu.CheckboxItem>
                            ))}

                            {selectFilters.length > 0 && (
                                <DropdownMenu.Separator className="separator">
                                    <DropdownMenu.Item
                                        className="filter-reset"
                                        onSelect={() => toggleFilter('초기화')}>
                                        초기화
                                    </DropdownMenu.Item>
                                </DropdownMenu.Separator>
                            )}
                        </DropdownMenu.Content>
                    </DropdownMenu.Portal>
                </DropdownMenu.Root>
            </div>
            <div className="task-filter-bar-add">
                <button
                    className="task-filter-bar-add-btn"
                    onClick={() => {
                        setAddBar(!addBar);
                    }}
                >작업 추가하기</button>
            </div>
        </div>
    </div>)
}