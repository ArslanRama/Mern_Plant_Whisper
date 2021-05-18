import './css/App.css';
import { Container } from "react-bootstrap";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import NavTop from './components/Navbar';


function App() {
  return (
    <Router>
    <div className="App">
        <Container>
           <NavTop/>
           <Switch>

           </Switch>
        </Container>
    </div>
    </Router>
  );
}

export default App;