export interface AppProps {
    title: string;
    description?: string;
}

export interface User {
    id: number;
    name: string;
    email: string;
}

export type ApiResponse<T> = {
    data: T;
    error?: string;
};