import React from "react";
import { FaRegEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";

const Tasks = (props) => {
  return (
    <>
      <div className="todo_style">
        <li className="listItem" style={{ listStyle: "none" }}>
          {props.value}
        </li>
        <MdDelete
          className="fa-times"
          title="delete item"
          onClick={() => {
            props.onDelete(props.id);
          }}
        />
        <FaRegEdit
          className="edit"
          title="edit item"
          onClick={() => {
            props.onEdit(props.id);
          }}
        />
      </div>
    </>
  );
};

export default Tasks;
