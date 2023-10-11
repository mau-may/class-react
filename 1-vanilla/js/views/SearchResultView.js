import { on, qs } from "../helpers.js";
import View from "./View.js";

const tag = "[SearchResultView]";

export default class SearchResultView extends View {
    constructor() {
        //초기 설정
        super(qs("#search-result-view")); //이렇게 하면 this.element 에  담김
        this.bindEvent();
    }

    //serch form view 실행되면서 실행할 함수
    bindEvent(){
        // on(this.element, "submit", event => this.showResult(data));
    }

    showResult(data = []){
        let resultHtml;

        if(!data || data.length == 0){
            resultHtml = `<div class="empty-box">검색 결과가 없습니다.</div>`;
        } else {
            resultHtml = `<ul class="result">`
        }
        

        const listItems = data?.map((data) => {
            resultHtml += `
                <li>
                    <img src="${data.imageUrl}" />
                    <p>${data.name}</p>
                </li>
            `;
        });
        resultHtml += `</ul>`;

        return this.element.innerHTML = resultHtml;
    }

    //검색 결과 초기화
    resetResult(){
        return this.element.innerHTML = '';
    }

}