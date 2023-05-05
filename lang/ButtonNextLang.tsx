import { useRouter } from 'next/router';
import { useMemo } from 'react';
import Button from '@mui/material/Button';
import { LOCALES } from '@/lang/locales';

export default function ButtonNextLang() {
  const router = useRouter();
  const { pathname, asPath, query, locale } = router;
  const language = useMemo(() => {
    if (locale === LOCALES.ENGLISH) {
      return LOCALES.RUSSIAN;
    } else {
      return LOCALES.ENGLISH;
    }
  }, [locale]);

  const nextLang = () => {
    router.push({ pathname, query }, asPath, { locale: language });
  };

  return (
    <Button variant="contained" onClick={nextLang}>
      {language}
    </Button>
  );
}
