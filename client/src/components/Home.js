import React from 'react';
import { Segment, Header, Button } from 'semantic-ui-react';

const Home = ({ isLoggedIn, history }) => {
  return (
    <Segment textAlign="center">
    <Header as="h1" textAlign="center">
      Welcome to Auth-II
    </Header>
    {
      !isLoggedIn &&
      <>
        <Button
          color="black"
          content='Sign In'
          icon='sign-in'
          onClick={() => history.push('/signin')}
        />
        <Button
          color="black"
          content='Sign Up'
          icon='signup'
          onClick={() => history.push('/signup')}
        />
      </>
    }
    </Segment>
  );
}
 
export default Home;