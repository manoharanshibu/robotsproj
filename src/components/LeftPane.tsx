import React, { useState } from 'react';
import { Button, TextField } from '@mui/material';
import { IState as Props } from '../App';

interface IProps {
    robot: Props['robot']
}

const LeftPane: React.FC<IProps['robot']> = ({ onChange, orientation, onClick, direction, onSetDirection }) => {
    const [rows, setRows] = useState(1);

    return (
        <div>
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
            /> &nbsp; &nbsp;
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

            {
                [...Array(rows)].map((item, index) => <>
                    <TextField
                        type="number"
                        InputProps={{
                            inputProps: {
                                max: 50, min: 0
                            }
                        }}
                        label=""
                        onChange={onChange}
                    /> &nbsp; &nbsp;
                    <TextField
                        type="number"
                        InputProps={{
                            inputProps: {
                                max: 50, min: 0
                            }
                        }}
                        label=""
                        onChange={onChange}
                    />&nbsp; &nbsp;
                    <TextField
                        type="text"
                        value={orientation[index]}
                        disabled
                    />
                    <Button onClick={() => onClick(index, "N")}>N</Button>
                    <Button onClick={() => onClick(index, "S")}>S</Button>
                    <Button onClick={() => onClick(index, "E")}>E</Button>
                    <Button onClick={() => onClick(index, "W")}>W</Button>
                    <br /><br />
                    <TextField
                        type="text"
                        value={direction[index]}
                        disabled
                    />
                    <Button onClick={() => onSetDirection(index, "L")} name={`LButton${index}`} disabled={direction.length >= 50}>L</Button>
                    <Button onClick={() => onSetDirection(index, "S")} name={`RButton${index}`} disabled={direction.length >= 50}>S</Button>
                    <br /><br />
                </>
                )
            }
            <br /><br />
            <Button onClick={() => setRows(rows + 1)} >Add Row</Button>
        </div>)

}

export default LeftPane;