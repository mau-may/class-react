const tag = "[Controller]";

export default class Controller {
  constructor(store, 
    { 
      searchFormView,
      searchResultView,
      tabView
    }
   ) {
    console.log(tag)
    this.store = store;

    this.SearchFormView = searchFormView;
    this.SearchReusltView = searchResultView;
    this.tabView = tabView;

    this.subscribeViewEvents();
    this.render(); //기본 실행
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
    this.tabView.show();

  }

  //초기화
  searchReset(){
    this.store.searchKeyword = "";
    this.store.searchResult = [];
    this.SearchFormView.showResetButton(false);
    this.SearchReusltView.resetResult();
  }

}
