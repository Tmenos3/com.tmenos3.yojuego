import React, { Component } from 'react';
import {
    StyleSheet,
    View,
    TextInput,
    Text,
    TouchableOpacity,
    Image,
    Dimensions,
    ListView
} from 'react-native';

class MatchDetailBody extends Component {
    constructor(props) {
        super(props);

        const dsComments = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
        const dsPlayersAccepted = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
        const dsPlayersWaiting = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
        this.state = {
            comments: dsComments.cloneWithRows([
                { id: 1, comment: 'This is a comment sent by me' },
                { id: 2, comment: 'a comment' },
                { id: 3, comment: 'a comment' },
                { id: 1, comment: 'This is another comment sent by me' },
                { id: 5, comment: 'a comment' },
                { id: 6, comment: 'a comment' },
                { id: 1, comment: 'Sent by me too' },
                { id: 8, comment: 'a comment' }]),
            playersAccepted: dsPlayersAccepted.cloneWithRows([
                { id: 1, date: 'algo' },
                { id: 2, date: 'algo' },
                { id: 3, date: 'algo' },
                { id: 4, date: 'algo' },
                { id: 5, date: 'algo' },
                { id: 6, date: 'algo' },
                { id: 7, date: 'algo' },
                { id: 8, date: 'algo' }]),
            playersWaiting: dsPlayersWaiting.cloneWithRows([
                { id: 1, date: 'algo' },
                { id: 2, date: 'algo' },
                { id: 3, date: 'algo' },
                { id: 4, date: 'algo' },
                { id: 5, date: 'algo' },
                { id: 6, date: 'algo' },
                { id: 7, date: 'algo' },
                { id: 8, date: 'algo' }]),
            loadingMatch: false,
            inputHeight: 30
        };

        this._renderRowComments = this._renderRowComments.bind(this);
        this._renderRowPlayersAccepted = this._renderRowPlayersAccepted.bind(this);
        this._renderRowPlayersWaiting = this._renderRowPlayersWaiting.bind(this);
        this._renderPlayers = this._renderPlayers.bind(this);
        this._renderComments = this._renderComments.bind(this);
    }

    componentDidMount() {

    }

    componentWillUnmount() {

    }

    render() {
        return (
            <View style={styles.container}>
                {this._renderPlayers()}
                {this._renderComments()}
            </View>
        );
    }

    _renderPlayers() {
        return (
            <View style={styles.sectionPlayers}>
                <ListView
                    dataSource={this.state.playersAccepted}
                    renderRow={this._renderRowPlayersAccepted}
                    style={styles.listViewPlayers}
                    horizontal={true}
                    />
                <ListView
                    dataSource={this.state.playersWaiting}
                    renderRow={this._renderRowPlayersWaiting}
                    style={styles.listViewPlayers}
                    horizontal={true}
                    />
            </View>
        );
    }

    _renderComments() {
        return (
            <View style={styles.sectionMessages}>
                <View style={styles.sectionForReading}>
                    <ListView
                        dataSource={this.state.comments}
                        renderRow={this._renderRowComments}
                        style={styles.listView}
                        />
                </View>
                <View style={styles.sectionForWritting}>
                    <TextInput style={styles.sendComment} placeholder={"Escribir..."}>
                    </TextInput>
                    <TouchableOpacity style={styles.button}>
                        <Image style={styles.buttonImage} source={require('../../statics/write-message.png')}></Image>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }

    _renderRowComments(rowData) {
        if (rowData.id == 1) {
            return (
                <View style={{ alignItems: 'flex-end', borderRadius: 10 }}>
                    <View style={[styles.comment, styles.commentMine, { height: this.state.inputHeight }]}>
                        <Text style={{ fontSize: 15 }}>{rowData.comment}
                        </Text>
                    </View>
                </View>
            );
        } else {
            return (
                <View style={{ borderRadius: 10 }}>
                    <View style={[styles.comment, styles.commentOther]}>
                        <Text style={{ fontSize: 15 }}>{rowData.comment}</Text>
                    </View>
                </View>
            );
        }
    }

    _renderRowPlayersAccepted(rowData) {
        return (
            <View style={{ borderRadius: 10 }}>
                <View style={styles.playerAccepted}>
                    <Text style={{ fontSize: 15 }}>{rowData.id}</Text>
                </View>
            </View>
        );
    }

    _renderRowPlayersWaiting(rowData) {
        return (
            <View style={{ borderRadius: 10 }}>
                <View style={styles.playerWaiting}>
                    <Text style={{ fontSize: 15 }}>{rowData.id}</Text>
                </View>
            </View>
        );
    }
}

var styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#d9d9d9',
        flexDirection: 'column'
    },
    sectionPlayers: {
        flex: 1,
        marginTop: 6,
        marginBottom: 3,
        marginRight: 6,
        marginLeft: 6,
        borderBottomWidth: 0.5,
        backgroundColor: '#F6F6F6',
        borderRadius: 5
    },
    sectionMessages: {
        flex: 1,
        borderBottomWidth: 0.5,
        backgroundColor: 'transparent',
        borderRadius: 5
    },
    sectionForReading: {
        flex: 1,
        marginTop: 6,
        marginBottom: 1,
        marginRight: 6,
        marginLeft: 6,
        borderBottomWidth: 0.5,
        backgroundColor: '#F6F6F6',
        borderRadius: 5
    },
    sectionForWritting: {
        height: 40,
        marginTop: 1,
        marginBottom: 6,
        marginRight: 6,
        marginLeft: 6,
        borderBottomWidth: 0.5,
        backgroundColor: '#F6F6F6',
        borderRadius: 5,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    button: {
        width: 50,
        height: 50,
        backgroundColor: 'transparent',
        borderRadius: 5
    },
    buttonInvitations: {
        width: 50,
        height: 50,
    },
    buttonImage: {
        width: 30,
        height: 30,
        position: 'relative'
    },
    sendComment: {
        flex: 1,
        flexDirection: 'row'
    },
    listViewPlayers: {
        flex: 1,
        flexDirection: 'row',
        borderColor: 'grey'
    },
    listView: {
        flex: 1,
        borderColor: 'grey'
    },
    playerAccepted: {
        marginTop: 10,
        marginHorizontal: 6,
        borderBottomWidth: 0.5,
        height: 90,
        width: 90,
        borderRadius: 45,
        backgroundColor: 'gray'
    },
    playerWaiting: {
        marginTop: 10,
        marginHorizontal: 6,
        borderBottomWidth: 0.5,
        height: 90,
        width: 90,
        borderRadius: 45,
        backgroundColor: 'blue'
    },
    comment: {
        marginTop: 10,
        marginHorizontal: 6,
        borderBottomWidth: 0.5,
        height: 30,
        borderRadius: 5,
    },
    commentOther: {
        backgroundColor: 'green',
        width: Dimensions.get('window').width * 0.70,
    },
    commentMine: {
        marginRight: 10,
        backgroundColor: 'yellow',
        width: Dimensions.get('window').width * 0.70,
    }
});

module.exports = MatchDetailBody;
