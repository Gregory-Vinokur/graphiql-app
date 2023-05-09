import { useRouter } from 'next/router';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { LOCALES } from '@/lang/locales';
import { FormattedMessage } from 'react-intl';
import { Typography } from '@mui/material';

export default function SelectLanguage() {
  const languages = [
    { name: 'English', code: LOCALES.ENGLISH },
    { name: 'Русский', code: LOCALES.RUSSIAN },
  ];
  const router = useRouter();
  const { pathname, asPath, query, locale } = router;
  const handleChange = (event: SelectChangeEvent) => {
    router.push({ pathname, query }, asPath, { locale: event.target.value });
  };

  return (
    <FormControl size="small" sx={{ mr: 2 }}>
      <InputLabel sx={{ color: 'lightgray' }} id="Language-select-label">
        <Typography variant="body2">
          <FormattedMessage id="LANGUAGE" />
        </Typography>
      </InputLabel>
      <Select
        sx={{ color: 'white' }}
        labelId="Language-select-label"
        id="simple-select"
        value={locale}
        label={<FormattedMessage id="LANGUAGE" />}
        onChange={handleChange}
      >
        {languages.map((item, index) => (
          <MenuItem key={index} value={item.code}>
            {item.name}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}
