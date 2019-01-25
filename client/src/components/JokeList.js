import React from 'react';
import { Card } from 'semantic-ui-react';

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
      <Card.Group
        style={{
          display: 'flex',
          alignItems: 'flex-start',
          justifyContent: 'center'
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
    );
  }
}
 
export default JokeList;