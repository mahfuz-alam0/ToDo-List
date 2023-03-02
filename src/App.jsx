import { Toaster } from 'react-hot-toast';
import { RouterProvider } from 'react-router-dom';
import './App.css';
import Home from './Home/Home';
import { router } from './Route/Route';

function App() {
    return (
        <div className="bg-green-200 h-auto">
            <RouterProvider router={router}></RouterProvider>
            <Toaster/>
        </div>
    );
}

export default App;