import React, { Component } from 'react';
import {
    StyleSheet,
    View,
    Text,
    TouchableOpacity,
    Image
} from 'react-native';

class MatchDetailBody extends Component {
    constructor(props) {
        super(props);

        // const dsComments = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
        // const dsPlayers = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
        // this.state = {
        //     comments: dsComments.cloneWithRows([
        //         { id: 1, date: { day: '21', month: 'OCT' }, desc: 'One match.' },
        //         { id: 2, date: { day: '21', month: 'OCT' }, desc: 'One match.' },
        //         { id: 3, date: { day: '21', month: 'OCT' }, desc: 'One match.' },
        //         { id: 4, date: { day: '21', month: 'OCT' }, desc: 'One match.' },
        //         { id: 5, date: { day: '21', month: 'OCT' }, desc: 'One match.' },
        //         { id: 6, date: { day: '21', month: 'OCT' }, desc: 'One match.' },
        //         { id: 7, date: { day: '21', month: 'OCT' }, desc: 'One match.' },
        //         { id: 8, date: { day: '21', month: 'OCT' }, desc: 'One match.' }]),
        //     players: dsPlayers.cloneWithRows([
        //         { id: 1, date: { day: '21', month: 'OCT' }, desc: 'One match.' },
        //         { id: 2, date: { day: '21', month: 'OCT' }, desc: 'One match.' },
        //         { id: 3, date: { day: '21', month: 'OCT' }, desc: 'One match.' },
        //         { id: 4, date: { day: '21', month: 'OCT' }, desc: 'One match.' },
        //         { id: 5, date: { day: '21', month: 'OCT' }, desc: 'One match.' },
        //         { id: 6, date: { day: '21', month: 'OCT' }, desc: 'One match.' },
        //         { id: 7, date: { day: '21', month: 'OCT' }, desc: 'One match.' },
        //         { id: 8, date: { day: '21', month: 'OCT' }, desc: 'One match.' }]),
        //     loadingMatch: false
        // };

        this._matchDetailComments = this._matchDetailComments.bind(this);
        this._matchDetailPlayers = this._matchDetailPlayers.bind(this);
        this._renderRowComments = this._renderRowComments.bind(this);
        this._renderRowPlayers = this._renderRowPlayers.bind(this);
    }

    componentDidMount() {

    }

    componentWillUnmount() {

    }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.panelLeft}>
                    <View style={styles.sectionLeft}>
                    </View>
                    <View style={styles.sectionLeft}>
                    </View>
                </View>
                <View style={styles.panelRight}>
                    <View style={styles.sectionRight}>
                        <TouchableOpacity style={styles.button}>
                            <Image style={styles.buttonImage} source={require('../../statics/add-player.png')}></Image>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.sectionRight}>
                        <TouchableOpacity style={styles.button}>
                            <Image style={styles.buttonImage} source={require('../../statics/write-message.png')}></Image>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        );
    }

    _matchDetailComments() {
        // return (
        //     <View style={styles.container}>
        //         <ListView
        //             dataSource={this.state.comments}
        //             renderRow={this._renderRowComments}
        //             style={styles.listView}
        //             />
        //         <TouchableOpacity style={styles.button} onPress={this._showSignUp}>
        //             <Text style={styles.buttonText}>+</Text>
        //         </TouchableOpacity>
        //         {this._renderLoading()}
        //     </View>
        // );
    }

    _matchDetailPlayers() {
        // return (
        //     <View style={styles.container}>
        //         <ListView
        //             dataSource={this.state.players}
        //             renderRow={this._renderRowPlayers}
        //             style={styles.listView}
        //             />
        //         <TouchableOpacity style={styles.button} onPress={this._showSignUp}>
        //             <Text style={styles.buttonText}>+</Text>
        //         </TouchableOpacity>
        //         {this._renderLoading()}
        //     </View>
        // );
    }

    _renderRowComments(rowData) {
        // return (
        //     <View style={{ borderRadius: 10 }}>
        //         <TouchableOpacity style={styles.dataRow} onPress={() => this._rowPreseed(rowData.id)}>
        //             <View style={styles.dataRowLeft}>
        //                 <Text style={{ fontSize: 26 }}>{rowData.date.day}</Text>
        //                 <Text style={{ fontSize: 13 }}>{rowData.date.month}</Text>
        //             </View>
        //             <View style={styles.dataRowRight}>
        //                 <Text style={{ fontSize: 20 }}>{rowData.desc}</Text>
        //             </View>
        //         </TouchableOpacity>
        //     </View>
        // );
    }

    _renderRowPlayers(rowData) {
        // return (
        //     <View style={{ borderRadius: 10 }}>
        //         <TouchableOpacity style={styles.dataRow} onPress={() => this._rowPreseed(rowData.id)}>
        //             <View style={styles.dataRowLeft}>
        //                 <Text style={{ fontSize: 26 }}>{rowData.date.day}</Text>
        //                 <Text style={{ fontSize: 13 }}>{rowData.date.month}</Text>
        //             </View>
        //             <View style={styles.dataRowRight}>
        //                 <Text style={{ fontSize: 20 }}>{rowData.desc}</Text>
        //             </View>
        //         </TouchableOpacity>
        //     </View>
        // );
    }
}

var styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#d9d9d9',
        flexDirection: 'row'
    },
    panelRight: {
        width: 60
    },
    panelLeft: {
        flex: 1
    },
    sectionLeft: {
        flex: 1,
        marginTop: 6,
        marginLeft: 6,
        borderBottomWidth: 0.5,
        backgroundColor: '#F6F6F6',
        borderRadius: 5
    },
    sectionRight: {
        flex: 1,
        alignItems: 'flex-start',
        justifyContent: 'flex-end'
    },
    button: {
        width: 50,
        height: 50,
        backgroundColor: 'transparent',
        borderRadius: 5
    },
    buttonImage: {
        width: 40,
        height: 40,
        position: 'absolute',
        left: 7,
        bottom: 7
    }
});

module.exports = MatchDetailBody;
