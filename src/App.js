import { Pagination, Spin } from "antd";
import "./app.scss";
import Task from "./conponents/Task";
import Divider from "./conponents/Divider";
import FromInputTask from "./conponents/FormInputTask";
import { useEffect, useState } from "react";
import { TaskApi } from "./apis/taskApi";


function App() {
  const [tasks, setTasks] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [pagination, setPagination] = useState({
    currentPage: 1,
    limitPerPage: 5,
    totalTask: 0,
  });
  const fetchAllTasks = async (params) => {
    setIsLoading(true);
    const response = await TaskApi.getAllTasks(params);
    setTasks(response.data)
    setPagination({
      ...pagination,
      totalTask: response.headers["x-total-count"],
    });
    setIsLoading(false)
  }
  useEffect(() => {
    fetchAllTasks({
      _page: pagination.currentPage,
      _limit: pagination.limitPerPage
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pagination.currentPage])
  const renderTaskList = (tasks) => {
    if (!tasks.length) {
      return <div>Please input your task...</div>
    }
    return tasks.map((task) => (
      <Task
        key={task.id}
        task={task}
        handleRemoveTask={handleRemoveTask}
        handleMakeDoneTask={handleMakeDoneTask}
      ></Task>
    ));
  }
  const handleRemoveTask = async (taskId) => {
    await TaskApi.removeTaskById(taskId);
    fetchAllTasks({
      _page: pagination.currentPage,
      _limit: pagination.limitPerPage
    })
  };
  const handleMakeDoneTask = async (taskId) => {
    const payload = {
      isDone: true,
    };
    await TaskApi.makeDoneTaskById(taskId, payload);
    fetchAllTasks({
      _page: pagination.currentPage,
      _limit: pagination.limitPerPage
    })
  };


  const handleAddTask = async (taskName) => {
    const _task = {
      taskName: taskName,
      isDone: false,
      createAt: new Date().getTime(),
    };
    await TaskApi.createTask(_task)
    fetchAllTasks({
      _page: pagination.currentPage,
      _limit: pagination.limitPerPage
    });
  };

  const handleChangePage = (page) => {
    setPagination({
      ...pagination,
      currentPage: page,

    })
  };
  return (
    <div className="App">
      <div className="todo-list-container">
        <div className="todo-list-wrapper">
          <FromInputTask handleAddTask={handleAddTask}></FromInputTask>
          <div className="todo-list-main">
            {isLoading ? <Spin></Spin> : renderTaskList(tasks)}
          </div>
          <Divider></Divider>
          <div className="todo-list-pagination">
            <Pagination
              defaultCurrent={pagination.currentPage}
              current={pagination.currentPage}
              total={pagination.totalTask}
              pageSize={pagination.limitPerPage}
              onChange={handleChangePage}
            ></Pagination>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
