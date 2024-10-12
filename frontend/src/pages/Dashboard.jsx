import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchTasks,
  addTask,
  updateTask,
  deleteTask,
  toggleTaskStatus,
} from "../redux/taskSlice";
import { useColorMode } from "@chakra-ui/react";
import {
  ADD_TASK_TEXT,
  UPDATE_TASK_TEXT,
  TITLE_PLACEHOLDER,
  DESCRIPTION_PLACEHOLDER,
  DUE_DATE_PLACEHOLDER,
  FILTER_TASKS_TEXT,
  ALL_TEXT,
  COMPLETED_TEXT,
  PENDING_TEXT,
  LOADING_TASKS_TEXT,
  MARK_AS_COMPLETED_TEXT,
  MARK_AS_PENDING_TEXT,
  DELETE_TEXT,
  EDIT_TEXT,
} from "../constants/identifiers";

// Random cards color
const getRandomColor = () => {
  const colors = [
    "bg-red-200",
    "bg-yellow-200",
    "bg-green-200",
    "bg-blue-200",
    "bg-indigo-200",
    "bg-purple-200",
    "bg-pink-200",
  ];
  const randomIndex = Math.floor(Math.random() * colors.length);
  return colors[randomIndex];
};

const Dashboard = () => {
  const dispatch = useDispatch();
  const { colorMode } = useColorMode();
  const { tasks, loading } = useSelector((state) => state.tasks);
  const [newTask, setNewTask] = useState({
    title: "",
    description: "",
    dueDate: "",
  });
  const [editingTask, setEditingTask] = useState(null);
  const [filter, setFilter] = useState(ALL_TEXT);

  useEffect(() => {
    dispatch(fetchTasks());
  }, [dispatch]);

  //   Task Crud Operations
  const handleAddOrUpdateTask = async (e) => {
    e.preventDefault();
    if (editingTask) {
      try {
        await dispatch(updateTask({ id: editingTask._id, data: newTask }));
        setEditingTask(null);
      } catch (error) {
        console.error(error);
      }
    } else {
      try {
        await dispatch(addTask(newTask));
      } catch (error) {
        console.error(error);
      }
    }
    setNewTask({ title: "", description: "", dueDate: "" });
  };

  const handleEditTask = (task) => {
    setEditingTask(task);
    setNewTask({
      title: task.title,
      description: task.description,
      dueDate: task.dueDate,
    });
  };

  const handleDeleteTask = async (id) => {
    try {
      await dispatch(deleteTask(id));
    } catch (error) {
      console.error(error);
    }
  };

  const handleToggleCompleted = async (task) => {
    try {
      await dispatch(toggleTaskStatus(task._id));
    } catch (error) {
      console.error(error);
    }
  };

  //   Bonus - added filter for sorting
  const filteredTasks = tasks.filter((task) => {
    if (filter === COMPLETED_TEXT) return task.completed;
    if (filter === PENDING_TEXT) return !task.completed;
    return true;
  });

  if (loading) {
    return <p className="text-center text-blue-500">{LOADING_TASKS_TEXT}</p>;
  }

  return (
    <div className="min-h-screen py-8">
      <div className="container mx-auto">
        <h1 className="text-3xl font-semibold text-center mb-8">Your Tasks</h1>

        <form onSubmit={handleAddOrUpdateTask} className="mb-4">
          <input
            type="text"
            value={newTask.title}
            onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
            placeholder={TITLE_PLACEHOLDER}
            className="border border-gray-300 rounded-lg p-2 mr-2"
            required
          />
          <input
            type="text"
            value={newTask.description}
            onChange={(e) =>
              setNewTask({ ...newTask, description: e.target.value })
            }
            placeholder={DESCRIPTION_PLACEHOLDER}
            className="border border-gray-300 rounded-lg p-2 mr-2"
            required
          />
          <input
            type="date"
            value={newTask.dueDate}
            onChange={(e) =>
              setNewTask({ ...newTask, dueDate: e.target.value })
            }
            className="border border-gray-300 rounded-lg p-2 mr-2"
            required
          />
          <button
            type="submit"
            className="bg-blue-500 text-white rounded-lg px-4 py-2"
          >
            {editingTask ? UPDATE_TASK_TEXT : ADD_TASK_TEXT}
          </button>
        </form>

        <div className="mb-4">
          <label className="mr-2">{FILTER_TASKS_TEXT}</label>
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="border border-gray-300 rounded-lg p-2"
          >
            <option value={ALL_TEXT}>{ALL_TEXT}</option>
            <option value={COMPLETED_TEXT}>{COMPLETED_TEXT}</option>
            <option value={PENDING_TEXT}>{PENDING_TEXT}</option>
          </select>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTasks.map((task) => {
            const cardBgColor = getRandomColor();
            const textColor =
              colorMode === "light" ? "text-gray-900" : "text-gray-100";
            return (
              <div
                key={task._id}
                className={`${cardBgColor} p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow`}
              >
                <h2 className={`text-xl font-medium mb-2 ${textColor}`}>
                  {task.title}
                </h2>
                <p className={`text-gray-600 mb-4 ${textColor}`}>
                  {task.description}
                </p>
                <p className={`text-sm ${textColor}`}>
                  {DUE_DATE_PLACEHOLDER}:{" "}
                  {new Date(task.dueDate).toLocaleDateString()}
                </p>
                <p
                  className={`text-sm font-semibold mt-4 ${
                    task.completed ? "text-green-500" : "text-red-500"
                  }`}
                >
                  {task.completed ? COMPLETED_TEXT : PENDING_TEXT}
                </p>
                <div className="flex justify-between mt-4">
                  <button
                    className="text-blue-500 hover:underline"
                    onClick={() => handleToggleCompleted(task)}
                  >
                    {task.completed
                      ? MARK_AS_PENDING_TEXT
                      : MARK_AS_COMPLETED_TEXT}
                  </button>
                  <button
                    className="text-red-500 hover:underline"
                    onClick={() => handleDeleteTask(task._id)}
                  >
                    {DELETE_TEXT}
                  </button>
                  <button
                    className="text-blue-500 hover:underline"
                    onClick={() => handleEditTask(task)}
                  >
                    {EDIT_TEXT}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
