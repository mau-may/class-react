import { on, qs, qsAll } from "../helpers.js";
import View from "./View.js";

//어디선가 사용해야하므로 export로 빼줌
export default class KeywordListView extends View {
    constructor() {
      //초기 설정
      super(qs("#keyword-list-view")); //이렇게 하면 this.element 에  담김

      this.template = new Template();
    }

    show(data = []) {
      this.element.innerHTML = 
      data.length > 0 
      ? this.template.getList(data) 
      : this.template.getEmptyMessage();

      super.show();
    }

    hide() {
      super.hide();
    }

}

class Template {
  getEmptyMessage(){
    return `<div class="empty-box">추천 검색어가 없습니다.</div>`;
  }
  
  getList(data = []){
    return `
      <ul class="list">
        ${data.map(this._getItem).join("")}
      </ul>
    `;
  }

  _getItem({id, keyword}){
    return `<li data-keyword="${keyword}">
      <span class="number">${id}</span>
      ${keyword}
    </li>`;
  }
}