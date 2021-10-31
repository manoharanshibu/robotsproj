import React, { useState } from 'react';
import './App.css';
import LeftPane from './components/LeftPane'

export interface IState {
  robot: {
    orientation: String[]
    direction: String[]
    onClick: any
    onChange: any
    onSetDirection: any
  }
}


function App() {

  const [orientation, setOrientation] = useState<String[]>([]);
  const [direction, setDirection] = useState<String[]>([]);

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (parseInt(event.target.value) > 50) {
      event.target.value = "50"
    } else if (parseInt(event.target.value) < 0) {
      event.target.value = "0"
    }
  }

  const onSetDirection = (index: number, dir: string):void => {
    const arr = [...direction];
    arr[index] = (direction[index] ? direction[index] : '') + dir
    setDirection(arr)
  }

  const onClick = (index: number, orient: string) => {
    const arr = [...orientation];
    arr[index] = orient
    setOrientation(arr)
  }

  return (
    <div className="App">
      <h1>Robots</h1>
      <LeftPane onChange={onChange} orientation={orientation} direction={direction} onSetDirection={onSetDirection} onClick={onClick} />
    </div>
  );
}

export default App;
