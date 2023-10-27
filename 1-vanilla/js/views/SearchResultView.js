import { on, qs } from "../helpers.js";
import View from "./View.js";

const tag = "[SearchResultView]";

export default class SearchResultView extends View {
    constructor() {
        //초기 설정
        super(qs("#search-result-view")); //이렇게 하면 this.element 에  담김

        this.template = new Template();
    }

    showResult(data = []){
        this.element.innerHTML =
          data.length > 0
            ? this.template.getList(data)
            : this.template.getEmptyMessage();
    
        super.show();
    }

    //검색 결과 초기화
    resetResult(){
        return this.element.innerHTML = '';
    }

}

class Template {
    getEmptyMessage() {
        return `
            <div class="empty-box">
            검색결과가 없습니다
            </div>
        `;
    }

    getList(data = []) {
        return `
            <ul class="result">
            ${data.map(this._getItem).join("")}
            </ul>
        `;
    }

    _getItem(data) {
        return `
            <li>
            <img src="${data.imageUrl}" alt="${data.name}"/>
            <p>${data.name}</p>
            </li>
        `;
    }
}