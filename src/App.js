import "./App.css";
import Header from "./My Components/Header";
import About from "./My Components/About";
import Footer from "./My Components/Footer";
import DepartmentOption from "./My Components/DepartmentOption";
import logo from "./logo.png";
import { useState, useEffect } from "react";
import { Route, Routes, BrowserRouter as Router } from "react-router-dom";

function App() {
    let htmlStyle = {
        backgroundColor: "rgba(255, 250, 150, 0.6)",
    };
    let [departments, newDepts] = useState([]);
    let [members, newMembers] = useState({});
    let [todos, newTodos] = useState({});
    useEffect(() => {
        const storedData = localStorage.getItem("data");
        if (storedData) {
            const {
                departments: storedDepts,
                members: storedMembers,
                todos: storedTodos,
            } = JSON.parse(storedData);
            newDepts(storedDepts);
            newMembers(storedMembers);
            newTodos(storedTodos);
        }
    }, [newDepts, newMembers, newTodos]);
    useEffect(() => {
        const dataToStore = { departments, members, todos };
        localStorage.setItem("data", JSON.stringify(dataToStore));
    }, [departments, members, todos]);
    const addDept = (value) => {
        if (!departments.includes(value)) {
            departments.push(value.toLowerCase());
            members[value.toLowerCase()] = [];
            todos[value.toLowerCase()] = {};
        } else {
            departments.push(value.toLowerCase());
            newDepts(departments);
            members[value.toLowerCase()] = [];
            newMembers(members);
        }
    };
    const removeDept = (dept) => {
        newDepts(
            departments.filter((x) => x.toLowerCase() !== dept.toLowerCase())
        );
    };
    const deptEdit = (x) => {
        let newName = prompt("Update Department name").toLowerCase();
        if (departments.includes(newName)) {
            alert("Department already named this way!");
        } else {
            let deptUpdate = departments;
            deptUpdate[departments.indexOf(x)] = newName;
            newDepts(deptUpdate);

            let deptMembers = Object.assign({}, members);
            deptMembers[newName] = deptMembers[x];
            delete deptMembers[x];
            newMembers(deptMembers);

            let deptTodos = Object.assign({}, todos);
            deptTodos[newName] = Object.assign({}, todos[x]);
            delete deptTodos[x];
            newTodos(deptTodos);
        }
    };
    const addNewMember = (dept, memb) => {
        members[dept.toLowerCase()].push(memb);
        newMembers(members);
        todos[dept][memb.toLowerCase()] = [];
        newTodos(todos);
    };
    const removeMemb = (dept, member) => {
        let newMemb = Object.assign({}, members);

        newMemb[dept.toLowerCase()].splice(
            newMemb[dept.toLowerCase()].indexOf(member),
            1
        );
        newMembers(newMemb);
    };
    const membEdit = (dpt, memb) => {
        let newName = prompt("Enter this member's updated name");
        if (
            members[dpt].includes(
                newName.slice(0, 1).toUpperCase() +
                    newName.slice(1).toLowerCase()
            )
        ) {
            alert("Member already included!");
        } else {
            let deptMembs = Object.assign({}, members);
            deptMembs[dpt][deptMembs[dpt].indexOf(memb)] =
                newName.slice(0, 1).toUpperCase() + newName.slice(1);
            newMembers(deptMembs);

            let deptTodos = Object.assign({}, todos);
            deptTodos[dpt][newName.toLowerCase()] =
                deptTodos[dpt][memb.toLowerCase()];
            delete deptTodos[dpt][memb];
            newTodos(deptTodos);
        }
    };
    const addTodo = (job, desc, dept, member) => {
        if (todos[dept.toLowerCase()][member.toLowerCase()].length === 0) {
            todos[dept.toLowerCase()][member.toLowerCase()].push({
                sno: 1,
                job: job.slice(0, 1).toUpperCase() + job.slice(1).toLowerCase(),
                desc:
                    desc.slice(0, 1).toUpperCase() +
                    desc.slice(1).toLowerCase(),
            });
        } else {
            todos[dept.toLowerCase()][member.toLowerCase()].push({
                sno: todos[dept.toLowerCase()][member.toLowerCase()][
                    todos[dept.toLowerCase()][member.toLowerCase()].length - 1
                ].sno,
                job: job.slice(0, 1).toUpperCase() + job.slice(1).toLowerCase(),
                desc:
                    desc.slice(0, 1).toUpperCase() +
                    desc.slice(1).toLowerCase(),
            });
        }
        newTodos(todos);
    };
    const removeTodo = (dept, member, todo) => {
        let newTodo = Object.assign({}, todos);

        newTodo[dept.toLowerCase()][member.toLowerCase()] = newTodo[
            dept.toLowerCase()
        ][member.toLowerCase()].filter((x) => x !== todo);
        newTodos(newTodo);
    };
    const updateTodos = (newTodoList, dept, member) => {
        let newTodo = Object.assign({}, todos);
        newTodo[dept.toLowerCase()][member.toLowerCase()] = newTodoList;
        newTodos(newTodo);
    };

    return (
        <div style={htmlStyle}>
            <Router>
                <Header logo={logo} />
                <div className="py-5 px-5 text-center">
                    <h2>TODOs List</h2>
                    <p className="pb-2">
                        Click on <strong>"Add Member"</strong> to start your
                        Todos list here and then you can{" "}
                        <i>
                            <u>Add</u>
                        </i>
                        {", "}
                        <i>
                            <u>Delete</u>
                        </i>
                        {", "}
                        and{" "}
                        <i>
                            <u>Update</u>
                        </i>
                        {", "}
                        your tasks.
                    </p>
                    <p className="mt-0">
                        <strong>
                            You can also set different Deparments and assign
                            your roles under each.
                        </strong>
                    </p>
                </div>
                <Routes>
                    <Route
                        exact
                        path="/"
                        element={
                            <DepartmentOption
                                departments={departments}
                                members={members}
                                todos={todos}
                                addDept={addDept}
                                addNewMember={addNewMember}
                                addTodo={addTodo}
                                removeDept={removeDept}
                                removeMemb={removeMemb}
                                removeTodo={removeTodo}
                                deptEdit={deptEdit}
                                membEdit={membEdit}
                                updateTodos={updateTodos}
                            />
                        }
                    ></Route>
                    <Route exact path="/about" element={<About />}></Route>
                </Routes>
                <Footer />
            </Router>
        </div>
    );
}

export default App;
