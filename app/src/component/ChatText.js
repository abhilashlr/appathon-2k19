import React from 'react';

export default function ChatText({transcriptedValue}) {
  return (
    <div className="chat-text" contentEditable suppressContentEditableWarning>{transcriptedValue}</div>
  )
}

