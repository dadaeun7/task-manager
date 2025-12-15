'use client';

import { useState } from "react";
import "../css/task-add.css";
import { addTask, getTasks } from "@/lib/taskService";
import '@/app/globals.css';
import "../css/task-add.css"
import { useAuth } from "../auth/AuthProvider";

export default function TaskAdd() {

    const [title, setTitle] = useState<string>('');
    const [dueDate, setDueDate] = useState('');

    const { user } = useAuth();

    return (
        <div className="task-add-container">
            <div className="task-add-title-wrap">
                <span className="task-add-label" style={{ marginLeft: '10px' }}>작업명: </span>
                <input
                    type="text"
                    className="task-add-input"
                    value={title}
                    onChange={(e) => {
                        setTitle(e.target.value);
                    }}
                    placeholder="새로운 Task 입력하기"
                />
            </div>
            <div className="task-add-etc-wrap">
                <div className="task-add-due-date">
                    <input
                        type="date"
                        value={dueDate}
                        onChange={(e) => setDueDate(e.target.value)}
                        min={new Date().toISOString().split('T')[0]}
                    />
                </div>

                <div style={{ textAlign: 'center' }}>
                    <button
                        className="task-add-submit"
                        onClick={async () => {

                            const newTaskId = await addTask(user?.email, title, new Date(dueDate));

                            if (newTaskId) {
                                console.log('Task가 추가되었습니다: ', newTaskId);
                                window.location.reload();
                            }

                        }}
                    >추가하기</button>
                </div>

            </div>

        </div>
    )
}