import { on, qs } from "../helpers.js";
import View from "./View.js";

const tag = "[SearchFormView]";
//이제 검색
//X버튼을 클릭하거나 검색어를 삭제하면 검색 결과를 삭제한다..

export default class SearchFormView extends View {
    constructor() {
        super(qs("#search-form-view")); //이렇게 하면 this.element 에 담김

        this.inputElement = qs("[type=text]", this.element);
        this.resetElement = qs("[type=reset]", this.element);

        this.showResetButton(false);
        this.bindEvent();
    }

    showResetButton(visible = true){
        this.resetElement.style.display = visible ? "block" : "none";
    }

    //serch form view 실행되면서 실행할 함수
    bindEvent(){
        on(this.inputElement, "keyup", () => this.handleKeyup());
        on(this.element, "submit", event => this.handleSubmit(event));
        on(this.resetElement, "click", () => this.handleSearchReset());
    }

    handleKeyup() {
        // console.log(tag, "handleKeyup", this.inputElement.value);
        const { value } = this.inputElement;
        this.showResetButton(value.length > 0)
        
    }

    handleSubmit(event){
        event.preventDefault();
        console.log(tag, 'handleSubmit');
        const { value } = this.inputElement;

        this.emit("@submit", { value });
    }

    handleSearchReset(){
        console.log(tag, 'handleSearchReset');

        this.emit("@reset"); //외부에 알려주는 역할
    }
}