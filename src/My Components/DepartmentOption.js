import React from "react";
import Todos from "./Todos";
import "../My Components/addMembers.css";
import { useState } from "react";

export default function DepartmentOption({
    departments,
    members,
    todos,
    addDept,
    addNewMember,
    addTodo,
    removeDept,
    removeMemb,
    removeTodo,
    deptEdit,
    membEdit,
    updateTodos,
}) {
    let deptStyles = {
        backgroundColor: "#F4E306",
        color: "#fff",
    };
    let cardHr = {
        border: "none",
        borderBottom: "2px solid black",
        margin: "0",
    };
    let successHr = {
        border: "none",
        borderBottom: "4px solid green",
        width: "150px",
        margin: "1rem auto",
    };
    let [dept, updateDept] = useState("");
    let [member, updateMember] = useState("");
    const submitDept = (e) => {
        e.preventDefault();
        if (dept) {
            if (departments.includes(dept.toLowerCase())) {
                alert("Name already included, please use that!");
                updateDept("");
            } else {
                addDept(dept);
                updateDept("");
            }
        } else {
            alert("This is needed to be filled!");
        }
    };
    const addMember = async (e) => {
        e.preventDefault();
        if (member) {
            if (
                members[dept.toLowerCase()].includes(
                    member.slice(0, 1).toUpperCase() + member.slice(1)
                )
            ) {
                alert(
                    `Member already included in ${dept} department, please edit there!`
                );
                updateMember("");
            } else {
                await addNewMember(
                    dept,
                    member.slice(0, 1).toUpperCase() +
                        member.slice(1).toLowerCase()
                );
                updateMember("");
            }
        } else {
            alert("Member is needed to be filled!");
        }
    };
    const deleteDept = (dept) => {
        removeDept(dept);
    };
    const editDept = (dept) => {
        deptEdit(dept);
    };
    const deleteMemb = (dpt, memb) => {
        removeMemb(dpt, memb);
    };
    const editMemb = (dpt, memb) => {
        membEdit(dpt, memb);
    };
    return (
        <>
            {departments.length >= 1 ? (
                <div className="container">
                    {departments.map((x) => (
                        <div style={deptStyles} className="rounded-sm-4">
                            <div className="d-flex align-items-center justify-content-between bg-warning text-danger px-4 py-2 border-top border-bottom border-danger rounded-sm-4 my-4">
                                <h2 className="">
                                    {x.slice(0, 1).toUpperCase() + x.slice(1)}
                                </h2>
                                <div className="bg-warning">
                                    <button
                                        className="btn btn-danger btn-sm "
                                        title="Delete Department"
                                        onClick={() => deleteDept(x)}
                                    >
                                        <i className="fa-regular fa-trash-can"></i>
                                    </button>
                                    <button
                                        className="btn btn-light btn-sm mx-2"
                                        title="Update Department"
                                        onClick={() => editDept(x)}
                                    >
                                        <i className="fa-solid fa-pen"></i>
                                    </button>
                                </div>
                            </div>
                            <div className="bg-warning mx-sm-3 rounded-sm pt-4">
                                {members[x.toLowerCase()].length >= 1 ? (
                                    <div className="row m-1 m-sm-4 my-4">
                                        {members[x.toLowerCase()].map((v) => {
                                            return (
                                                <>
                                                    <div className="col-md-6 col-lg-4 mb-3">
                                                        <div className="card rounded-3">
                                                            <div className="card-body py-0 bg-light text-dark rounded-3 px-0">
                                                                <div className="d-flex align-items-center justify-content-between px-3">
                                                                    <h4 className="card-title text-center py-3 m-0">
                                                                        {v
                                                                            .slice(
                                                                                0,
                                                                                1
                                                                            )
                                                                            .toUpperCase() +
                                                                            v
                                                                                .slice(
                                                                                    1
                                                                                )
                                                                                .toLowerCase()}
                                                                    </h4>
                                                                    <div className="text-center d-flex justify-content-center align-items-center">
                                                                        <button
                                                                            className="btn btn-danger btn-sm mx-1"
                                                                            title="Delete Member"
                                                                            onClick={() =>
                                                                                deleteMemb(
                                                                                    x,
                                                                                    v
                                                                                )
                                                                            }
                                                                        >
                                                                            <i className="fa-regular fa-trash-can"></i>
                                                                        </button>
                                                                        <button
                                                                            className="btn btn-warning btn-sm"
                                                                            title="Delete Member"
                                                                            onClick={() =>
                                                                                editMemb(
                                                                                    x,
                                                                                    v
                                                                                )
                                                                            }
                                                                        >
                                                                            <i className="fa-solid fa-pen"></i>
                                                                        </button>
                                                                    </div>
                                                                </div>
                                                                <hr
                                                                    style={
                                                                        cardHr
                                                                    }
                                                                />
                                                                <Todos
                                                                    todos={
                                                                        todos[
                                                                            x.toLowerCase()
                                                                        ][
                                                                            v.toLowerCase()
                                                                        ]
                                                                    }
                                                                    dept={x}
                                                                    member={v}
                                                                    addTodo={
                                                                        addTodo
                                                                    }
                                                                    deleteTodo={
                                                                        removeTodo
                                                                    }
                                                                    updateTodos={
                                                                        updateTodos
                                                                    }
                                                                />
                                                            </div>
                                                        </div>
                                                    </div>
                                                </>
                                            );
                                        })}
                                    </div>
                                ) : (
                                    <div className="text-success text-center mb-5">
                                        <hr style={successHr} />
                                        <h4>No members or tasks here</h4>
                                        <hr style={successHr} />
                                    </div>
                                )}
                                <div className="bg-success py-5 py-sm-4 my-sm-4 px-sm-5 container text-center">
                                    <form
                                        onSubmit={addMember}
                                        className="px-3 px-sm-5 d-sm-flex justify-content-sm-center container"
                                    >
                                        <input
                                            type="text"
                                            name="job"
                                            id="job"
                                            placeholder="Member Name"
                                            className="form-control me-2 form-text mt-0 my-2 my-sm-0"
                                            value={member}
                                            onChange={(e) => {
                                                updateMember(e.target.value);
                                                updateDept(x);
                                            }}
                                        />
                                        <input
                                            type="submit"
                                            value="Add Member"
                                            className="btn btn-info btn-sm"
                                        />
                                    </form>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <div className="mb-5">
                    <hr style={successHr} />
                    <h3 className="text-center text-success">
                        No Department tasks here
                    </h3>
                    <hr style={successHr} />
                </div>
            )}
            <div className=" bg-warning text-center mt-5">
                <form
                    className="bg-warning pt-4 pb-4 py-sm-5 px-3 px-sm-5 d-sm-flex justify-content-sm-center container"
                    onSubmit={submitDept}
                >
                    <input
                        type="text"
                        name="dept"
                        id="dept"
                        placeholder="Dept. name"
                        className="form-control me-2"
                        value={dept}
                        onChange={(e) => updateDept(e.target.value)}
                    />
                    <input
                        type="submit"
                        value="Add Department"
                        className="btn btn-dark btn-sm my-3 my-sm-0"
                    />
                </form>
            </div>
        </>
    );
}
