import { deleteTask, toggleCompleteTask } from "@/app/features/todo/todoSlice";
import { useAppDispatch } from "@/app/hook";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { cn } from "@/lib/utils";
import type { ITask } from "@/types";
import { Trash2 } from "lucide-react";

interface IProps {
  task: ITask;
}

export default function TaskCard({ task }: IProps) {
  const dispatch = useAppDispatch();
  return (
    <div className="border px-5 py-3 rounded-md">
      <div className="flex justify-between items-center">
        <div className="flex gap-2 items-center">
          <div
            title={task.isCompleted ? "Task Completed" : task.priority}
            className={cn("size-3 rounded-full cursor-pointer", {
              "bg-green-500": task.isCompleted,
              "bg-red-500": !task.isCompleted && task.priority === "High",
              "bg-yellow-300": !task.isCompleted && task.priority === "Medium",
              "bg-yellow-600": !task.isCompleted && task.priority === "Low",
            })}
          ></div>
          <h1
            className={cn({ "line-through text-green-400": task.isCompleted })}
          >
            {task.title}
          </h1>
        </div>
        <div className="flex gap-3 items-center">
          <Button
            onClick={() => dispatch(deleteTask(task.id))}
            variant="link"
            className="p-0 text-red-500 cursor-pointer"
          >
            <Trash2 />
          </Button>
          <Checkbox
            onClick={() => dispatch(toggleCompleteTask(task.id))}
            className="cursor-pointer"
          />
        </div>
      </div>
      <p className="mt-5">{task.description}</p>
    </div>
  );
}
