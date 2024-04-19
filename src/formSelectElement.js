import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import FormControl from '@mui/material/FormControl';
import { InputLabel } from '@mui/material';

export default function FormSelectElement({ name, list, value, setter }) {

    return <FormControl fullWidth>
        <InputLabel id={`select-${name.toLowerCase()}-label`}>{name.replaceAll('_',' ',)}</InputLabel>
        <Select
            labelId={`select-${name.toLowerCase()}-label`}
            id={`select-${name.toLowerCase()}`}
            value={value[name.toLowerCase()]}
            label={name}
            onChange={(event) => setter({ ...value, [name.toLowerCase()]: event.target.value })}
            sx={{width:230}}
        >
            {
                list.map(x =>
                    <MenuItem key={x} value={x}>
                        {x}
                    </MenuItem>
                )
            }
        </Select>
    </FormControl>
}