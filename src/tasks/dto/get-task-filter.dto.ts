import { TaskStatus } from "../task.model";

export class GetTaskStatusFilterDto{
    status?: TaskStatus;
    search?: string;
}

