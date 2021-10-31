import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import { Button, TextField } from '@mui/material';

function App() {

  const [orientation, setOrientation] = useState<String>('');
  const [direction, setDirection] = useState<string[]>([]);
  const [rows, setRows] = useState(1);

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (parseInt(event.target.value) > 50) {
      event.target.value = "50"
    } else if (parseInt(event.target.value) < 0) {
      event.target.value = "0"
    }
  }

  const onSetDirection = (index: number, dir: string) => {
    const arr = [...direction];
    arr[index] = (direction[index] ? direction[index] : '') + dir
    setDirection(arr)
  }

  const onClick = (orientation: string) => {
    setOrientation(orientation)
  }

  return (
    <div className="App">
      <h1>Robots</h1>
      <h2>Bouding Rect</h2>
      <TextField
        type="number"
        InputProps={{
          inputProps: {
            max: 50, min: 0
          }
        }}
        label=""
        onChange={onChange}
      />&nbsp;&nbsp;
      <TextField
        type="number"
        InputProps={{
          inputProps: {
            max: 50, min: 0
          }
        }}
        label=""
        onChange={onChange}
      />
      <br /><br />
      <TextField
        type="number"
        InputProps={{
          inputProps: {
            max: 50, min: 0
          }
        }}
        label=""
        onChange={onChange}
      />&nbsp;&nbsp;
      <TextField
        type="number"
        InputProps={{
          inputProps: {
            max: 50, min: 0
          }
        }}
        label=""
        onChange={onChange}
      />
      <TextField
        type="text"
        value={orientation}
        disabled
      />
      <Button onClick={() => onClick("N")}>N</Button>
      <Button onClick={() => onClick("S")}>S</Button>
      <Button onClick={() => onClick("E")}>E</Button>
      <Button onClick={() => onClick("W")}>W</Button>
      <br /><br />

      {[...Array(rows)].map((item, index) => <>
        <TextField
          type="text"
          value={direction[index]}
          disabled
        />
        <Button onClick={(event) => onSetDirection(index, "L")} name={`LButton${index}`} disabled={direction.length >= 50}>L</Button>
        <Button onClick={(event) => onSetDirection(index, "S")} name={`RButton${index}`} disabled={direction.length >= 50}>S</Button>

        <br /><br /></>
      )}
      <Button onClick={() => setRows(rows + 1)} >Add Row</Button>
    </div>
  );
}

export default App;
