import { PlusCircleOutlined } from "@ant-design/icons";
import Divider from "../Divider";
import "./style.scss";
import { Input } from "antd";
import { useState } from "react";

const FromInputTask = (props) => {
  const [inputTaskName, setInputTaskName] = useState("");
  const { handleAddTask } = props;
  const handleChangeTaskName = (event) => {
    setInputTaskName(event.target.value);
  };
  const handleSubmitForm = (event) => {
    event.preventDefault();
    if (!inputTaskName){
      return
    }
    handleAddTask(inputTaskName);
    setInputTaskName("");
  };

  return (
    <div className="todo-list-header">
      <h2 className="todo-list-header__title">To do list Application</h2>
      <form className="todo-list-header__form" onSubmit={handleSubmitForm}>
        <Input
          size="large"
          placeholder="Please input task name..."
          value={inputTaskName}
          onChange={handleChangeTaskName}
        ></Input>
        <button className="todo-list-header__btn-add-task" type="submit">
          <PlusCircleOutlined style={{ fontSize: "30px" }} />
        </button>
      </form>
      <Divider></Divider>
    </div>
  );
};

export default FromInputTask;
