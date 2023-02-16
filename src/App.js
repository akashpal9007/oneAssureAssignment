import './App.css';
import Navbar from './Components/Navbar/Navbar';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import List from './Components/List/List';
import Favourites from './Components/Favourites/Favourites';
import Search from './Components/Search/Search';

function App() {
  return (
    <>
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path='/' element={<List />} />
        <Route path='/favourites' element={<Favourites />} />
        <Route path='/search' element={<Search />} />
      </Routes>
    </BrowserRouter>
    </>
  );
}

export default App;
