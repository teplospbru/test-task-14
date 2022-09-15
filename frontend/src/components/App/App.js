import './App.scss';
import { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Main from '../Main/Main';
import Layout from '../Layout/Layout';

function App() {
  const [ data, setData ] = useState();

  useEffect(() => {
    fetch('http://localhost:3001/api/rows')
        .then(response => response.json())
        .then(response => setData(response))
  }, []);
  
  return (
    <Router>
        <Routes>
            <Route path='/' element={ <Layout /> }>
              <Route path='/' element={ <Main data={ data } /> } />
            </Route>
        </Routes>
    </Router>
  );
}

export default App;