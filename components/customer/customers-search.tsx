import SearchIcon from '@mui/icons-material/Search';
import { Card, InputAdornment, OutlinedInput, SvgIcon } from '@mui/material';

export const CustomersSearch = () => (
  <Card sx={{ p: 2 }}>
    <OutlinedInput
      defaultValue=""
      fullWidth
      placeholder="Search customer"
      startAdornment={(
        <InputAdornment position="start">
          <SvgIcon
            color="action"
            fontSize="small"
          >
            <SearchIcon/>
          </SvgIcon>
        </InputAdornment>
      )}
      sx={{ maxWidth: 500 }}
    />
  </Card>
);
