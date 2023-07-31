import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { isPushNotificationSupported, sendNotification, initializePushNotifications, registerServiceWorker } from "./utils/pushUtils";
import axios from 'axios';

import Home from "./components/home";
import Menu from "./components/menu";
import Admin from "./components/admin/adminHome";
import Cocktails from "./components/categories/cocktails";
import Mocktails from "./components/categories/mocktails";
import Spirits from "./components/categories/spirits";
import Shots from "./components/categories/shots";
import AdminMenu from './components/admin/adminMenu';
import DrinkManagement from './components/admin/drinkManagement';
import AddDrink from './components/admin/addDrink';
import AddAdmin from './components/admin/adminNew';
import AddDrinkSuccess from './components/admin/addDrinkSuccess';

function App() {

  let pushUrl;

  if (process.env.NODE_ENV === "development") {
    pushUrl = "http://localhost:5000/push/subscribe";
  } else {
    pushUrl = "https://ineedadrink.onrender.com/push/subscribe";
  }

/*   const subscribeToPushNotifications = async () => {
    try {
      const registration = await navigator.serviceWorker.ready;
      const pushSubscription = await registration.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: "BDQAXuUBj7fACEaxZAgO5uprZa_TPUd1XtqrqORXxI8-5yg43hnQpg482BIJVszEXjp3Y3myJX3H0SnJR2ou4Co",
      });
      await axios.post(pushUrl, pushSubscription);
      console.log("Push Subscription:", pushSubscription);
    } catch (error) {
      console.error("Error subscribing to Push Notifications:", error);
    }
  }; */

  useEffect(() => {
    /* if ('serviceWorker' in navigator) {
      navigator.serviceWorker
        .register('/service-worker.js')
        .then((registration) => {
          console.log('Service Worker registered!', registration);
        })
        .catch((error) => {
          console.error('Error registering Service Worker:', error);
        });
    } */
    const pushNotificationSuported = isPushNotificationSupported();
if (pushNotificationSuported) {
registerServiceWorker();
  initializePushNotifications()
}
  }, []);

  
  
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home />}></Route>
          <Route path='/menu' element={<Menu />}></Route>
          <Route path='/admin' element={<Admin />}></Route>
          <Route path='/cocktails' element={<Cocktails />}></Route>
          <Route path='/mocktails' element={<Mocktails />}></Route>
          <Route path='/spirits' element={<Spirits />}></Route>
          <Route path='/shots' element={<Shots />}></Route>
          <Route path='/admin' element={<Admin />}></Route>
          <Route path='/adminmenu' element={<AdminMenu />}></Route>
          <Route path='/addadmin' element={<AddAdmin />}></Route>
          <Route path='/adddrink' element={<AddDrink />}></Route>
          <Route path='/drinkmanagement' element={<DrinkManagement />}></Route>
          <Route path='/addsuccess' element={< AddDrinkSuccess/>}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
