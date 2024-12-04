import { useState } from "react";
import Alert from "./components/Alert";
import Button from "./components/Button/Button";
import ListGroup from "./components/ListGroup";
import { BsFillCalendarFill } from "react-icons/bs";
import Like from "./components/Like";
import produce from "immer";
import ExpandableText from "./components/ExpandableText";
import Form from "./components/Form";

function App() {
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

  return (
    <>
      <div>
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
    </>
  );
}

export default App;
