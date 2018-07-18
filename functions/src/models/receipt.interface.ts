export interface Receipt {
    created: Date;
    date: Date;
    total: number;
    category: string;
    fileName: string;
    text?: string;
}
