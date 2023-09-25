// eslint-disable-next-line no-unused-vars
import React, { useState } from 'react';
import './CardList.module.css';

function CardList() {
  const [cards, setCards] = useState([]);
  const [newTaskTexts, setNewTaskTexts] = useState(Array(cards.length).fill(''));

  function createCard() {
    const newCard = {
      tasks: [],
      height: 180, // Initial height
      width: 350, // Initial width
    };
    setCards([...cards, newCard]);
    setNewTaskTexts([...newTaskTexts, '']);
  }

  function addTask(cardIndex) {
    if (newTaskTexts[cardIndex].trim() !== '') {
      const updatedCards = [...cards];
      updatedCards[cardIndex].tasks.push(newTaskTexts[cardIndex]);

      // Dynamically adjust the height based on the number of tasks
      updatedCards[cardIndex].height += 60;
      // const textLength = newTaskTexts[cardIndex].length;
      // updatedCards[cardIndex].width = Math.max(350, textLength * 5); // Adjust the width, but keep it at least 350px


      setCards(updatedCards);

      const updatedTaskTexts = [...newTaskTexts];
      updatedTaskTexts[cardIndex] = ''; // Clear the task input for the card
      setNewTaskTexts(updatedTaskTexts);
    }
  }

  function deleteTask(cardIndex, taskIndex) {
    const updatedCards = [...cards];
    updatedCards[cardIndex].tasks.splice(taskIndex, 1);

    // Dynamically adjust only the height when a task is deleted
    updatedCards[cardIndex].height -= 60;
    setCards(updatedCards);
  }

  function deleteCard(cardIndex) {
    const updatedCards = [...cards];
    updatedCards.splice(cardIndex, 1);
    setCards(updatedCards);

    const updatedTaskTexts = [...newTaskTexts];
    updatedTaskTexts.splice(cardIndex, 1); // Remove the corresponding task input
    setNewTaskTexts(updatedTaskTexts);
  }

  return (
    <div>
      <button onClick={createCard}>Add Card</button>
      <div className="card-list">
        {cards.map((card, cardIndex) => (
          <div
            key={cardIndex}
            className="card-container"
            style={{ height: card.height + 'px', width: card.width + 'px' }}
          >
            <div className="card">
              <div className="card-header">
                <h2>To-Do List</h2>
                <button className="delete-card" onClick={() => deleteCard(cardIndex)}>
                  Delete Card
                </button>
              </div>
              <div className="card-body">
                <div className="input-container">
                  <input
                    type="text"
                    placeholder="Add a new task"
                    value={newTaskTexts[cardIndex]}
                    onChange={(e) => {
                      const updatedTaskTexts = [...newTaskTexts];
                      updatedTaskTexts[cardIndex] = e.target.value;
                      setNewTaskTexts(updatedTaskTexts);
                    }}
                  />
                  <button
                    className="addTask"
                    onClick={() => addTask(cardIndex)}
                  >
                    Add
                  </button>
                </div>
                <ul>
                  {card.tasks.map((task, taskIndex) => (
                    <li key={taskIndex}>
                      <span>{task}</span>
                      <button className="delete-task" onClick={() => deleteTask(cardIndex, taskIndex)}>
                        Delete Task
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default CardList;
