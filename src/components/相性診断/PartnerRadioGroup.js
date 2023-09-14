import * as React from 'react';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';

export default function ControlledRadioButtonsGroup(props) {

  return (
    <FormControl>
      <FormLabel id="demo-controlled-radio-buttons-group">性別</FormLabel>
      <RadioGroup
        id        = {props.id}
        value     = {props.value}
        onChange  = {props.onChange}>
          <FormControlLabel value="男" control={<Radio />} label="男" />
          <FormControlLabel value="女" control={<Radio />} label="女" />
      </RadioGroup>
    </FormControl>
  );
}
