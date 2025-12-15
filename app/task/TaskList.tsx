'use client';

import { Task } from "@/app/type/task";
import { dueDateDBUpdate, getTasks } from "@/lib/taskService";
import TaskDrop from "./TaskDrop";
import "../css/all.css";
import "../css/task-list.css";
import { Dispatch, SetStateAction, useState } from "react";

export default function TaskList({ tasks, loadTask, filterList, setFilterList }:
    {
        tasks: Task[],
        loadTask: () => Promise<void>,
        filterList: Task[],
        setFilterList: Dispatch<SetStateAction<Task[]>>
    }) {

    const [sortOrder, setSortOrder] = useState<boolean>(false);
    const [sortDate, setSortDate] = useState<boolean>(false);

    const toggleTitleBy = [...filterList].sort((a, b) => {
        if (sortOrder !== true) { // 오름차순
            return a.title.localeCompare(b.title);
        } else { // 내림차순(default)
            return b.title.localeCompare(a.title);
        }
    })

    const toggleDueDate = [...filterList].sort((a, b) => {

        if (sortDate !== true) {
            if (!a.dueDate) return 1;
            if (!b.dueDate) return -1;
            return a.dueDate.getTime() - b.dueDate.getTime();
        } else {
            if (!a.dueDate) return -1;
            if (!b.dueDate) return 1;
            return b.dueDate.getTime() - a.dueDate.getTime();
        }
    })

    return (<div className="task-list-container">

        <div className="task-list-header">
            <div
                className="task-list-header-title"
                onClick={() => {
                    setSortOrder(!sortOrder);
                    setFilterList(toggleTitleBy);
                }}
            >작업명<span>{sortOrder ? '🔺' : '🔻'}</span></div>
            <div
                style={headerDueDate}
                onClick={() => {
                    setSortDate(!sortDate);
                    setFilterList(toggleDueDate);
                }}
            >마감일<span>{sortDate ? '🔺' : '🔻'}</span></div>
            <div style={headerStatus}>상태</div>
        </div>
        {tasks.map(t => (
            <div key={t.id} className={`task-list-item ${t.id}`} style={index}>
                <div className="task-list-title">{t.title}</div>
                <div
                    className="task-add-due-date">
                    <input
                        type="date"
                        value={t.dueDate?.toISOString().split('T')[0]}
                        onChange={(e) => { dueDateDBUpdate(t.id, new Date(e.target.value)); loadTask(); }}
                        min={new Date().toISOString().split('T')[0]}
                    />
                </div>
                <TaskDrop
                    status={t.status} taskId={t.id} scale="90%" />
            </div>
        ))}
    </div>)
}

const index: React.CSSProperties = {
    display: 'flex',
    justifyContent: 'space-between'
}

const headerDueDate: React.CSSProperties = {
    cursor: 'pointer',
    width: '129px',
    paddingLeft: '3px',
    fontWeight: 'bold'
}

const headerStatus: React.CSSProperties = {
    width: '100px',
    paddingLeft: '13px',
    fontWeight: 'bold'
}