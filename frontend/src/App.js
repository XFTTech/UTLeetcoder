import DailyLogTable from "./Pages/DailyLogTable";
import BlankPage from "./Pages/BlankPage";
import {
    BrowserRouter,
    Routes, Route, Navigate
} from 'react-router-dom';

const App = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route exact path='/select_daily' element={<DailyLogTable />} />
                <Route exact path='/' element={<BlankPage />} />
            </Routes>
        </BrowserRouter>
    );
};
export default App;