import * as types from './mutation-types';

const mutations = {
  [types.SET_SINGER](state, singer) {
    state.singer = singer;
  },
  [types.SET_PLAYING_STATE](state, flag) {
    state.playing = flag; 
  },
  [types.SET_FULL_SCREEN](state, flag) {
    state.fullScreen = flag;
  },
  [types.SET_PLAYLIST](state, list) {
    state.playlist = list;
  },
  [types.SET_SEQUENCE_LIST](state, list) {
    state.sequenceList = list;
  },
  [types.SET_PLAY_MODE](state, mode) {
    state.mode = mode;
  },
  [types.SET_CURRENT_INDEX](state, index) {
    state.currentIndex = index;
  },
  [types.SET_VKEY](state, vkey) {
    state.vkey = vkey;
  },
  [types.SET_DISC](state, disc) {
    state.disc = disc;
  },
  [types.SET_TOP_LIST](state, topList) {
    state.topList = topList;
  },
  [types.SET_SEARCH_HISTORY](state, history) {
    state.searchHistory = history;
  },
  [types.SET_PLAY_HISTORY](state, history) {
    state.playHistory = history;
  },
  [types.SET_FAVORITE_LIST](state, list) {
    state.favoriteList = list;
  },
  setLikeSet(state,list){
	  state.likeSet = {};
	  
	  list.forEach((item,index)=>{
		  if(item.isLike){
			   state.likeSet[item.id] = true;
		  }else{
			  state.likeSet[item.id] = false;
		  }
	  });
  },
  likeSong(state,songId){
    state.likeSet[songId] = true;
  },
  disLikeSong(state,songId){
  	  state.likeSet[songId] = false;
  }
  
};

export default mutations;
