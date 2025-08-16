import { Board } from "./Board";
import classes from "./App.module.css";
import { Header } from "./Header";

function App() {
  return (
    <div className={classes.container}>
      <Header />
      <Board />
    </div>
  );
}

export default App;
