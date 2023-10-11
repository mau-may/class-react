const tag = "[Controller]";

export default class Controller {
  constructor(store, 
    { 
      searchFormView,
      searchResultView
    }
   ) {
    console.log(tag)
    this.store = store;

    this.SearchFormView = searchFormView;
    
    this.SearchReusltView = searchResultView;

    this.subscribeViewEvents();
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

    //검색 결과 처리한 값으로 result view 에 넘겨줌
    if(this.store.searchKeyword.length > 0){
      return this.SearchReusltView.showResult(this.store.searchResult);
    }


  }

  //초기화
  searchReset(){
    this.SearchFormView.showResetButton(false);
    this.SearchReusltView.resetResult();
  }

}
