import DailyLogTable from "./Pages/DailyLogTable";
import BlankPage from "./Pages/BlankPage";
import { UserProfile } from "./Pages/UserProfile";
import {
    BrowserRouter,
    Routes, Route, Navigate
} from 'react-router-dom';

const App = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route exact path='/' element={<BlankPage />} />
                <Route exact path='/select_daily' element={<DailyLogTable />} />
                <Route exact path=':id' element={<UserProfile/>} />
            </Routes>
        </BrowserRouter>
    );
};
export default App;