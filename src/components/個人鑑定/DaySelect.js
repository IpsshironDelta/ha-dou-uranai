import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';

export default function BasicSelect(props) {

  return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">日を選択</InputLabel>
        <Select
          id       = {props.id}
          value    = {props.value}
          label    = {props.label}
          onChange = {props.onChange}>
            <MenuItem value={1}>1</MenuItem>
            <MenuItem value={2}>2</MenuItem>
            <MenuItem value={3}>3</MenuItem>
            <MenuItem value={4}>4</MenuItem>
            <MenuItem value={5}>5</MenuItem>
            <MenuItem value={6}>6</MenuItem>
            <MenuItem value={7}>7</MenuItem>
            <MenuItem value={8}>8</MenuItem>
            <MenuItem value={9}>9</MenuItem>
            <MenuItem value={10}>10</MenuItem>
            <MenuItem value={11}>11</MenuItem>
            <MenuItem value={12}>12</MenuItem>
            <MenuItem value={13}>13</MenuItem>
            <MenuItem value={14}>14</MenuItem>
            <MenuItem value={15}>15</MenuItem>
            <MenuItem value={16}>16</MenuItem>
            <MenuItem value={17}>17</MenuItem>
            <MenuItem value={18}>18</MenuItem>
            <MenuItem value={19}>19</MenuItem>
            <MenuItem value={20}>20</MenuItem>
            <MenuItem value={21}>21</MenuItem>
            <MenuItem value={22}>22</MenuItem>
            <MenuItem value={23}>23</MenuItem>
            <MenuItem value={24}>24</MenuItem>
            <MenuItem value={25}>25</MenuItem>
            <MenuItem value={26}>26</MenuItem>
            <MenuItem value={27}>27</MenuItem>
            <MenuItem value={28}>28</MenuItem>
            <MenuItem value={29}>29</MenuItem>
            <MenuItem value={30}>30</MenuItem>
            <MenuItem value={31}>31</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
}
