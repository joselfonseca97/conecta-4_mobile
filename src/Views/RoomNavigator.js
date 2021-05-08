import React from 'react';
import { View } from 'react-native';

import BottomNavigation, {
    FullTab
} from 'react-native-material-bottom-navigation'

import { Icon } from 'react-native-elements'

import Room from '../Views/Room'
import UsersOnline from '../Views/UsersOnline'
import Chat from '../Views/MiniChat'

export default class App extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            idRoom: this.props.route.params.idSala,
            usuario: this.props.route.params.usuario, // obtiene el usuario desde props
            nombre: this.props.route.params.nombre,
            avatar_id: this.props.route.params.avatar_id,
            activeTab: 'room_tab'
        }
    }

    tabs = [
        {
            key: 'room_tab',
            icon: 'people', // family-restroom
            label: 'Sala',
            barColor: '#388E3C',
            screen: <Room
                navigation={this.props.navigation}
                idRoom={this.props.route.params.idSala}
                usuario={this.props.route.params.usuario}
                nombre={this.props.route.params.nombre}
                avatar_id={this.props.route.params.avatar_id}
            />,
            pressColor: 'rgba(255, 255, 255, 0.16)'
        },
        {
            key: 'users_tab',
            icon: 'add',
            label: 'Invitar',
            barColor: '#B71C1C',
            screen: <UsersOnline
                navigation={this.props.navigation}
                idRoom={this.props.route.params.idSala}
                usuario={this.props.route.params.usuario}
            />,
            pressColor: 'rgba(255, 255, 255, 0.16)',
        },
        {
            key: 'chat_tab',
            icon: 'chat',
            label: 'Chat',
            screen: <Chat navigation={this.props.navigation} />,
            barColor: '#E64A19',
            pressColor: 'rgba(255, 255, 255, 0.16)'
        }
    ]

    renderIcon = icon => ({ isActive }) => (
        <Icon size={26} color="white" name={icon} />
    )

    renderTab = ({ tab, isActive }) => (
        <FullTab
            isActive={isActive}
            key={tab.key}
            label={tab.label}
            renderIcon={this.renderIcon(tab.icon)}
        />
    )

    renderScreen = () => {
        return this.state.activeTab == 'room_tab' && this.tabs[0].screen ||
            this.state.activeTab == 'users_tab' && this.tabs[1].screen ||
            this.tabs[2].screen
    }

    render() {
        return (
            <View style={{ flex: 1 }}>
                <View style={{ flex: 1 }}>
                    {this.renderScreen()}
                </View>
                <BottomNavigation
                    activeTab={this.state.activeTab}
                    onTabPress={newTab => this.setState({ activeTab: newTab.key })}
                    renderTab={this.renderTab}
                    tabs={this.tabs}
                />
            </View>
        )
    }
}