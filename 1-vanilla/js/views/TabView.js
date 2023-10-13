import { on, qs } from "../helpers.js";
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

export default class TabView extends View {
    constructor() {
      console.log(tag);
      //초기 설정
      super(qs("#tab-view")); //이렇게 하면 this.element 에  담김

      this.template = new Template();
    }

    show() {
      console.log('show!');
      this.element.innerHTML = this.template.getTabList();

      super.show();
    }

    hide() {
      this.element.style.display = "none";
    }

}

class Template {
  _getTab({key, label}){
    return `<li data-tab="${key}">${label}</li>`
  }

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

}