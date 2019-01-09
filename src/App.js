import React, { Component } from 'react';
import './App.css';




const list = [
  {
    title: 'React',
    url: 'https//facebook.github.io/react/',
    author: 'Jordan Walke',
    num_comments: 3,
    points: 4,
    objectID: 0,
  },
  {
    title: 'Redux',
    url: 'http://www.bidiiyetu.org/',
    author: 'Dan Abrahamov, Andrew clark',
    num_comments: 2,
    points: 5,
    objectID: 1,
  },
  {
    title: 'Profile',
    url: 'http://www.bidiiyetu.org/',
    author: 'Kamya Domnick',
    num_comments: 2,
    points: 5,
    objectID: 3,
  },
];


const isSearched = searchTerm => item =>
  item.title.toLowerCase().includes(searchTerm.toLowerCase());

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      list,
      searchTerm: '',
    };
    this.onSearchChange = this.onSearchChange.bind(this);
    this.onDismiss = this.onDismiss.bind(this);
  }
  onSearchChange(event) {
    this.setState({ searchTerm: event.target.value });
  }

  onDismiss(id) {
    const isNotId = item => item.objectID !== id;
    const updatedList = this.state.list.filter(isNotId);
    this.setState({ list: updatedList });
  }
  render() {
    const { searchTerm } = this.state;
    return (

      <div className="page">
        <div className="interactions"></div>
        <Clock />
        <Search
          value={searchTerm}
          onChange={this.onSearchChange}
        >
          Search:
        </Search>
        <Table
          list={this.state.list}
          pattern={searchTerm}
          onDismiss={this.onDismiss}
        />

      </div>
    );
  }
}

const Search = ({ value, onChange, children }) =>
  <form>
    {children}
    <input type="text"
      value={value}
      onChange={onChange}
    />
  </form>





const Table = ({ list, pattern, onDismiss }) =>

  <div className="table">
    {list.filter(isSearched(pattern)).map(item =>
      <div key={item.objectID} class="table-row">

        <span className="smallColumn">
          <a href={item.url}>{item.title}</a>
        </span><br />
        <span className="smallColumn">Auther:{item.author}</span><br />
        <span className="smallColumn">Comments:{item.num_comments}</span><br />
        <span className="smallColumn">Points:{item.points}</span>
        <span className="smallColumn"><br />

          <Button
            onClick={() => onDismiss(item.objectID)}
            class="button-inline">
            Dismiss
              </Button>


        </span>
      </div>)}
  </div>



class Clock extends Component {
  constructor(props) {
    super(props);
    this.state = { date: new Date() }
  }

  componentDidMount() {
    this.timerID = setInterval(
      () => this.tick(),
      1000
    );

  }
  componentWillUnmount() {
    clearInterval(this.timerID);

  }
  tick() {
    this.setState({
      date: new Date()
    });
  }
  render() {
    return (
      <div>
        <h2>Hello World!</h2>
        <h2>It is {this.state.date.toLocaleTimeString()}.</h2>
      </div>

    );
  }
}

const Button = ({ onClick, className = '', children, }) =>
  <button onClick={onClick}
    className={className}
    type="button">{children}</button>



export {
  Clock
}

export default App;
