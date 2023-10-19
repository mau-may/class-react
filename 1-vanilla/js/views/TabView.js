import { on, qs, qsAll } from "../helpers.js";
import View from "./View.js";

const tag = "[TabView]";

export const Tab = {
  KEYWORD: "KEYWORD",
  HISTORY: "HISTORY",
};

const TabLabel = {
  [Tab.KEYWORD]: "추천 검색어",
  [Tab.HISTORY]: "최근 검색어",
};

//어디선가 사용해야하므로 export로 빼줌
export default class TabView extends View {
    constructor() {
      console.log(tag);
      //초기 설정
      super(qs("#tab-view")); //이렇게 하면 this.element 에  담김

      this.template = new Template();

      this.bindEvent();


      //Todo: 이벤트 바인딩 필요 (클릭 함수 실행!)
      // this.bindEvent();
    }

    show(selectedTab) {
      this.element.innerHTML = this.template.getTabList();

      qsAll("li", this.element).forEach(li => {
        li.className = li.dataset.tab === selectedTab ? "active" : "";
      });

      super.show();
    }

    hide() {
      this.element.style.display = "none";
    }

    bindEvent(){
      on(this.element, "click", event => this.tabClick(event)); //li 탭 속성이 담겨야하므로 event로 담음
    }

    tabClick(event){
      const tabValue = event.target.dataset.tab;

      this.show(tabValue);

      this.emit("@tabclick", tabValue);
    }
}

class Template {

  getTabList(){
    return `
      <ul class="tabs">
        ${Object.values(Tab)
            .map(key => ({ key, label: TabLabel[key] }))
            .map(this._getTab)
            .join("")} 
      </ul>
    `;
  }

  _getTab({key, label}){
    return `<li data-tab="${key}">${label}</li>`
  }

}