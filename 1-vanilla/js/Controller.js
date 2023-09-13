const tag = "[Controller]";

export default class Controller {
  constructor(store, { searchFormView }) {
    console.log(tag)
    this.store = store;

    this.SearchFormView = searchFormView;

    this.subscribeViewEvents();
  }

  subscribeViewEvents(){
    this.SearchFormView.on('@submit', event => this.search(event.detail.value));
  }

  search(keyward){
    console.log(tag, keyward);
  }

}
