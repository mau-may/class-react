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
    this.tabChange(); //탭 클릭 후 화면 변경
  }

  subscribeViewEvents(){
    this.SearchFormView.on('@submit', event => 
      this.search(event.detail.value)
    ).on('@reset', () => this.searchReset());
  }

  search(keyword){
    console.log('search+:',keyword);
    this.store.search(keyword);

    this.render(); //결과 값으로 render
  }

  render(){
    console.log('render',this.store.searchKeyword);

    //검색 결과 처리한 값으로 result view 에 넘겨줌
    if(this.store.searchKeyword.length > 0){
      this.SearchReusltView.showResult(this.store.searchResult);
      this.tabView.hide();
      return;
    }

    this.searchReset();
    this.tabView.show(this.store.selectedTab);
  }

  //초기화
  searchReset(){
    this.store.searchKeyword = "";
    this.store.searchResult = [];
    this.SearchFormView.showResetButton(false);
    this.SearchReusltView.resetResult();
    
    this.tabView.show(); //tab view show
  }

  tabChange(){
    //tab click 시 실행 함수
    this.tabView.on('@tabclick', event => 
      this.change(event.detail)
    )
  }

  change(tab){
    console.log(tab);

  }

}
