import React from 'react';
import { Link } from '@mui/material';

interface ILinkNextPage {
  current: string;
  next: string;
  nextPage: (
    e: React.MouseEvent<HTMLAnchorElement, MouseEvent>,
    current: string,
    el: string
  ) => void;
}

function LinkNextPage({ current, next, nextPage }: ILinkNextPage) {
  return (
    <Link
      href="#"
      underline="none"
      onClick={(e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => nextPage(e, current, next)}
    >
      {next}
    </Link>
  );
}

export default LinkNextPage;
