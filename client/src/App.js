import logo from './logo.svg';
import './App.css';

function App() {
  const getItems = () => {
    fetch("http://localhost:5169/todoitems")
      .then((response) => { 
        return response.json();
      })
      .then((data) => console.log(data))
      .catch((error) => console.log(error));
  };
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
        <button type="button" onClick={getItems}>Click me!</button>
      </header>
    </div>
  );
}

export default App;
