'use client';

import { useEffect, useState } from "react";
import { getTasks } from "@/lib/taskService";
import { Task } from "@/app/type/task";
import TaskFilter from "./TaskFilter";
import TaskAdd from "./TaskAdd";
import TaskList from "./TaskList";
import AuthHeader from "../auth/AuthHeader";
import { useAuth } from "../auth/AuthProvider";

export default function TaskMain() {

    const [addBar, setAddBar] = useState<Boolean>(false);

    const [tasks, setTasks] = useState<Task[]>([]);
    const [filterList, setFilterList] = useState<Task[]>([]);
    const [selectFilters, setSelectFilters] = useState<string[]>([]);

    const { user } = useAuth();
    const loadTask = async () => {

        const userId = user?.email;

        try {
            const data = await getTasks(userId);
            setTasks(data);
            setFilterList(data);
        } catch (error) {
            console.error('Task 로딩 실패', error);
        }
    }

    useEffect(() => {
        loadTask();
    }, [user])

    return (
        <div id="task" style={task}>
            <AuthHeader></AuthHeader>
            <h1 style={taskTitle}>📃작업 관리</h1>
            <div style={taskDescription}>복잡한 스케줄 관리를 손쉽게 해보세요🐳</div>
            <TaskFilter addBar={addBar} setAddBar={setAddBar} tasks={tasks} filterList={filterList} setFilterList={setFilterList} selectFilters={selectFilters} setSelectFilters={setSelectFilters} />
            {addBar && <TaskAdd></TaskAdd>}
            <TaskList tasks={filterList} loadTask={loadTask} filterList={filterList} setFilterList={setFilterList} selectFilters={selectFilters} setTasks={setTasks}></TaskList>
        </div>
    )
}


const task: React.CSSProperties = {

    color: '#363636ff',
    margin: '0 auto'
}

const taskTitle: React.CSSProperties = {
    marginTop: '20px', marginLeft: '10px', fontSize: '40px', fontWeight: 'bold', borderBottom: '1px solid #ccccccff', width: '250px'
}

const taskDescription: React.CSSProperties = {
    margin: '10px', fontWeight: '500'
}