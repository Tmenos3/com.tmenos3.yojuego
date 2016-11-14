import React, { Component } from 'react';
import {
    StyleSheet,
    View,
    TextInput,
    Text,
    TouchableOpacity,
    Image,
    Dimensions,
    ListView,
    ScrollView,
    ActivityIndicator
} from 'react-native';
import CollapsablePanel from '../CollapsablePanel';
import MatchDetailActions from '../../actions/MatchDetailActions';
import MatchDetailStore from '../../stores/MatchDetailStore';

var MATCH_ID = "AVhbcAbS07HU-r1n0p3r";
var PLAYER_ID = "AVg7teCFiYhLaBUfJSUH";

class MatchDetailBody extends Component {
    constructor(props) {
        super(props);

        const dsComments = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
        const dsPlayersAccepted = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
        const dsPlayersWaiting = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });

        this.state = {
            comments: dsComments.cloneWithRows([]),
            playersAccepted: dsPlayersAccepted.cloneWithRows([]),
            playersWaiting: dsPlayersWaiting.cloneWithRows([]),
            loadingMatch: false,
            loadingPlayers: false,
            inputHeight: 30,
            match: null,
            players: null,
            errorLoadingMatch: false,
            sendCommentText: null,
            sendingComment: false
        };

        this._renderRowComments = this._renderRowComments.bind(this);
        this._renderRowPlayersAccepted = this._renderRowPlayersAccepted.bind(this);
        this._renderRowPlayersWaiting = this._renderRowPlayersWaiting.bind(this);
        this._renderPlayers = this._renderPlayers.bind(this);
        this._renderComments = this._renderComments.bind(this);
        this._removePlayer = this._removePlayer.bind(this);
        this._addPlayer = this._addPlayer.bind(this);
        this._onMatchDetailChange = this._onMatchDetailChange.bind(this);
        this._sendComment = this._sendComment.bind(this);
        this._onSendCommentTextChanged = this._onSendCommentTextChanged.bind(this);
        this._renderSendCommentButton = this._renderSendCommentButton.bind(this);
    }

    componentDidMount() {
        MatchDetailStore.addChangeListener(this._onMatchDetailChange);
        //MatchDetailActions.loadMatchDetail(this.state.match._id);
        MatchDetailActions.loadMatch(MATCH_ID);
    }

    componentWillUnmount() {

    }

    render() {
        let _scrollView = ScrollView;
        return (
            <View style={styles.container}>
                <ScrollView
                    ref={(scrollView) => { _scrollView = scrollView; } }
                    automaticallyAdjustContentInsets={true}
                    scrollEventThrottle={200}
                    style={styles.scrollView}>
                    {this._renderPlayers()}
                    {this._renderComments()}
                </ScrollView>
                {this._renderLoading()}
            </View>
        );
    }

    _renderLoading() {
        if (this.state.loadingMatch) {
            return (
                <View style={styles.loading}>
                    <ActivityIndicator animating={true} size='large' />
                </View>
            )
        }
    }

    _onMatchDetailChange() {
        if (MatchDetailStore.loadingMatchDetail()) {
            this.setState({ loadingMatch: true });
        } else if (MatchDetailStore.sendingComment()) {
            this.setState({ sendingComment: true });
        } else {
            let match = MatchDetailStore.getMatch();
            if (match != null && match != undefined) {
                const dsComments = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
                const dsPlayers = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });

                this.setState({
                    match: match,
                    comments: dsComments.cloneWithRows(match.comments),
                    playersAccepted: dsPlayers.cloneWithRows(match.players),
                    loadingMatch: false,
                    loadingPlayers: false,
                    sendingComment: false,
                    sendCommentText: null
                });

                // if (MatchDetailStore.loadingPlayers()) {
                //     this.setState({ loadingPlayers: true });
                // } else {
                //     const dsPlayers = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
                //     let players = MatchDetailStore.getPlayers(match.players);
                //     if (players != null && players != undefined) {

                //         this.setState({
                //             playersAccepted: dsPlayers.cloneWithRows(players),
                //             loadingPlayers: false
                //         });
                //     } else {
                //         this.setState({
                //             playersAccepted: dsPlayers.cloneWithRows([]),
                //             loadingPlayers: false
                //         });
                //     }
                // }
            } else {
                let error = MatchDetailStore.getError();
                const dsComments = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
                const dsPlayers = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
                this.setState({
                    loadingMatch: false,
                    loadingPlayers: false,
                    match: null,
                    errorLoadingMatch: true,
                    comments: dsComments.cloneWithRows([]),
                    playersAccepted: dsPlayers.cloneWithRows([]),
                    error: error,
                    sendingComment: false
                });
            }
        }
    }

    _renderPlayers() {
        return (
            <CollapsablePanel style={styles.sectionPlayers} title='Jugadores'>
                <ListView
                    dataSource={this.state.playersAccepted}
                    renderRow={this._renderRowPlayersAccepted}
                    style={styles.listViewPlayers}
                    horizontal={true}
                    enableEmptySections={true}
                    />
                <ListView
                    dataSource={this.state.playersWaiting}
                    renderRow={this._renderRowPlayersWaiting}
                    style={styles.listViewPlayers}
                    horizontal={true}
                    enableEmptySections={true}
                    />
                <TouchableOpacity style={styles.buttonAddPlayer} onPress={this._addPlayer}>
                    <Image style={styles.buttonAddPlayerImage} source={require('../../statics/add-player.png')}></Image>
                </TouchableOpacity>
            </CollapsablePanel>
        );
    }

    _renderComments() {
        return (
            <CollapsablePanel style={styles.sectionMessages} title='Comentarios'>
                <View style={styles.sectionForReading}>
                    <ListView
                        dataSource={this.state.comments}
                        renderRow={this._renderRowComments}
                        style={styles.listView}
                        enableEmptySections={true}
                        />
                </View>
                <View style={styles.sectionForWritting}>
                    <TextInput
                        style={styles.sendComment}
                        placeholder={"Escribir..."}
                        onChangeText={this._onSendCommentTextChanged}
                        text={this.state.sendCommentText}>
                    </TextInput>
                    {this._renderSendCommentButton()}
                </View>
            </CollapsablePanel>
        );
    }

    _renderSendCommentButton() {
        if (this.state.sendingComment) {
            return (
                <view style={styles.button}>
                    <ActivityIndicator animating={true} size='large' />
                </view>
            );
        } else {
            return (
                <TouchableOpacity
                    style={styles.button}
                    onPress={this._sendComment}>
                    <Image style={styles.buttonImage} source={require('../../statics/write-message.png')}></Image>
                </TouchableOpacity>
            );
        }
    }

    _renderRowComments(rowData) {
        if (rowData.id == 1) {
            return (
                <View style={{ alignItems: 'flex-end', borderRadius: 10 }}>
                    <View style={[styles.comment, styles.commentMine, { height: this.state.inputHeight }]}>
                        <Text style={{ fontSize: 15 }}>{rowData.text}
                        </Text>
                    </View>
                </View>
            );
        } else {
            return (
                <View style={{ borderRadius: 10 }}>
                    <View style={[styles.comment, styles.commentOther]}>
                        <Text style={{ fontSize: 15 }}>{rowData.text}</Text>
                    </View>
                </View>
            );
        }
    }

    _renderRowPlayersAccepted(rowData) {
        return (
            <View style={{ borderRadius: 10 }}>
                <View style={styles.playerAccepted}>
                    <TouchableOpacity style={styles.buttonMinus} onPress={() => this._removePlayer(rowData._id)}>
                        <Image style={styles.buttonMinusImage} source={require('../../statics/minus.png')}></Image>
                    </TouchableOpacity>
                    <Text style={{ fontSize: 15 }}>{rowData._id}</Text>
                </View>
            </View>
        );
    }

    _renderRowPlayersWaiting(rowData) {
        return (
            <View style={{ borderRadius: 10 }}>
                <View style={styles.playerWaiting}>
                    <TouchableOpacity style={styles.buttonMinus} onPress={() => this._removePlayer(rowData._id)}>
                        <Image style={styles.buttonMinusImage} source={require('../../statics/minus.png')}></Image>
                    </TouchableOpacity>
                    <Text style={{ fontSize: 15 }}>{rowData.nickname}</Text>
                </View>
            </View>
        );
    }

    _removePlayer(playerId) {

    }

    _addPlayer() {

    }

    _sendComment() {
        if (this.state.sendCommentText)
            MatchDetailActions.sendComment(PLAYER_ID, MATCH_ID, this.state.sendCommentText);
    }

    _onSendCommentTextChanged(text) {
        this.setState({
            sendCommentText: text
        });
    }
}

var styles = StyleSheet.create({
    scrollView: {
        backgroundColor: '#d9d9d9',
    },
    container: {
        flex: 1,
        backgroundColor: '#d9d9d9',
        flexDirection: 'column'
    },
    sectionPlayers: {
        marginTop: 6,
        marginBottom: 20,
        marginRight: 6,
        marginLeft: 6,
        borderBottomWidth: 0.5,
        backgroundColor: '#F6F6F6',
        borderRadius: 5
    },
    sectionMessages: {
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
    buttonAddPlayer: {
        width: 100,
        height: 100,
        backgroundColor: 'transparent',
        borderColor: 'gray'
    },
    buttonMinus: {
        width: 25,
        height: 25,
        backgroundColor: 'transparent',
        left: 29,
        top: -20,
        alignItems: 'center',
        justifyContent: 'center'
    },
    buttonAddPlayerImage: {
        width: 80,
        height: 80,
        backgroundColor: 'transparent',
        borderColor: 'gray',
        marginTop: 20
    },
    buttonMinusImage: {
        width: 25,
        height: 25,
        backgroundColor: 'transparent'
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
        borderColor: 'grey'
    },
    playerAccepted: {
        marginTop: 10,
        marginHorizontal: 6,
        borderBottomWidth: 0.5,
        height: 90,
        width: 90,
        borderRadius: 45,
        backgroundColor: 'gray',
        alignItems: 'center',
        justifyContent: 'center'
    },
    playerWaiting: {
        marginTop: 10,
        marginHorizontal: 6,
        borderBottomWidth: 0.5,
        height: 90,
        width: 90,
        borderRadius: 45,
        backgroundColor: 'blue',
        alignItems: 'center',
        justifyContent: 'center'
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
    },
    loading: {
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.25)'
    }
});

module.exports = MatchDetailBody;
