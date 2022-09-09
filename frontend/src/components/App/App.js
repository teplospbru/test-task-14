import './App.scss';
import { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Main from '../Main/Main';

function App() {
  const [ data, setData ] = useState();

  useEffect(() => {
    fetch('http://localhost:3001/api/rows')
      .then(response => response.json())
      .then(response => setData(response))
  }, []);
console.log(data)
  
  return (
    <Router>
      <div className="App">
        <div className='header'>
          <h1>Таблица</h1>
        </div>
        <Routes>
          <Route path='/' element={ <Main data={ data } /> } />
        </Routes>
      </div>
    </Router>
  );
}

export default App;