class CustomModal extends HTMLElement {
    constructor(content, leftButton, rightButton) {
        super();
        this.content = content;
        this.leftButton = leftButton;
        this.rightButton = rightButton;
    }

    connectedCallback() {
        this.content = this.getAttribute("content");
        this.leftButton = this.getAttribute("leftButton");
        this.rightButton = this.getAttribute("rightButton");
        this.render();
    }

    render() {
        this.innerHTML = `
            <div>
                <p>${this.content}</p>
                <button>${this.leftButton}</button>
                <button>${this.rightButton}</button>
            </div>
        `;
    }
}

customElements.define('custom-modal', CustomModal);