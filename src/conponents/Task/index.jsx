import { CheckOutlined, DeleteOutlined } from "@ant-design/icons";
import Divider from "../Divider";
import "./style.scss";

const Task = (props) => {
  const { taskName, isDone, id } = props.task;
  const { handleRemoveTask, handleMakeDoneTask } = props;
  return (
    <>
      <div className="task">
        <p className={`task__name ${isDone ? "task__name--done" : ""}`}>
          {taskName}
        </p>
        <div className="task__groups-btn">
          <button
            className="task__btn-done"
            onClick={() => {
              handleMakeDoneTask(id);
            }}
          >
            <CheckOutlined />
          </button>
          <button
            className="task__btn-del"
            onClick={() => {
              handleRemoveTask(id);
            }}
          >
            <DeleteOutlined />
          </button>
        </div>
      </div>
      <Divider></Divider>
    </>
  );
};
export default Task;
