import { Routes, Route, BrowserRouter } from "react-router-dom";
import TimeMachine from "./pages/timeMachine/timeMachine";
import TictacToe from "./pages/ticTacToe/ticTacToe";
import Gamemenu from "./pages/main/gameMenu";
import Header from "./components/layout/header";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route index path="/" element={<Gamemenu />} />
        <Route path="/menu" element={<Gamemenu />} />
        <Route path="/TimeMachine" element={<TimeMachine />} />
        <Route path="/TictacToe" element={<TictacToe />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
