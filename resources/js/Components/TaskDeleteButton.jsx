import { useForm } from '@inertiajs/react';

const TaskDeleteButton = ({ task }) => {
  const { delete: destroy, processing } = useForm();

  const handleDelete = (e) => {
    e.preventDefault();

    if (confirm('Are you sure you want to delete this task?')) {
      destroy(route('tasks.destroy', task.id));
    }
  };

  return (
    <form onSubmit={handleDelete} className="inline ml-2">
      <button
        type="submit"
        className="text-blue-600 hover:underline mr-2"
        disabled={processing}
      >
        Delete
      </button>
    </form>
  );
};

export default TaskDeleteButton;
