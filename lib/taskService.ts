
import { Task } from "@/app/type/task";
import { db } from "@/lib/firebase";
import { addDoc, collection, doc, getDocs, query, Timestamp, updateDoc, where } from "firebase/firestore";

const TASKS_COLLECTION = 'tasks';

export async function addTask(userId: string | null | undefined, title: string, dueDate: Date | null) {

    if (userId == null || userId == undefined) {
        alert('작업 추가가 불가합니다. 로그인 상태를 확인해주세요');
        return;
    }

    if (!title || title.trim() === "") {
        alert("작업 내용을 입력해주세요");
        return false;
    }

    if (dueDate && isNaN(dueDate.getTime())) {
        alert('마감일을 선택해주세요');
        return false;
    }

    await addDoc(collection(db, TASKS_COLLECTION), {
        userId,
        title,
        status: 'todo',
        dueDate: dueDate ? Timestamp.fromDate(dueDate) : null,
    });

    return true;
}

export async function getTasks(userId: string | null | undefined): Promise<Task[]> {

    if (userId == null || userId == undefined) {
        return [];
    }

    const q = query(
        collection(db, TASKS_COLLECTION),
        where('userId', '==', userId)
    );

    const snapshot = await getDocs(q);

    return snapshot.docs.map(doc => {
        const data = doc.data();

        return {
            id: doc.id,
            title: data.title,
            status: data.status,
            dueDate: data.dueDate ? data.dueDate.toDate() : null,
        }
    }) as Task[];
}

export async function statusDBUpdate(taskId: string, status: string): Promise<void> {

    const taskRef = doc(db, TASKS_COLLECTION, taskId);
    await updateDoc(taskRef, {
        status
    });
}

export async function dueDateDBUpdate(taskId: string, dueDate: Date): Promise<void> {
    const taskRef = doc(db, TASKS_COLLECTION, taskId);
    await updateDoc(taskRef, {
        dueDate: dueDate ? Timestamp.fromDate(dueDate) : null
    });
}