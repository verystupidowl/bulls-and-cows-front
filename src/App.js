import './App.css';
import InstructorApp from './components/common/InstructorApp.js';
import NavBar from './components/common/NavBar.js';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <div className="App">
      <NavBar />
      <InstructorApp />
    </div>
  );
}

export default App;
