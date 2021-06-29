import React, { useState, useEffect } from "react";
import "./App.css";
import Tasks from "./Tasks";
import { TiThList } from "react-icons/ti";
import { FaRegEdit } from "react-icons/fa";

//get data from local storage
const getLocalItems = () => {
  let lists = localStorage.getItem("lists");

  if (lists) {
    return JSON.parse(localStorage.getItem("lists"));
  } else {
    return [];
  }
};

const App = () => {
  const [item, setItem] = useState("");

  const [itemsarr, setItemsarr] = useState(getLocalItems());
  const [toggle, setToggle] = useState(true);
  const [isEditItem, setIsEditItem] = useState(null);

  const inputEvent = (event) => {
    setItem(event.target.value);
  };

  const onAdd = () => {
    if (item && toggle) {
      const entry = { id: new Date().getTime().toString(), name: item };
      setItemsarr([...itemsarr, entry]);
      setItem("");
    } else if (item && !toggle) {
      setItemsarr(
        itemsarr.map((elem) => {
          if (elem.id === isEditItem) {
            return { ...elem, name: item };
          }
          return elem;
        })
      );
      setItem("");
      setToggle(true);
      setIsEditItem(null);
    } else {
      alert("Plz enter a todo item");
    }
  };

  const onDelete = (id) => {
    setItemsarr((oldItems) => {
      return oldItems.filter((oldItem) => {
        return oldItem.id !== id;
      });
    });
  };

  const onRemove = () => {
    setItemsarr([]);
  };

  const onEdit = (id) => {
    const editItem = itemsarr.find((eItem) => {
      return eItem.id === id;
    });
    console.log(editItem);
    setItem(editItem.name);
    setToggle(false);
    setIsEditItem(id);
  };

  //add data to local storage
  useEffect(() => {
    localStorage.setItem("lists", JSON.stringify(itemsarr));
  }, [itemsarr]);

  return (
    <>
      <div className="main_div">
        <div className="center_div">
          <div className="heading">
            <TiThList className="icon" />
            <h1>ToDo List</h1>
          </div>

          <input
            type="text"
            placeholder="✍️ Add an item"
            value={item}
            onChange={inputEvent}
          />
          {toggle ? (
            <button className="plus" onClick={onAdd}>
              +
            </button>
          ) : (
            <FaRegEdit className="edit1" title="edit item" onClick={onAdd} />
          )}

          <ol>
            {itemsarr.map((val) => {
              const { id, name } = val;
              return (
                <Tasks
                  key={id}
                  id={id}
                  value={name}
                  onDelete={onDelete}
                  onEdit={onEdit}
                />
              );
            })}
          </ol>
          <div className="minus">
            <button className="removeAll" onClick={onRemove}>
              Remove All..
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default App;
