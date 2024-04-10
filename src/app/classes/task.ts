export class Task {
    id: number = 0;
    title: string = "";
    description: string = "";
    status: any = {name: "pending"};
    createDate: Date = new Date();
    endDate: Date | null = null;
}
