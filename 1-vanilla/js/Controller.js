const tag = "[Controller]";

export default class Controller {
  constructor(store, {SearchFormView}) {
    console.log(tag)
    this.store = store;

    this.SearchFormView = SearchFormView;

    this.subscribeViewEvents();
  }

  subscribeViewEvents(){
    this.SearchFormView.on('@submit', event => this.search(event));
  }

  search(event){
    console.log(tag, event, event.detail);
  }

}
