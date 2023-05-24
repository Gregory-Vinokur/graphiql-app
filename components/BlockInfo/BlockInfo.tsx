import { Typography } from '@mui/material';
import { css } from '@emotion/react';

type BlockInfoProps = {
  children: React.ReactNode;
  title: string;
};

const textBackgroundStyle = css`
  display: flex;
  flex-direction: row;
  padding: 20px;
  @media (max-width: 600px) {
    flex-direction: column-reverse;
    width: 140vw;
    padding: 64px;
  }
`;

const textFieldStyle = css`
  position: relative;
  width: 110%;
  padding: 20px;
  background: rgba(255, 255, 255, 0.9);
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.2);
  border-radius: 60px;
  justify-content: center;
  display: flex;
  align-items: center;
`;

const titleFieldStyle = css`
  position: relative;
  width: 30%;
  transform: rotate(-10deg);
  transform-origin: top left;
  padding: 10px;
  background: rgba(0, 0, 0, 0.8);
  color: white;
  text-align: center;
  border-radius: 80px;
  justify-content: center;
  display: flex;
  align-items: center;
  word-wrap: break-word;

  @media (max-width: 600px) {
    width: auto;
    white-space: nowrap;
    height: 30%;

    & > * {
      display: block;
    }
  }
`;

const BlockInfo = ({ children, title }: BlockInfoProps) => {
  return (
    <div css={textBackgroundStyle}>
      <div css={textFieldStyle}>
        <Typography variant="body1" component="p" sx={{ fontSize: '1.23rem' }}>
          {children}
        </Typography>
      </div>
      <div css={titleFieldStyle}>
        <Typography
          variant="h3"
          component="h3"
          sx={{ fontWeight: 'bold', fontSize: { xs: '2.3rem', sm: '2.7rem' } }}
        >
          {title}
        </Typography>
      </div>
    </div>
  );
};

export default BlockInfo;
