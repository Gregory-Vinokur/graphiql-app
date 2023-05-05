import { useRouter } from 'next/router';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { LOCALES } from '@/lang/locales';
import { FormattedMessage } from 'react-intl';

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
    <FormControl sx={{ m: 1, minWidth: 120 }}>
      <InputLabel id="Language-select-label">
        <FormattedMessage id="LANGUAGE" />
      </InputLabel>
      <Select
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
