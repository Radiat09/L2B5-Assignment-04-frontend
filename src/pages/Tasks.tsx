import { selecttasks, updateFilter } from "@/app/features/todo/todoSlice";
import { useAppDispatch } from "@/app/hook";
import { AddTaskModal } from "@/components/module/tasks/AddTaskModal";
import TaskCard from "@/components/module/tasks/TaskCard";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useSelector } from "react-redux";

export default function Tasks() {
  const tasks = useSelector(selecttasks);
  const dispatch = useAppDispatch();

  return (
    <div className="mx-auto max-w-7xl px-5 mt-20">
      <div className="flex items-center justify-end gap-5">
        <h1 className="mr-auto">Tasks</h1>
        <Tabs defaultValue="All">
          <TabsList>
            <TabsTrigger
              onClick={() => dispatch(updateFilter("All"))}
              className="cursor-pointer"
              value="All"
            >
              All
            </TabsTrigger>
            <TabsTrigger
              onClick={() => dispatch(updateFilter("Low"))}
              className="cursor-pointer"
              value="Low"
            >
              Low
            </TabsTrigger>
            <TabsTrigger
              onClick={() => dispatch(updateFilter("Medium"))}
              className="cursor-pointer"
              value="Medium"
            >
              Medium
            </TabsTrigger>
            <TabsTrigger
              onClick={() => dispatch(updateFilter("High"))}
              className="cursor-pointer"
              value="High"
            >
              High
            </TabsTrigger>
          </TabsList>
        </Tabs>
        <AddTaskModal />
      </div>
      <div className="space-y-5 mt-5">
        {tasks.map((task, i) => (
          <TaskCard task={task} key={task.id || i} />
        ))}
      </div>
    </div>
  );
}
