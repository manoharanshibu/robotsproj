import React, { useState } from 'react';
import { Button, TextField } from '@mui/material';
import { IState as Props } from '../App';

interface IProps {
    robot: Props['robot']
}

const LeftPane: React.FC<IProps['robot']> = ({ onChange, orientation, onClick, direction, onSetDirection }) => {
    const [rows, setRows] = useState(1);

    return (
        <div className="left-pane">
            <div className="inline-text">
                <h2>Boundary Limit</h2>
                &nbsp; &nbsp;&nbsp; &nbsp;
                <TextField
                    type="number"
                    InputProps={{
                        inputProps: {
                            max: 50, min: 0
                        }
                    }}
                    label=""
                    onChange={(event) => onChange(event, 'boundary_x')}
                />&nbsp; &nbsp;
                <TextField
                    type="number"
                    InputProps={{
                        inputProps: {
                            max: 50, min: 0
                        }
                    }}
                    label=""
                    onChange={(event) => onChange(event, 'boundary_y')}
                /></div>

            <div></div>
            {
                [...Array(rows)].map((item, index) => <div><div>
                    <h2>Orientation</h2>
                    <TextField
                        type="number"
                        InputProps={{
                            inputProps: {
                                max: 50, min: 0
                            }
                        }}
                        label=""
                        name="point1"
                        onChange={(event) => onChange(event, null, index)}
                    /> &nbsp; &nbsp;
                    <TextField
                        type="number"
                        InputProps={{
                            inputProps: {
                                max: 50, min: 0
                            }
                        }}
                        name="point2"
                        label=""
                        onChange={(event) => onChange(event, null, index)}
                    />&nbsp; &nbsp;
                    <TextField
                        type="text"
                        value={orientation[index]}
                        disabled
                        style={{ width: 50 }}
                    />
                    <Button onClick={() => onClick(index, "N")}>N</Button>
                    <Button onClick={() => onClick(index, "S")}>S</Button>
                    <Button onClick={() => onClick(index, "E")}>E</Button>
                    <Button onClick={() => onClick(index, "W")}>W</Button>
                    <br /><br />
                    <h2>Direction</h2>
                    <TextField
                        type="text"
                        value={direction[index]}
                    />
                    <Button onClick={() => onSetDirection(index, "L")} name={`LButton${index}`} disabled={direction.length >= 50}>L</Button>
                    <Button onClick={() => onSetDirection(index, "F")} name={`FButton${index}`} disabled={direction.length >= 50}>F</Button>
                    <Button onClick={() => onSetDirection(index, "R")} name={`RButton${index}`} disabled={direction.length >= 50}>R</Button>
                    <br /><br />
                </div></div>
                )
            }
            <br /><br />
            <Button onClick={() => setRows(rows + 1)} >Add Row</Button>
        </div>)

}
export default LeftPane;