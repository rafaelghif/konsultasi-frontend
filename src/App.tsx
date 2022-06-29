import { Redirect, Route } from 'react-router-dom';
import { IonApp, IonRouterOutlet, IonSplitPane, setupIonicReact } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import axios from 'axios';
import socket from './socket/socket';

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/* Theme variables */
import './theme/variables.css';
import './theme/sweetalert2.css';
import './index.css';
import "swiper/css/bundle";

/* Page */
import Home from './pages/Home';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import { useAppSelector } from './redux/hook';
import SideMenu from './components/SideMenu';
import User from './pages/User';
import Pakar from './pages/Pakar';
import Konsultasi from './pages/Konsultasi';
import Register from './pages/Register';
import TestMinatBakat from './pages/TestMinatBakat';
import Question from './pages/Question';

setupIonicReact();

axios.defaults.headers.post['Content-Type'] = 'application/json';
axios.defaults.headers.put['Content-Type'] = 'application/json';

axios.interceptors.request.use(async (config) => {
  let accessToken = localStorage.getItem('token');
  if (accessToken) {
    config.headers = Object.assign({ Authorization: `Bearer ${accessToken}` }, config.headers);
  }
  return config;
}, (err) => {
  console.log(err);
});

socket.connect();

const App: React.FC = () => {

  const user = useAppSelector((state) => state.user)

  return (
    <IonApp>
      <IonReactRouter>
        <IonSplitPane contentId='side-menu-content' when={user.id === "" ? false : user.role === 'Super User' || user.role === 'Admin' ? "md" : false}>
          <SideMenu />
          <IonRouterOutlet id='side-menu-content'>
            <Route exact path="/home" component={Home} />
            <Route exact path="/konsultasi" component={Konsultasi} />
            <Route exact path="/testminatbakat" component={TestMinatBakat} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/register" component={Register} />
            <Route exact path="/admin/home" component={Dashboard} />
            <Route exact path="/admin/user" component={User} />
            <Route exact path="/admin/pakar" component={Pakar} />
            <Route exact path="/admin/question" component={Question} />
            <Route exact path="/admin">
              <Redirect to="/admin/home" />
            </Route>
            <Route exact path="/">
              <Redirect to="/home" />
            </Route>
          </IonRouterOutlet>
        </IonSplitPane>
      </IonReactRouter>
    </IonApp>
  )
};

export default App;
