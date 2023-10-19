import { on, qs, qsAll } from "../helpers.js";
import View from "./View.js";

//어디선가 사용해야하므로 export로 빼줌
export default class HistoryListView extends View {
    constructor() {
      //초기 설정
      super(qs("#tab-view")); //이렇게 하면 this.element 에  담김
    }
}