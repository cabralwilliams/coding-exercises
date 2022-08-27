import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './utils/store';
import Header from './components/Header';
import Home from './pages/Home';
import Shuffle from './pages/Shuffle';
import Reset from './pages/Reset';
import Draft from './pages/Draft';

function App() {
    return (
        <div className="App">
            
                <Header />
                <Router>
                    <Provider store={store}>
                        <Routes>
                            <Route path='/' element={<Home />} />
                            <Route path='/shuffle' element={<Shuffle />} />
                            <Route path='/reset' element={<Reset />} />
                            <Route path='/draft' element={<Draft />} />
                        </Routes>
                    </Provider>
                </Router>
        </div>
    );
}

export default App;
