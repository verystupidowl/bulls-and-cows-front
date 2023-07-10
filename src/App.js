import './App.css';
import InstructorApp from "./components/InstructorApp";
import NavBar from "./components/NavBar";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";

function App() {
    return (
        <div className="App">
            <NavBar/>
            <InstructorApp/>
        </div>
    );
}

export default App;
