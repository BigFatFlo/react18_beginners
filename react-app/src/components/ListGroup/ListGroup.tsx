import { MouseEvent, useState } from "react";
import styled from "styled-components";

const List = styled.ul`
  list-style: none;
  padding: 0;
  background-color: yellow;
`;

interface ListItemProps {
  active: boolean;
}

const ListItem = styled.li<ListItemProps>`
  padding: 5px 0;
  background: ${(props) => (props.active ? "blue" : "none")};
`;

interface Props {
  items: string[];
  heading: string;
  onSelectItem: (item: string) => void;
}

function ListGroup({ items, heading, onSelectItem }: Props) {
  // Using a state hook
  const [selectedIndex, setSelectedItem] = useState(0);

  //   const getMessage = () => {
  //     return items.length === 0 ? <p>No items found</p> : null;
  //   };

  return (
    // Empty brackets are compiled into a fragment
    <>
      <h1>{heading}</h1>
      {items.length === 0 && <p>No items found</p>}
      {/* We can replace the previous line with a function call*/}
      {/* {getMessage()} */}
      <List>
        {items.map((item, index) => (
          <ListItem
            active={index === selectedIndex}
            key={item}
            onClick={() => {
              setSelectedItem(index);
              onSelectItem(item);
            }}
          >
            {item}
          </ListItem>
        ))}
      </List>
    </>
  );
}

export default ListGroup;
