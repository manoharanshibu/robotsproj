import { Button } from '@mui/material';
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
  },
  boundary: {
    x: Number
    y: Number
  }
}

const App = () => {
  const [coordinates, setCoordinates] = useState<any[]>([]);
  const [orientation, setOrientation] = useState<String[]>([]);
  const [direction, setDirection] = useState<String[]>([]);
  const [boundaryPt, setBoundaryPt] = useState({
    x: 0,
    y: 0
  });
  const [output, setOutput] = useState<String>('');
  let robot: any = {};
  let scent: any = [];

  const instructRobot = (instruction: string, robot: any, bound_x: number, bound_y: number) => {
    let lost = false;
    switch (instruction) {
      case 'F':
        const result = forwardMove(robot, bound_x, bound_y);
        lost = result.lost;
        robot = result.robot;
        break;
      case 'L':
        robot.orientation = (robot.orientation + 90) % 360;
        break;
      case 'R':
        robot.orientation = (((robot.orientation - 90) % 360) + 360) % 360;
        break;
    }
    return { robot: robot, lost: lost };
  }
  const forwardMove = (robot: any, bound_x: number, bound_y: number) => {
    let previous = Object.assign({}, robot);
    switch (robot.orientation) {
      case 90:
        robot.y++;
        break;
      case 270:
        robot.y--;
        break;
      case 180:
        robot.x--;
        break;
      case 0: 
        robot.x++;
        break;
    }
    let lost = false;
    if (robot.x > bound_x || robot.y > bound_y || robot.x < 0 || robot.y < 0) {
      robot = previous;
      lost = !scent[robot.x - 1][robot.y - 1];
      scent[robot.x - 1][robot.y - 1] = true;
    }
    return { robot: robot, lost: lost };
  }
  const getOrientationByDirection = (direction: string) => {
    switch (direction) {
      case 'N':
        return 90;
      case 'S':
        return 270;
      case 'W':
        return 180;
      case 'E':
        return 0;
    }
  }
  const getOrientationByVal = (orientation: number) => {
    switch (orientation) {
      case 0:
        return 'E';
      case 90:
        return 'N';
      case 180:
        return 'W';
      case 270:
        return 'S';
    }
  }
  const resetAll = function () {
    robot = {};
    scent = [];
    setOutput('');
    scent = Array(boundaryPt.x + 1).fill([]).map(() => Array(boundaryPt.y + 1).fill(false));
  }

  const execute = (coordinates: any, direction: any, commands: any, robot: any): void => {
    robot.x = parseInt(coordinates.point1);
    robot.y = parseInt(coordinates.point2);

    robot.orientation = getOrientationByDirection(direction);

    let result: any;
    for (let i = 0; i < commands.length; i++) {
      result = instructRobot(commands[i], robot, boundaryPt.x, boundaryPt.y);
      robot = result.robot;
      if (result.lost) {
        break;
      }
    }
    if (result.lost) {
      setOutput(prevState => prevState + `${result.robot.x} ${result.robot.y}  ${getOrientationByVal(result.robot.orientation)} LOST-`)
    } else {
      setOutput(prevState => prevState + `${result.robot.x} ${result.robot.y}  ${getOrientationByVal(result.robot.orientation)} -`);
    }
  }

  const onChange = (event: React.ChangeEvent<HTMLInputElement>, boundary_rect: string, index?: any) => {
    if (parseInt(event.target.value) > 50) {
      event.target.value = "50";
    } else if (parseInt(event.target.value) < 0) {
      event.target.value = "0";
    }
    if (boundary_rect === 'boundary_x') {
      setBoundaryPt({
        x: parseInt(event.target.value),
        y: boundaryPt.y
      })
    } else if (boundary_rect === 'boundary_y') {
      setBoundaryPt({
        x: boundaryPt.x,
        y: parseInt(event.target.value)
      })
    } else if (index >= 0) {
      const arr = [...coordinates];
      if (!arr[index]) {
        arr[index] = { point1: null, point2: null }
      }
      const point = { point1: event.target.name === "point1" ? event.target.value : arr[index].point1, point2: event.target.name === "point2" ? event.target.value : arr[index].point2 }
      arr[index] = point
      setCoordinates(arr)
    }
  }

  const onSetDirection = (index: number, dir: string): void => {
    const arr = [...direction];
    arr[index] = (direction[index] ? direction[index] : '') + dir
    setDirection(arr)
  }

  const onClick = (index: number, orient: string) => {
    const arr = [...orientation];
    arr[index] = orient
    setOrientation(arr)
  }

  const onSubmit = () => {
    resetAll();
    direction.forEach((item, index) => {
      execute(coordinates[index], orientation[index], direction[index].split('-'), robot);
    })
  }

  return (
    <div className="App">
      <h1>Robot Movement</h1>
      <div className="container">
        <LeftPane onChange={onChange} orientation={orientation} direction={direction} onSetDirection={onSetDirection} onClick={onClick} />
        <div className="right-pane">
          {
            output.split('-').map((item) => <div className="output">{item}</div>)
          }
        </div>
      </div>
      <Button onClick={() => onSubmit()}>Submit</Button>
    </div>
  );
}

export default App;
