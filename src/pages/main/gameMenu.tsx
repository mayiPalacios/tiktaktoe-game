import { useNavigate } from "react-router-dom";

const Gamemenu = () => {
  const navigate = useNavigate();

  const handleTimeMachine = () => {
    navigate("/TimeMachine");
  };

  const handleTictactoe = () => {
    navigate("/TictacToe");
  };

  return (
    <div className="container__game--menu">
      <div className="container__menu--btn">
        <button onClick={handleTimeMachine}>
          <img src="https://m.media-amazon.com/images/W/IMAGERENDERING_521856-T1/images/I/414mcVQdXhL._AC_SX355_.jpg" />
        </button>
        <span>Time Machine</span>
      </div>
      <div className="container__menu--btn">
        <button onClick={handleTictactoe}>
          <img
            src="https://store-images.s-microsoft.com/image/apps.2005.14057826194083709.67242c47-4fd7-4f1a-9dd6-5d93f6cc10df.f80f14c0-72ab-46ff-86cd-9d801c8e04e8?mode=scale&q=90&h=300&w=300"
            alt=""
          />
        </button>
        <span>Tictactoe</span>
      </div>
    </div>
  );
};

export default Gamemenu;
