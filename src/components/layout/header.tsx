import { useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();

  const handleTimeMachine = () => {
    navigate("/TimeMachine");
  };

  const handleTictactoe = () => {
    navigate("/TictacToe");
  };

  const handleMenu = () => {
    navigate("/menu");
  };

  return (
    <div className="container__header">
      <div>
        <button className="header__btn" onClick={handleTimeMachine}>
          <h2>Time Machine</h2>
        </button>
        <button className="header__btn" onClick={handleTictactoe}>
          <h2>Tictactoe</h2>
        </button>
        <button className="header__btn" onClick={handleMenu}>
          <h2>Menu</h2>
        </button>
      </div>
    </div>
  );
};

export default Header;
