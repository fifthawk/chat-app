import React, { useEffect, useState } from "react";
import { ListGroup } from "react-bootstrap";
import { useConversations } from "../context/ConversationsProvider";
import axios from "axios";
import { invertColor } from "../components/Helpers";

export default function Coversations() {
  const [newColors, setNewColors] = useState();
  const { conversations, selectConversationIndex } = useConversations();
  const url = "https://x-colors.herokuapp.com/api/random?number=10";
  let colorsUndefined;

  async function fetchColors() {
    await axios
      .get(url)
      .then((res) => {
        setNewColors(res.data);
      })
      .catch((error) => console.log(error));
  }

  useEffect(() => {
    fetchColors();
  }, []);

  if (newColors) {
    colorsUndefined = {
      background: newColors[0].hsl,
      color: invertColor(newColors[0].hex),
      marginBottom: ".25em",
      marginTop: ".25em",
      borderRadius: "3em",
    };
  }

  return (
    <ListGroup variant="flush">
      {conversations.map((conversation, index) => (
        <ListGroup.Item
          style={colorsUndefined}
          key={index}
          action
          onClick={() => selectConversationIndex(index)}
          active={conversation.selected}
        >
          {conversation.recipients
            .map((recipient) => recipient.name)
            .join(", ")}
        </ListGroup.Item>
      ))}
      <button style={colorsUndefined} onClick={fetchColors}>
        NEW COLORS PLZ
      </button>
    </ListGroup>
  );
}
