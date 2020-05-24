import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import NativeSelect from '@material-ui/core/NativeSelect';

// css
import "../../assets/sass/components/search/_searchWithChoice.scss"

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

export default function NativeSelects() {
  const classes = useStyles();
  const [state, setState] = React.useState({
    type: '',
    name: 'hai',
  });

  const handleChange = (event) => {
    const name = event.target.name;
    setState({
      ...state,
      [name]: event.target.value,
    });
  };

  return (
    <div>
      <FormControl variant="outlined" className={`${classes.formControl} test`}>
        <InputLabel htmlFor="outlined-age-native-simple">Type</InputLabel>
        <Select
          native
          value={state.type}
          onChange={handleChange}
          label="Type"
          inputProps={{
            name: 'type',
            id: 'outlined-age-native-simple',
          }}
        >
          <option aria-label="None" value="" />
          <option value={10} className="Choice">backpack</option>
          <option value={20} className="Choice">hôtel</option>
          <option value={30} className="Choice">séjour</option>
        </Select>
      </FormControl>
    </div>
     );
    }