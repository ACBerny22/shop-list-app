export interface Task {
    id: string;
    name: string;
    description: string;
}

export interface TaskTransaction {
    update: {
        table: string;
        id: string;
        fields: { status: string };
    };
}
