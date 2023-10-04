import './App.css';
import { BrowserRouter as Router } from 'react-router-dom';
import AppRouter from './AppRouter.jsx';
//import { AuthProvider } from './Context/AuthContext';
import { AuthProvider } from './Context/AuthContext';

function App() {
  return (
    <div>
      <Router>
        <AuthProvider>
          <AppRouter />
        </AuthProvider>
      </Router>
    </div>
  );
}

export default App;

