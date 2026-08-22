import { useEffect, useState } from 'react';

import TaskTable from '../components/TaskTable';
import DashboardHeader from '../components/DashboardHeader';
import EditTaskDialog from '../components/EditTaskDialog';

import type { TaskQuery, TaskWithId } from '../types';

import { useGetTasks } from '../hooks/useGetTasks';
import DeleteTaskDialog from '../components/DeleteTaskDialog';
import ViewTaskDialog from '../components/ViewTaskDialog';
import type { TaskStatus, TaskPriority } from '../components/TaskFilters';
import TaskToolbar from '../components/TaskToolbar';

export default function Dashboard() {
  const [selectedTask, setSelectedTask] = useState<TaskWithId | null>(null);
  const [deletingTask, setDeletingTask] = useState<TaskWithId | null>(null);

  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

  const [query, setQuery] = useState<TaskQuery>({
    page: 1,
    limit: 10,
  });
  const [search, setSearch] = useState('');
  // My hooks
  const { data, isLoading, error, refetch } = useGetTasks(query);

  useEffect(() => {
    const timer = setTimeout(() => {
      setQuery((prev) => ({
        ...prev,
        search: search || undefined,
        page: 1,
      }));
    }, 600);

    return () => clearTimeout(timer);
  }, [search]);

  // Actions
  const handleView = (task: TaskWithId) => {
    setSelectedTask(task);
    setIsViewDialogOpen(true);
  };

  //Filtering and searching
  const handleSearchChange = (value: string) => {
    setSearch(value);
  };

  const handleStatusChange = (status: TaskStatus) => {
    setQuery((prev) => ({
      ...prev,
      status: status === 'all' ? undefined : status,
      page: 1,
    }));
  };

  const handlePriorityChange = (priority: TaskPriority) => {
    setQuery((prev) => ({
      ...prev,
      priority: priority === 'all' ? undefined : priority,
      page: 1,
    }));
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

      <TaskToolbar
        search={search || ''}
        status={query.status || 'all'}
        priority={query.priority || 'all'}
        onSearchChange={handleSearchChange}
        onStatusChange={handleStatusChange}
        onPriorityChange={handlePriorityChange}
      />

      <TaskTable
        tasks={data?.data?.tasks || []}
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
