import React from 'react';
import { Segment, Header, Card } from 'semantic-ui-react';

class JokeList extends React.Component {
  componentDidMount() {
    const token = localStorage.getItem('auth');

    if (!token) {
      this.props.history.push('/signin');
    }
  }

  componentWillReceiveProps(props) {
    if (!props.isLoggedIn) {
      this.props.history.push('/signin');
    }
  }

  render() {
    const { jokes } = this.props;
    return (
    <Segment textAlign="center">
      <Header as="h1" textAlign="center">
        Welcome to Dad Jokes
      </Header>
      <Card.Group
        style={{
          display: 'flex',
          alignItems: 'flex-start',
            justifyContent: 'center',
            marginTop: '30px',
        }}
      >
        {
          jokes && jokes.map(joke => (
            <Card key={joke.id}>
              <Card.Content>
                <Card.Header>{joke.joke}</Card.Header>
              </Card.Content>
            </Card>
          ))
        }
      </Card.Group>
    </Segment>
    );
  }
}
 
export default JokeList;