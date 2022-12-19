import Footer from "./components/Footer/Footer";
import Header from "./components/Header/Header";
import { useScreenSize } from "./hooks";
import "./App.css";
import View from "./components/View/View";

function App() {
  useScreenSize();

  return (
    <div className="body-container">
      <Header />
      <main className="main">
        <View />
      </main>
      <Footer />
    </div>
  );
}

export default App;
