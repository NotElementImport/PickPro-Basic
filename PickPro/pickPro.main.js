const HEAD = 'head';
const BODY = 'body';

class PickUI {
    constructor(Interface) {
        /**
         * @type {PickPro}
         */
        this.Interface = Interface;

        this.threads = [

        ];
    }

    createObject(tag='div') {
        return this.object(
            document.createElement(tag)
        );
    }

    static createObject(tag) {
        return new PickUI().createObject(tag);
    }

    static object(object) {
        return new PickUI().object(object);
    }

    /**
     * @param {HTMLElement} object 
     */
    object(object, ...arg) {
        return {
            display : () => {
                if(this.Interface) {
                    this.Interface.m_root_for_adding_object.appendChild(
                        object
                    );
                }
                else {
                    document.body.appendChild(
                        object
                    );
                }
                return this.object(object);
            },
            result : () => {
                if(arg.length > 0) {
                    return arg[0];
                }
                else {
                    return null;
                }
            },
            getAttribute : (name) => {
                let result = object.getAttribute(name);

                return this.object(object, result);
            },
            setAttribute : (name, value) => {
                object.setAttribute(name, value);

                return this.object(object, value);
            },
            querySelect : (text) => {
                let result = object.querySelector(text);

                return this.object(object, result);
            },
            beALastChildren : () => {
                let child = object.children[object.children.length - 1];
                
                return this.object(child);
            },
            thread : (func) => {
                if(func)
                    func(object);
                return this.object(object);
            },
            callback : (func, async = false) => {
                if(arg.length > 0) {
                    if(async) {
                        func(arg[0]);
                        return this.object(object);
                    }
                    else
                        return this.object(object, func(arg[0]));
                }
                else {
                    console.error('Last funcs nont send arguments. Is empty');
                    return this.object(object);
                }
            },
            on : (event, callback) => {
                object.addEventListener(event, callback);

                return this.object(object);
            },
            off : (event, callback) => {
                object.removeEventListener(event, callback);

                return this.object(object);
            },
            hidden : (value) => {
                object.hidden = value;

                return this.object(object);
            },
            clearContent : () => {
                object.innerHTML = "";

                return this.object(object);
            },
            putChild : (element) => {
                if(typeof(element) == 'object') {
                    if(Array.isArray(element)) {
                        let instance = this;
                        element.forEach(elementInner => {
                            return instance.object(object).
                                putChild(elementInner);
                        });
                    }
                    else {
                        object.appendChild(element);
                    }
                }
                else if(typeof(element) == 'function') {
                    object.appendChild(element());
                }
                else {
                    object.append(element);
                }

                return this.object(object);
            },
            addClass : (className = "") => {
                object.classList.add(className.split(' '));

                return this.object(object);
            },
            addStyle : (style = {}) => {
                for(let [key, value] of Object.entries(style)) {
                    key = key.replace('-webkit', 'webkit');
                    
                    let keyMatch = key.match(/-[a-z]/gm);
                    if(keyMatch) {
                        keyMatch.forEach(item => {
                            let newVal = item.substring(1).toUpperCase();
                            key = key.replace(item, newVal);
                        });
                    }

                    object.style[key] = value;
                }

                return this.object(object);
            },
            placeAfter : (element) => {
                element.after(object);

                return this.object(object);
            },
            placeBefore : (element) => {
                element.before(object);

                return this.object(object);
            },
            self : () => {
                return object;
            }
        }
    }

    drawHead() {}
    drawContent() {}
    drawFooter() {}
}

class PickFileUI extends PickUI {
    constructor (Interface) {
        super(Interface);
    }

    drawFooter() {
       
    }
}

class PickWindow {
    constructor() {
        this.js_window = null;
    }

    addObject(object, position = 'body') {
        if(this.js_window) {
            switch(position) {
                case 'head':
                    this.js_window.document.head.appendChild(object);
                    break;
                case 'body':
                    this.js_window.document.body.appendChild(object);
                    break;
            }
        }
    }

    forceClose() {
        if(this.js_window) // validate
            this.js_window.close();
    }

    show() {
        if(this.js_window == null || this.js_window.closed) // validate
            this.js_window = window.open('', 'Pick', 'width=640,height=500');
    }

    onOpen(callback) {
        this.js_window.addEventListener('load', (event) => {
            if(callback) // validate
                callback(event);
        });
    }

    onClose(callback) {
        this.js_window.addEventListener('unload', (event) => {
            if(callback) // validate
                callback(event);
        });
    }
}

class PickPro {
    constructor() {
        this.WINDOW = new PickWindow();
        this.m_root_for_adding_object = null;
    }


}