import Footer from './components/Footer/Footer';
import Header from './components/Header/Header';
import { useScreenSize } from './hooks';
import './App.css';
import Body from './components/Body/Body';

function App() {
  useScreenSize();

  return (
    <div className="body-container">
      <Header />
      <main className="main">
        <Body />
      </main>
      <Footer />
    </div>
  );
}

export default App;
