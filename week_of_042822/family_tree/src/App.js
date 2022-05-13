import logo from './logo.svg';
import './App.css';
import store from './utils/Store';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import Create from './pages/Create';

function App() {
    return (
        <div className="d-flex flex-column justify-content-between">
            <Provider store={store}>
                <Router>
                    <Header />
                    <main>
                        <Routes>
                            <Route path='/' element={<Home />} />
                            <Route path='/create' element={<Create />} />
                        </Routes>
                    </main>
                    <Footer />
                </Router>
            </Provider>
        </div>
    );
}

export default App;
