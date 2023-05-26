import CodeMirror from '@uiw/react-codemirror';
import { graphql } from 'cm6-graphql';
import { useAppDispatch, useAppSelector } from '@/store/hooks/hooks';
import { setVariablesValue } from '@/store/reducers/redactorValue';
import List from '@mui/material/List';
import Collapse from '@mui/material/Collapse';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import { useState } from 'react';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import { FormattedMessage } from 'react-intl';

const Variables = () => {
  const { variablesValue } = useAppSelector((store) => store.redactorValue);
  const disp = useAppDispatch();

  const onChange = (value: string) => {
    disp(setVariablesValue(value));
  };

  const [open, setOpen] = useState(true);
  const [alignment, setAlignment] = useState('Variables');
  const [headersIsOpen, setHeadersIsOpen] = useState(false);

  const handleAlignmentChange = (event: React.MouseEvent<HTMLElement>, newAlignment: string) => {
    setAlignment(newAlignment);
    if (newAlignment === 'Headers') {
      setHeadersIsOpen(true);
    } else {
      setHeadersIsOpen(false);
    }
  };

  const handleClick = () => {
    setOpen(!open);
  };

  return (
    <List
      sx={{
        width: '100%',
        bgcolor: '#c87084',
        paddingBottom: '0px',
        paddingTop: '0px',
      }}
      component="nav"
      aria-labelledby="nested-list-subheader"
    >
      <List
        sx={{
          display: 'flex',
          paddingLeft: '10px',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <ToggleButtonGroup
          value={alignment}
          exclusive
          onChange={handleAlignmentChange}
          aria-label="Platform"
        >
          <ToggleButton value="Variables">
            <FormattedMessage id="VARIABLES" />
          </ToggleButton>
          <ToggleButton value="Headers">
            <FormattedMessage id="HEADERS" />
          </ToggleButton>
        </ToggleButtonGroup>
        {open ? <ExpandLess onClick={handleClick} /> : <ExpandMore onClick={handleClick} />}
      </List>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <CodeMirror
          value={!headersIsOpen ? variablesValue : ''}
          onChange={!headersIsOpen ? onChange : () => {}}
          extensions={[graphql()]}
          theme="dark"
          minHeight="15.35vh"
          maxHeight="15.35vh"
          width="100%"
        />
      </Collapse>
    </List>
  );
};

export default Variables;
