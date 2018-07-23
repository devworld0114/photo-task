import React, { Component } from 'react';
import { Text, YellowBox } from 'react-native';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import reducers from './reducers';
import ReduxThunk from 'redux-thunk';
import { Router, Scene, Modal, Actions } from 'react-native-router-flux';
import Icon from 'react-native-vector-icons/Feather';

import Login from './pages/Login/Login';
import Signup from './pages/Login/Signup';
import Forgot from './pages/Login/Forgot';
import Profile from './pages/Login/Profile';

import ScarletScreen from './pages/Main/ColorScreen/ScarletScreen';
import BlueScreen from './pages/Main/ColorScreen/BlueScreen';
import MyLists from './pages/Main/ColorScreen/MyLists';
import NewList from './pages/Main/NewList';
import NewPerson from './pages/Main/NewPerson';

import ModalScreen from './pages/Main/ModalScreen';
import Settings from './pages/Main/Settings';


const firebase = require('firebase');
const TabIcon = ({selected, title}) => {
    return (
        <Text style={{color: selected ? 'red' : 'black'}}>{title}</Text>
    )
}
require('firebase/firestore');


class App extends Component {

    constructor() {
        super()

        YellowBox.ignoreWarnings(['Warning: isMounted(...) is deprecated'])
    }

    componentWillMount() {
        const config = {
            // apiKey: "AIzaSyDVY-VLRCwplS97i_4xmIYz61dGdhkRuxo",
            // authDomain: "manager-2db8f.firebaseapp.com",
            // databaseURL: "https://manager-2db8f.firebaseio.com",
            // projectId: "manager-2db8f",
            // storageBucket: "manager-2db8f.appspot.com",
            // messagingSenderId: "542838844120"
            apiKey: "AIzaSyB376787Ea21BB4MBXT8WhoMJqpToh7asY",
            authDomain: "fir-db-f070b.firebaseapp.com",
            databaseURL: "https://fir-db-f070b.firebaseio.com",
            projectId: "fir-db-f070b",
            storageBucket: "fir-db-f070b.appspot.com",
            messagingSenderId: "191526665676"
        };
        firebase.initializeApp(config);

        const firestore = firebase.firestore();
        const settings = {
            timestampsInSnapshots: true
        };
        firestore.settings(settings);
    }

    render() {
        const store = createStore(reducers, {}, applyMiddleware(ReduxThunk));
        const settingsIcon = (<Icon name="settings" size={22} color="#999"/>);
        const plusIcon = (<Icon name="plus" size={26} color="#999"/>);
        const listIcon = (<Icon name="list" size={18}  />);
        const peopleIcon = (<Icon name="users" size={18} />);
        const activityIcon = (<Icon name="activity" size={18}/>);

        return (
            <Provider store={store}>
                <Router>
                    <Modal>
                        {/* For Login / Signup */}
                        <Scene key="root" hideNavBar>
                            <Scene
                                key="login"
                                component={Login}
                                title="Login" initial/>

                            <Scene
                                key="signup"
                                component={Signup}
                                title="Sign Up" />

                            <Scene
                                key="forgot"
                                component={Forgot}
                                title="Forgot Password" />
                        </Scene>

                        {/* For Main */}
                        <Scene key="tabbar" tabs hideNavBar>
                            <Scene key="Feed" title={activityIcon} icon={TabIcon}>
                                <Scene
                                    key="scarlet"
                                    component={ScarletScreen}
                                    title="Feed"
                                    onRight={() => {
                                        Actions.push('settings');
                                    }}
                                    rightTitle={settingsIcon}
                                    initial />
                            </Scene>

                            <Scene key="People" title={peopleIcon} icon={TabIcon}>
                                <Scene
                                    key="blue"
                                    title="People"
                                    onRight={() => {
                                        Actions.push('settings');
                                    }}
                                    rightTitle={settingsIcon}
                                    component={BlueScreen}
                                    onLeft={() => {
                                        Actions.push('newperson');
                                    }}
                                    leftTitle={plusIcon} />

                                <Scene
                                    key="newperson"
                                    title="Create New Person"
                                    component={NewPerson} />  

                            </Scene>

                            <Scene key="Lists" title={listIcon} icon={TabIcon}>

                                <Scene
                                    key="mylists"
                                    title="Lists"
                                    onRight={() => {
                                        Actions.push('settings');
                                    }}
                                    rightTitle={settingsIcon}
                                    component={MyLists}
                                    onLeft={() => {
                                        Actions.push('newlist');
                                    }}
                                    leftTitle={plusIcon} />

                                <Scene
                                    key="newlist"
                                    title="Create New List"
                                    component={NewList} />  

                            </Scene>

                        </Scene>

                        <Scene
                            key="profile"
                            component={Profile}
                            title="Update Profile" />

                        <Scene
                            key="modal"
                            component={ModalScreen}
                            title="Modal"
                            hideNavBar />  

                        <Scene
                            key="settings"
                            component={Settings}
                            title="Settings" />

                    </Modal>
                </Router>
            </Provider>
        );
    }
}

export default App;