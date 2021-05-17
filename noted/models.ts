export interface Task {
    id: number;
    title: string;
    content: string;
    status: string;
    assign_to: string;
    due_date: Date;
    is_deleted: boolean;
}

export interface User {
    id: number;
    username: string;
    password: string;
}
