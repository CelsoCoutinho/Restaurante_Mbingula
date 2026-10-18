import './App_BackOffice.css';
import Sidebar from './components/SidebarBackOffice'
import Home from './pages/Home';
import 'bootstrap/dist/css/bootstrap.min.css';

function App_BackOffice() {
 
  return (

    <div className="d-flex">
      <Sidebar />
      <Home />
    </div>
  );
}

export default App_BackOffice
