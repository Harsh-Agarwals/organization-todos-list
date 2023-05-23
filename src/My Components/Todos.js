import React, { useState } from "react";
import "./addMembers.css";

export default function Todos(props) {
    let cardStyle = {
        backgroundColor: "rgba(255, 250, 150, 0.6)",
    };
    let [style, setStyle] = useState("danger");
    const changeStyle = (index, dept, member) => {
        const newStyle = style === "danger" ? "success" : "danger";
        const newTodox = [...props.todos];
        newTodox[index] = { ...newTodox[index], style: newStyle };
        props.updateTodos(newTodox, dept, member);
        setStyle(newStyle);
    };
    let [job, updateJob] = useState("");
    let [desc, updateDesc] = useState("");
    const addTodo = (e) => {
        e.preventDefault();
        if (!job || !desc) {
            alert("Fill both Job and Description for this member!");
        } else {
            props.addTodo(job, desc, props.dept, props.member);
            updateJob("");
            updateDesc("");
        }
    };
    const deleteTodo = (dept, member, todo) => {
        props.deleteTodo(dept, member, todo);
    };
    return (
        <div className="" style={cardStyle}>
            {props.todos.length >= 1 ? (
                props.todos.map((x) => {
                    return (
                        <div key={Math.random()}>
                            <div className="px-3 pt-3">
                                {x.style ? (
                                    <h4 className={x.style}>{x.job}</h4>
                                ) : (
                                    <h4 className={"danger"}>{x.job}</h4>
                                )}
                                <p className="">{x.desc}</p>
                                <button
                                    className="btn btn-danger btn-sm mb-4 mt-0 mx-2"
                                    title="Delete Todo"
                                    onClick={() =>
                                        deleteTodo(props.dept, props.member, x)
                                    }
                                >
                                    <i className="fa-regular fa-trash-can"></i>
                                </button>
                                <button
                                    className="btn btn-success btn-sm mb-4 mt-0"
                                    title="Complete Todo"
                                    onClick={() =>
                                        changeStyle(
                                            props.todos.indexOf(x),
                                            props.dept,
                                            props.member
                                        )
                                    }
                                >
                                    <i className="fa-solid fa-check"></i>
                                </button>
                            </div>
                            <hr className="m-0" />
                        </div>
                    );
                })
            ) : (
                <div className="text-center py-4 text-success">
                    <p>No todos here, enjoy your day!!</p>
                </div>
            )}
            <hr className="m-0" />
            <div className="container py-3 bg-success-subtle px-4">
                <form
                    onSubmit={addTodo}
                    className="d-flex flex-column justify-content-around align-items-center"
                >
                    <input
                        type="text"
                        name="job"
                        id="job"
                        placeholder="Job"
                        className="form-control"
                        value={job}
                        onChange={(e) => updateJob(e.target.value)}
                    />
                    <input
                        type="text"
                        name="desc"
                        id="desc"
                        placeholder="Description"
                        className="form-control my-2"
                        value={desc}
                        onChange={(e) => updateDesc(e.target.value)}
                    />
                    <input
                        type="submit"
                        value="Add Task"
                        className="btn btn-info btn-sm"
                    />
                </form>
            </div>
        </div>
    );
}
