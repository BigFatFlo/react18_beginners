import { useEffect, useRef, useState } from "react";
import Alert from "./components/Alert";
import Button from "./components/Button/Button";
import ListGroup from "./components/ListGroup";
import { BsFillCalendarFill } from "react-icons/bs";
import Like from "./components/Like";
import produce from "immer";
import ExpandableText from "./components/ExpandableText";
import Form from "./components/Form";
import ExpenseList from "./expense-tracker/components/ExpenseList";
import ExpenseFilter from "./expense-tracker/components/ExpenseFilter";
import ExpenseForm from "./expense-tracker/components/ExpenseForm";
import categories from "./expense-tracker/categories";
import ProductList from "./components/ProductList";
import { CanceledError } from "./services/api-client";
import userService, { User } from "./services/user-service";
import useUsers from "./hooks/useUsers";

const connect = () => console.log("Connecting");
const disconnect = () => console.log("Disonnecting");

function App() {
  const [selectedCategory, setSelectedCategory] = useState("");
  const [category, setCategory] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  // After render, always call at the top of the component
  useEffect(() => {
    if (inputRef.current) inputRef.current.focus();
    connect();
    // Clean up code
    return () => {
      disconnect();
    };
  }, []);

  useEffect(() => {
    document.title = "My App";
  });

  const { users, error, isLoading, setUsers, setError } = useUsers();

  const [expenses, setExpenses] = useState([
    { id: 1, description: "aaa", amount: 10, category: "Utilities" },
    { id: 2, description: "bbb", amount: 10, category: "Utilities" },
    { id: 3, description: "ccc", amount: 10, category: "Utilities" },
    { id: 4, description: "ddd", amount: 10, category: "Utilities" },
  ]);

  const [bugs, setBugs] = useState([
    { id: 1, title: "Bug 1", fixed: false },
    { id: 2, title: "Bug 2", fixed: false },
  ]);

  let items = ["New York", "San Francisco", "Tokyo", "London", "Paris"];
  const [alertVisible, setAlertVisibility] = useState(false);

  const handleSelectItem = (item: string) => {
    console.log(item);
  };

  const handleButtonClick = () => {
    setAlertVisibility(true);
    // Updating object in state array:
    // Using map:
    // setBugs(bugs.map((bug) => (bug.id === 1 ? { ...bug, fixed: true } : bug)));
    // Using Immer:
    setBugs(
      produce((draft) => {
        const bug = draft.find((bug) => bug.id === 1);
        if (bug) bug.fixed = true;
      })
    );
  };

  const visibleExpenses = selectedCategory
    ? expenses.filter((e) => e.category === selectedCategory)
    : expenses;

  const deleteUser = (user: User) => {
    const originalUsers = [...users];
    setUsers(users.filter((u) => u.id !== user.id));
    userService.delete(user.id).catch((err) => {
      setError(err.message);
      setUsers(originalUsers);
    });
  };

  const addUser = () => {
    const originalUsers = [...users];
    const newUser = { id: 0, name: "John" };
    setUsers([newUser, ...users]);

    userService
      .add(newUser)
      // data is aliased to savedUser
      .then(({ data: savedUser }) => setUsers([savedUser, ...users]))
      .catch((err) => {
        setError(err.message);
        setUsers(originalUsers);
      });
  };

  const updateUser = (user: User) => {
    const originalUsers = [...users];
    const updatedUser = { ...user, name: user.name + "!" };
    setUsers(users.map((u) => (u.id === user.id ? updatedUser : u)));

    userService.patch(updatedUser).catch((err) => {
      setError(err.message);
      setUsers(originalUsers);
    });
  };

  return (
    <>
      {/* <div>
        <ListGroup
          items={items}
          heading="Cities"
          onSelectItem={handleSelectItem}
        />
        {alertVisible && (
          <Alert onClose={() => setAlertVisibility(false)}>
            Hello <span>World</span>
          </Alert>
        )}
        <Button onClick={handleButtonClick} color="danger">
          Click me!
        </Button>
        <BsFillCalendarFill color="blue" size={40} />
      </div>
      <div>
        <Like onClick={() => console.log("Clicked")} />
      </div>
      <div>
        {bugs.map((bug) => (
          <p key={bug.id}>
            {bug.title} {bug.fixed ? "Fixed" : "New"}
          </p>
        ))}
      </div>
      <ExpandableText maxChars={10}>
        Here is a very long text that should be shortened for visibility
      </ExpandableText>
      <Form />
      <div className="mb-5">
        <ExpenseForm
          onSubmit={(expense) =>
            setExpenses([...expenses, { ...expense, id: expenses.length + 1 }])
          }
        ></ExpenseForm>
      </div>
      <div className="mb-3">
        <ExpenseFilter
          onSelectCategory={(category) => setSelectedCategory(category)}
        ></ExpenseFilter>
      </div>
      <ExpenseList
        expenses={visibleExpenses}
        onDelete={(id) => setExpenses(expenses.filter((e) => e.id !== id))}
      />
      <div>
        <input ref={inputRef} type="text" className="form-control" />
      </div>
      <div>
        <select
          className="form-select"
          onChange={(event) => setCategory(event.target.value)}
        >
          <option value=""></option>
          <option value="Clothing">Clothing</option>
          <option value="Household">Household</option>
        </select>
        <ProductList category={category} />
      </div> */}
      <div>
        {error && <p className="text-danger">{error}</p>}
        {isLoading && <div className="spinner-border"></div>}
        <button className="btn-primary mb-3" onClick={addUser}>
          Add
        </button>
        <ul className="list-group">
          {users.map((user) => (
            <li
              key={user.id}
              className="list-group-item d-flex justify-content-between"
            >
              {user.name}
              <div>
                <button
                  className="btn btn-outline-secondary mx-1"
                  onClick={() => updateUser(user)}
                >
                  Update
                </button>
                <button
                  className="btn btn-outline-danger"
                  onClick={() => deleteUser(user)}
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}

export default App;
