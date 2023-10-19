import { Tab } from "./views/TabView.js";

const tag = "[store]";
//MVC 패턴의 Model 역할
export default class Store {
  constructor(storage) {
    console.log(tag);
    if (!storage) throw "no storage";

    this.storage = storage;
  
    this.searchKeyword = "";
    this.searchResult = [];
    this.selectedTab = Tab.KEYWORD;
  }

  search(keyword) {
    this.searchKeyword = keyword;
    const dataList = this.storage.productData; //변수로 지정

    //검색 결과 filter 처리
    this.searchResult = keyword ? dataList.filter(item => 
      item.name.toLowerCase().includes(keyword.toLowerCase())
      ) : [];

    
    this.addHistory(keyword);
  }

  addHistory(keyword = "") {
    keyword = keyword.trim();
    if (!keyword) {
      return;
    }

    const hasHistory = this.storage.historyData.some(
      (history) => history.keyword === keyword
    );

    const date = new Date();
    this.storage.historyData.push({ keyword, date });
    this.storage.historyData = this.storage.historyData.sort(this._sortHistory);
  }



}
