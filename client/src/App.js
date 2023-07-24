import {useEffect} from 'react';
import {Routes, Route} from 'react-router-dom';

import './App.css';
import {useTelegram} from './hooks/useTelegram';
import Header from './components/Header/Header';
import SneakersList from './components/SneakersList/SneakersList';
import Form from './components/Form/Form';

function App() {
    const {tg} = useTelegram();

    useEffect(() => {
        tg.ready();
    }, [tg]);

  return (
    <div>
        <Header/>
        <Routes>
            <Route path={'/'} element={<SneakersList/>}/>
            <Route path={'/form'} element={<Form/>}/>
        </Routes>
    </div>
  );
}

export default App;
