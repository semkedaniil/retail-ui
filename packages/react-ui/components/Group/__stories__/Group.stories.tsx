import React from 'react';
import { storiesOf } from '@storybook/react';
import UserIcon from '@skbkontur/react-icons/User';
import SearchIcon from '@skbkontur/react-icons/Search';
import DeleteIcon from '@skbkontur/react-icons/Delete';

import { BGRuler } from '../../../internal/BGRuler';
import { Group } from '../Group';
import { Input } from '../../Input';
import { Button } from '../../Button';
import { Toast } from '../../Toast';

storiesOf('Group', module)
  .add('Simple Group with Input and Button', () => (
    <Group width="300px">
      <Input placeholder="Search" width="100%" />
      <Button icon={<SearchIcon />} />
    </Group>
  ))
  .add('Simple Group with custom Inputs width', () => (
    <Group>
      <Input placeholder="Search" width="300px" />
      <Button icon={<SearchIcon />} />
      <Input placeholder="Search" width="100px" />
    </Group>
  ))
  .add('Group with Input and multiple Buttons', () => (
    <Group>
      <Button>Clear</Button>
      <Input placeholder="Search" width="100%" />
      <Button icon={<SearchIcon />} />
      <Button>Cancel</Button>
    </Group>
  ))
  .add('Button group', () => (
    <Group>
      <Button onClick={() => Toast.push('Раз')}>Раз</Button>
      <Button onClick={() => Toast.push('Два')}>Два</Button>
      <Button onClick={() => Toast.push('Три')}>Три</Button>
    </Group>
  ))
  .add('Complex elements', () => (
    <Group>
      <Button icon={<DeleteIcon />} onClick={() => Toast.push('Clear!')} width="10px" />
      <Input placeholder="Disabled" disabled rightIcon={<UserIcon />} width="100%" />
      <Button onClick={() => Toast.push('Push!')} error>
        Push
      </Button>
    </Group>
  ))
  .add('With width', () => (
    <div style={{ background: '#eee', padding: '30px 10px 10px', position: 'relative' }}>
      <BGRuler color="#888" left={10} right={9} />
      <Group width={240}>
        <Button>
          <DeleteIcon />
        </Button>
        <Input placeholder="240px" width="100%" />
      </Group>
      <br />
      <br />
      <Group>
        <Button>
          <DeleteIcon />
        </Button>
        <Input placeholder="no width" width="100%" />
      </Group>
    </div>
  ));
