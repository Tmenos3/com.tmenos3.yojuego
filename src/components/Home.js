var CustomTabBar = require('./CustomTabBar');
var DownloadModule = require('react-native').NativeModules.DownloadModule;
var HomeActions = require('../actions/HomeActions');
var HomeStore = require('../stores/HomeStore');
var HomeSummary = require('./homeTab/HomeSummary');
var QuestionActions = require('../actions/QuestionActions');
var QuestionCreateMenu = require('./question/QuestionCreateMenu');
var QuestionList = require('./question/QuestionList');
var QuestionStore = require('../stores/QuestionStore');
import React, { Component } from 'react';
var ScrollableTabView = require('react-native-scrollable-tab-view');
var SearchBar = require('./SearchBar');
var TabConstants = require('../constants/TabConstants');
var Translations = require('../localization/Translations');
var VideoActions = require('../actions/VideoActions');
var VideoList = require('./video/VideoList');
var VideoStore = require('../stores/VideoStore');
var LogHelper = require('../utilities/LogHelper');
var StyleHelper = require('../utilities/StyleHelper');

import {
  Text,
  View,
  StyleSheet,
  Dimensions,
  InteractionManager,
  TouchableWithoutFeedback,
  TouchableOpacity
} from 'react-native';

var deviceWidth = StyleHelper.deviceWith;

class Home extends Component{
  constructor(props) {
    super(props);
    this.state = {
      questions: QuestionStore.getAll(),
      loadingQuestions: QuestionStore.isLoading(),
      loadingMoreQuestions: QuestionStore.isLoadingMore(),
      refreshingQuestions : QuestionStore.isRefreshing(),
      videos: VideoStore.getAll(),
      loadingVideos: QuestionStore.isLoading(),
      refreshingVideos: VideoStore.isRefreshing(),
      videoSubjectFilter: VideoStore.getSubjectFilter(),
      questionSubjectFilter: VideoStore.getSubjectFilter(),
      questionMenuVisible: HomeStore.getSelectedTab() != TabConstants.TAB_USER,
      showSubjectFilter: false
    };

    this._onQuestionChange = this._onQuestionChange.bind(this);
    this._onVideoChange = this._onVideoChange.bind(this);
    this._onQuestionEndReached = this._onQuestionEndReached.bind(this);
    this._onVideoEndReached = this._onVideoEndReached.bind(this);
    this._onVideoRefresh = this._onVideoRefresh.bind(this);
    this._onQuestionRefresh = this._onQuestionRefresh.bind(this);
    this._onHomeChange = this._onHomeChange.bind(this);
    this._onChangeTab = this._onChangeTab.bind(this);
    this._onVideoSubjectSelect = this._onVideoSubjectSelect.bind(this);
    this._onQuestionSubjectSelect = this._onQuestionSubjectSelect.bind(this);
    this._renderQuestionMenu = this._renderQuestionMenu.bind(this);
  }

  componentDidMount() {
    QuestionStore.addChangeListener(this._onQuestionChange);
    VideoStore.addChangeListener(this._onVideoChange);
    HomeStore.addChangeListener(this._onHomeChange);
  }

  componentWillUnmount() {
    QuestionStore.removeChangeListener(this._onQuestionChange);
    VideoStore.removeChangeListener(this._onVideoChange);
    HomeStore.removeChangeListener(this._onHomeChange);
  }

  _onQuestionChange() {
    this.setState({
      questions: QuestionStore.getAll(),
      loadingQuestions: QuestionStore.isLoading(),
      loadingMoreQuestions: QuestionStore.isLoadingMore(),
      refreshingQuestions : QuestionStore.isRefreshing(),
      questionSubjectFilter: QuestionStore.getSubjectFilter()
    });
  }

  _onVideoChange() {
    this.setState({
      videos: VideoStore.getAll(),
      loadingVideos: VideoStore.isLoading(),
      refreshingVideos: VideoStore.isRefreshing(),
      videoSubjectFilter: VideoStore.getSubjectFilter()
    });
  }

  _onQuestionEndReached() {
    // if (this.state.loadingQuestions || this.state.loadingMoreQuestions) {
    //   return;
    // }
    // var fromId = QuestionStore.getLastId();
    // QuestionActions.loadMoreQuestions(fromId, 50);
  }

  _onVideoEndReached() {
    // if (this.state.loadingVideos) {
    //   return;
    // }
    // var skip = this.state.videos.length;
    // VideoActions.loadMoreVideos(skip, 50);
  }

  _onVideoRefresh() {
    // VideoActions.refreshVideos();
  }

  _onQuestionRefresh() {
    // QuestionActions.refreshQuestions();
  }

  _onHomeChange() {
    this.setState({
      questionMenuVisible: HomeStore.getSelectedTab() != TabConstants.TAB_USER,
    });
  }

  _onChangeTab(event) {
    var tab;
    switch (event.i) {
      case 0:
      tab = TabConstants.TAB_HOME_SUMMARY
      break;
      case 1:
      tab = TabConstants.TAB_VIDEOS
      break;
      case 2:
      tab = TabConstants.TAB_QUESTIONS
      break;
      case 3:
      tab = TabConstants.TAB_USER
      break;
    }

    HomeActions.changeTab(tab);
  }

  _onVideoSubjectSelect(subject) {
    if (this.state.videoSubjectFilter == subject) {
      VideoActions.filter();
    } else {
      VideoActions.filter({'subject': subject});
    }
  }

  _onQuestionSubjectSelect(subject) {
    if (this.state.questionSubjectFilter == subject) {
      QuestionActions.filter();
    } else {
      QuestionActions.filter({'subject': subject});
    }
  }

  render() {
    LogHelper.log("HOME RENDER", {
      loadingQuestions: this.state.loadingQuestions,
      questionSubjectFilter: this.state.questionSubjectFilter,
      questions: this.state.questions && this.state.questions.length > 0 ? this.state.questions.length : 0,
      loadingVideos: this.state.loadingVideos,
      videoSubjectFilter: this.state.videoSubjectFilter,
      videos: this.state.videos && this.state.videos.length > 0 ? this.state.videos.length : 0,
      // loadingMoreQuestions: this.state.loadingMoreQuestions,
      // refreshingQuestions : this.state.refreshingQuestions,
      // refreshingVideos: this.state.refreshingVideos,
    });
    return (
      <View style={styles.layout}>
        <SearchBar menuPress={this._onMenuPress}/>
        <ScrollableTabView renderTabBar={() => <CustomTabBar/>} onChangeTab = {this._onChangeTab}>
          <HomeSummary
            tabLabel={'home'}
            style={styles.tabView}
            />
          <VideoList
            tabLabel={'videos'}
            style={styles.tabView}
            videos={this.state.videos}
            loading={this.state.loadingVideos}
            onEndReached={this._onVideoEndReached}
            onRefresh={this._onVideoRefresh}
            isRefreshing={this.state.refreshingVideos}
            onSubjectSelect={this._onVideoSubjectSelect}
            selectedSubject={this.state.videoSubjectFilter}
            showSubjectFilter={true}
            />
          <QuestionList
            tabLabel={'questions'}
            style={styles.tabView}
            questions={this.state.questions}
            loading={this.state.loadingQuestions}
            loadingMore={this.state.loadingMoreQuestions}
            onEndReached={this._onQuestionEndReached}
            onRefresh={this._onQuestionRefresh}
            isRefreshing={this.state.refreshingQuestions}
            onSubjectSelect={this._onQuestionSubjectSelect}
            selectedSubject={this.state.questionSubjectFilter}
            showSubjectFilter={true}
            />
        </ScrollableTabView>
        {this._renderQuestionMenu()}
      </View>
    );
  }

  _renderQuestionMenu() {
    if (this.state.questionMenuVisible) {
      return (<QuestionCreateMenu/>);
    }
  }
}

var styles = StyleSheet.create({
  layout:{
    backgroundColor: '#ffdf23',
    flex: 1,
  },
  tabView: {
    flex: 1,
    backgroundColor: '#f6f7f8'
  }
});

module.exports = Home;
