import { Tab } from "./views/TabView.js";

const tag = "[Controller]";

export default class Controller {
  constructor(store, 
    { 
      searchFormView,
      searchResultView,
      tabView,
      historyListView,
      keywordListView
    }
   ) {
    this.store = store;

    this.SearchFormView = searchFormView;
    this.SearchReusltView = searchResultView;
    this.tabView = tabView;
    this.HistoryListView = historyListView;
    this.KeywordListView = keywordListView;

    this.subscribeViewEvents();
    this.render(); //기본 실행
  }

  subscribeViewEvents(){
    this.SearchFormView.on('@submit', event => 
      this.search(event.detail.value)
    ).on('@reset', () => this.searchReset());

    //tab click 시 실행 함수
    this.tabView.on('@tabclick', event => 
      this.change(event.detail)
    );

    this.HistoryListView.on('@remove', event => 
      this.remove(event.detail)
    );
  }

  search(keyword){
    this.store.search(keyword);

    this.render(); //결과 값으로 render
  }

  render(){
    //검색 결과 처리한 값으로 result view 에 넘겨줌
    if(this.store.searchKeyword.length > 0){
      this.renderSearchResult();
      return;
    }

    this.tabView.show(this.store.selectedTab);
    this.tabControl();
    this.searchReset();
  }

  tabControl(){
    if(this.store.selectedTab === Tab.KEYWORD){
      this.KeywordListView.show(this.store.getKeywordList());
      this.HistoryListView.hide();
    } else if(this.store.selectedTab === Tab.HISTORY){
      this.HistoryListView.show(this.store.getHistoryList());
      this.KeywordListView.hide();
    } else {
      throw "사용할 수 없는 탭입니다.";
    }
  }

  renderSearchResult(){
    this.tabView.hide();
    this.KeywordListView.hide();
    this.HistoryListView.hide();

    this.SearchReusltView.showResult(this.store.searchResult);
  }

  //초기화
  searchReset(){
    this.store.searchKeyword = "";
    this.store.searchResult = [];
    this.SearchFormView.showResetButton(false);
    this.SearchReusltView.resetResult();

    this.tabView.show(this.store.selectedTab);
    this.tabControl();
  }

  change(tab){
    this.store.selectedTab = tab;
    this.render();
  }

  remove(keyword){
    this.store.remove(keyword);
    this.render();
  }

}