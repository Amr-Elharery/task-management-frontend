import { useState } from 'react';

import TaskTable from '../components/TaskTable';
import DashboardHeader from '../components/DashboardHeader';
import EditTaskDialog from '../components/EditTaskDialog';

import type { TaskWithId } from '../types';

import { useGetTasks } from '../hooks/useGetTasks';
import DeleteTaskDialog from '../components/DeleteTaskDialog';
import ViewTaskDialog from '../components/ViewTaskDialog';

export default function Dashboard() {
  const [selectedTask, setSelectedTask] = useState<TaskWithId | null>(null);
  const [deletingTask, setDeletingTask] = useState<TaskWithId | null>(null);

  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

  // My hooks
  const { data, isLoading, error, refetch } = useGetTasks();

  const handleView = (task: TaskWithId) => {
    setSelectedTask(task);
    setIsViewDialogOpen(true);
  };

  const handleEdit = (task: TaskWithId) => {
    setSelectedTask(task);
    setIsEditDialogOpen(true);
  };

  const handleUpdated = () => {
    setIsEditDialogOpen(false);
    setSelectedTask(null);
    refetch();
  };

  const handleDelete = (task: TaskWithId) => {
    setDeletingTask(task);
    setIsDeleteDialogOpen(true);
  };

  const handleDeleted = () => {
    setIsDeleteDialogOpen(false);
    setDeletingTask(null);
    refetch();
  };

  return (
    <div className="container mx-auto mt-6 space-y-6 px-6 lg:mt-10 lg:px-8">
      <DashboardHeader />

      <TaskTable
        tasks={data?.tasks || []}
        isLoading={isLoading}
        error={error}
        onView={handleView}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />

      <ViewTaskDialog
        task={selectedTask}
        open={isViewDialogOpen}
        onOpenChange={(open) => {
          setIsViewDialogOpen(open);

          if (!open) {
            setSelectedTask(null);
          }
        }}
      />

      <EditTaskDialog
        task={selectedTask}
        open={isEditDialogOpen}
        onOpenChange={(open) => {
          setIsEditDialogOpen(open);

          if (!open) {
            setSelectedTask(null);
          }
        }}
        onUpdated={handleUpdated}
      />

      <DeleteTaskDialog
        task={deletingTask}
        open={isDeleteDialogOpen}
        onOpenChange={(open) => {
          setIsDeleteDialogOpen(open);

          if (!open) {
            setDeletingTask(null);
          }
        }}
        onDeleted={handleDeleted}
      />
    </div>
  );
}
