import { styled } from 'styled-components';
import GlobalStyles from './styles/GlobalStyles';
import Button from './ui/Button';
import { Input } from './ui/Input';
import Heading from './ui/Heading';

const StyledApp = styled.div`
  background-color: orangered;
  padding: 20px;
`;

function App() {
  return (
    <>
      <GlobalStyles />
      <StyledApp>
        <Heading as='h1'>Hello World</Heading>

        <Heading as='h2'>Check In/Out</Heading>

        <Button onClick={() => alert('Check in')}>Check in</Button>
        <Button onClick={() => alert('Check out')}>Check out</Button>
        <Heading as='h3'>Form</Heading>

        <Input type='number' placeholder='number of guests' />
      </StyledApp>
    </>
  );
}

export default App;
