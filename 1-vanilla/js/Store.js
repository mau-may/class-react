import { Tab } from "./views/TabView.js";
import { createNextId } from "./helpers.js";

const tag = "[store]";
//MVC 패턴의 Model 역할
export default class Store {
  constructor(storage) {
    if (!storage) throw "no storage";

    this.storage = storage;
  
    this.searchKeyword = "";
    this.removeKeyword = "";
    this.searchResult = [];
    this.selectedTab = Tab.KEYWORD;
  }

  search(keyword) {
    this.searchKeyword = keyword;
    const dataList = this.storage.productData; //변수로 지정

    //검색 결과 filter 처리
    this.searchResult = keyword ? dataList.filter(
      item => 
      item.name.toLowerCase().includes(keyword.toLowerCase())) 
      : [];

    
    this.addHistory(keyword);
  }

  remove(keyword) {
    this.delHistory(keyword);
  }

  addHistory(keyword = "") {
    keyword = keyword.trim();
    if (!keyword) {
      return;
    }

    let id = createNextId(this.storage.historyData);

    const hasHistory = this.storage.historyData.some((history) => 
      history.keyword === keyword
    );

    const date = new Date();
    this.storage.historyData.push({ id, keyword, date });
    this.storage.historyData = this.storage.historyData.sort(this._sortHistory);
  }

  delHistory(keyword = ""){
    this.storage.historyData = this.storage.historyData.filter(
      (history) => history.keyword !== keyword
    );
  };

  _sortHistory(history1, history2){
    return history2.date - history1.date;
  }

  getKeywordList(){
    return this.storage.keywordData;
  }

  getHistoryList(){
    return this.storage.historyData.sort(this._sortHistory);
  }


}
