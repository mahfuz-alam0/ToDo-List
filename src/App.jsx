import { RouterProvider } from 'react-router-dom';
import './App.css';
import Home from './Home/Home';
import { router } from './Route/Route';

function App() {
    return (
        <div className="bg-green-200 h-auto">
            <RouterProvider router={router}></RouterProvider>
        </div>
    );
}

export default App;