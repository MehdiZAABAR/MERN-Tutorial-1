import React, {createContext, useState} from 'react'
import {Routes, Route} from "react-router-dom"
import CreateSeed from "./pages/CreateSeed.jsx"
import EditSeed from "./pages/EditSeed.jsx"
import DeleteSeed from "./pages/DeleteSeed.jsx"
import ShowSeed from "./pages/ShowSeed.jsx"
import CreateTray from "./pages/CreateTray.jsx"
import EditTray from "./pages/EditTray.jsx"
import DeleteTray from "./pages/DeleteTray.jsx"
import DeleteSlot from "./pages/DeleteSlot.jsx"
import Home from "./pages/Home.jsx"
import TrayComponent from './pages/TrayComponent.jsx'
import CreateMood from './components/home/CreateMood.jsx'
import CreateKeyword from './components/home/CreateKeyWord.jsx'
import Stats from './pages/Stats.jsx'
import AllTables from './pages/AllTables.jsx'
import CreateAnyRecord from './pages/CreateAnyRecord.jsx'
import { ReservoirSchema, Reservoir, GrowingUnitSchema } from '../../Backend/models/all_collections_models.js'

export const AppDataSharingContext = createContext();

const App = () => {
  const [appTrays, setAppTrays] = useState(null);
  const [appSeeds, setAppSeeds] = useState(null);
  const [appGrowingUnits, setAppGrowingUnits] = useState(null);
  const [appMoods, setAppMoods] = useState(null);
  const [appKeywords, setAppKeywords] = useState(null);

  return (
    <AppDataSharingContext.Provider value={{ appTrays, setAppTrays, appSeeds, setAppSeeds, appGrowingUnits, setAppGrowingUnits, appMoods, setAppMoods, appKeywords, setAppKeywords }}>
    <Routes>
      <Route path='/' element={<Home/>} />
      <Route path='/All' element={<AllTables/>} />
      <Route path='/Stats' element={<Stats/>} />
      <Route path='/Seeds/Create' element={<CreateSeed/>} />
      <Route path='/Seeds/Details/:id' element={<ShowSeed/>} />
      <Route path='/Seeds/Edit/:id' element={<EditSeed/>} />
      <Route path='/Seeds/Delete/:id' element={<DeleteSeed/>} />
      <Route path='/Trays/Create' element={<CreateTray/>} />
      <Route path='/Trays/Details/:id' element={<TrayComponent/>} />
      <Route path='/Trays/Edit/:id' element={<EditTray/>} />
      <Route path='/Trays/Delete/:id' element={<DeleteTray/>} />
      <Route path='/Slots/Create' element={<CreateTray/>} />
      <Route path='/Slots/Details/:id' element={<TrayComponent/>} />
      <Route path='/Slots/Edit/:id' element={<EditTray/>} />
      <Route path='/Slots/Delete/:id' element={<DeleteSlot/>} />
      <Route path='/Moods/Create' element={<CreateMood/>} />
      <Route path='/Keywords/Create' element={<CreateKeyword/>} />
      <Route path='/Reservoirs/Create' element={<CreateAnyRecord collectionName={'Reservoirs'} recordSchema={ReservoirSchema} onSubmit={ (item) => { console.log( `on Submit of the item ${JSON.stringify(item)}`)}} onClose={( ) => {console.log( 'Done')}}/>} />
      <Route path='/GrowingUnits/Create' element={<CreateAnyRecord collectionName={'GrowingUnits'} recordSchema={GrowingUnitSchema} onSubmit={ (item) => { console.log( `on Submit of the item ${JSON.stringify(item)}`)}} onClose={( ) => {console.log( 'Done')}}/>} />

    </Routes>
    </AppDataSharingContext.Provider>

  )
}

export default App