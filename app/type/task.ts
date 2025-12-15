export interface Task {
    id: string;
    userId: string;
    title: string;
    status: 'todo' | 'doing' | 'done';
    dueDate: Date | null;
}

export type TaskStatus = 'todo' | 'doing' | 'done';

export interface TaskSubmit {
    userId: string;
    title: string;
    status: TaskStatus;
    dueDate: Date | null;
}