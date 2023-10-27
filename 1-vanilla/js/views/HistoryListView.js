import { qs, delegate, formatRelativeDate } from "../helpers.js";
import View from "./View.js";

//어디선가 사용해야하므로 export로 빼줌
export default class HistoryListView extends View {
    constructor() {
      //초기 설정
      super(qs("#history-list-view")); //이렇게 하면 this.element 에  담김

      this.template = new Template();

      this.bindEvent();
    }

    show(data = []) {
      this.element.innerHTML = 
      data.legnth > 0 
      ? this.template.getEmptyMessage()
      : this.template.getList(data);

      super.show();
    }

    hide() {
      super.hide();
    }

    bindEvent(){
      delegate(this.element, "click", ".btn-remove", event => this.searchDelete(event));
    }

    searchDelete(e){
      const value = e.target.dataset.search;
      console.log(value);

      this.emit("@remove", value);
    }
}

class Template {
  getEmptyMessage(){
    return `<div class="empty-box">최근 검색어가 없습니다.</div>`;
  }

  getList(data = []){
    return `
      <ul class="list">
        ${data.map(this._getItem).join("")}
      </ul>
    `;
  }

  _getItem({id, keyword, date}){
    let setDate = formatRelativeDate(date);
    
    return `
    <li class="list">
      ${keyword}
      <span class="date">${setDate}</span>
      <span class="btn-remove" data-search="${keyword}"></span>
    </li>
    `;
  }

}