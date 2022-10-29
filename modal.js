const TEMPLATE = `
    <style>
        .modal {
            display: none;
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            z-index: 1;
            padding-top: 100px;
            background-color: rgba(0, 0, 0, 0.7);
        }

        .modal > div {
            position: relative;
            top: 20%;
            left: 50%;
            transform: translate(-50%);
            background-color: #fff;
            border: 1px solid #888;
            border-radius: 10px;
            padding: 25px;
            width: 50%;
            min-height: 100px;
            max-height: 50%;
            overflow-y: auto;
        }

        .modal-actions {
            text-align: right;
        }

        button {
            margin: 0 10px;
        }
    </style>
    <div class="modal">
        <div class="modal-content">
            <div class="modal-header">
            </div>
            <div class="modal-actions">
            </div>
        </div>
    </div>
`;

class CustomModal extends HTMLElement {
    constructor() {
        super();

        this.attachShadow({ mode: 'open' });
        this.shadowRoot.innerHTML = TEMPLATE;
    }

    connectedCallback() {
        this._modal = this.shadowRoot.querySelector('.modal');
        this._showModal();
        this._render();
    }

    disconnectedCallback() {
        this.leftButton.removeEventListener('click', this._onClickHandleLeft);
        this.rightButton.removeEventListener('click', this._onClickHandleRight);
    }

    _showModal() {
        this._modalVisible =true;
        this._modal.style.display = 'block';
    }

    _hideModal() {
        this._modalVisible = false;
        this._modal.style.display = 'none';
    }

    _onClickHandleLeft() {
        this._hideModal();
    }

    _onClickHandleRight() {
        this._hideModal();
    }

    _render() {
        const text = this.shadowRoot.querySelector('.modal-header');

        const content = document.createElement('p');
        content.textContent = this.content;

        text.appendChild(content);

        const actions = this.shadowRoot.querySelector('.modal-actions');


        if (this.leftText) {
            this.leftButton = document.createElement('button');
            this.leftButton.textContent = this.leftText;
            this.leftButton.addEventListener('click', this._onClickHandleLeft.bind(this));
            
            actions.appendChild(this.leftButton);
        }

        if (this.rightText) {
            this.rightButton = document.createElement('button');
            this.rightButton.textContent = this.rightText;
            this.rightButton.addEventListener('click', this._onClickHandleRight.bind(this));
            
            actions.appendChild(this.rightButton);
        }
    }
}

customElements.define('custom-modal', CustomModal);