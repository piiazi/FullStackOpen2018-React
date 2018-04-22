import React from 'react'
import ReactDOM from 'react-dom'

import Button from './components/Button/Button';
import classes from './index.css';

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      selected: 0,
      votes: [],
      winnerVote: '',
      winnerVoteCount: 0
    }
  }

  componentWillMount() {
    const copyVotes = [ ...this.state.votes ];

    for(let i=0; i<this.props.anecdotes.length; i++) {
        copyVotes[i] = 0;
    }

    this.setState({ votes: copyVotes });

  }

  clickHandler = () => {
    let randomAnecdoteIndex = Math.floor((Math.random() * (anecdotes.length - 1)) + 1);
    this.setState({ selected: randomAnecdoteIndex });
  }

  voteHandler = () => {
    const voteCopy = [ ...this.state.votes ];
    const selected = this.state.selected;
    voteCopy[selected] += 1;
    this.setState({ votes: voteCopy });

    let possibleWinner = 0;
    let winner = 0;
    let winnerIndex = 0;
    let winnerFound = false;

    voteCopy.forEach( (item, index) => {
      possibleWinner = item;

      if( possibleWinner > winner ) {
        winnerFound = true;
        winner = possibleWinner;
        winnerIndex = index;
      }
    });

    if( winnerFound ) {
      this.setState({ winnerVote: this.props.anecdotes[winnerIndex], winnerVoteCount: winner });
    }

  }

  render() {
    return (
      <div>
        <p> Anecdote: </p>
        {this.props.anecdotes[this.state.selected]}
        <p>This anecdote has
          { this.state.votes[this.state.selected] ?
            <span className="NumberOfVotes"> { this.state.votes[this.state.selected] } </span>
            : <span className="NumberOfVotes">0</span>
          }
          votes
        </p>
        <p>
            <Button buttonText="Vote" buttonClick={ () => this.voteHandler() } />
            <Button buttonText="Show next anecdote" buttonClick={ () => this.clickHandler() } />
        </p>
        <p className="AnecdoteMostVotesTitle"> Anecdote with most votes: </p>
        { this.state.winnerVote }
        <p> has { this.state.winnerVoteCount } votes </p>
      </div>
    )
  }
}

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

ReactDOM.render(
  <App anecdotes={anecdotes} />,
  document.getElementById('root')
)
