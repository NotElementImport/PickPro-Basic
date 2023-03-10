let Settings = {
    PickPro : {
        defaultCssDir : '',
        addFile : {
            href : '',
            label : 'Add file'
        }
    }
};

let PickPro = function (selectElement) {
    /**
     * @type {HTMLSelectElement}
     */
    this.pickSelect = selectElement;
    
    /**
     * @type {Window | null} 
     */
    this.m_window = null; 
    this.viewSettings = {
        mode : 'file',
        pathToCss : '/',
        title : 'PickPro v1',
        alwaysFilter : '',
        directoryAll : 'All files'
    };

    this.returnValue = {
        name : null,
        value : null,
        label : null,
    };

    this.onaddfileend = null;
    this.onreturn = null;

    this.m_elements = {
        nav : {
            /**
             * @type { HTMLElement }
             */
            root : null,
            /**
             * @type { HTMLElement }
             */
            footer : null,
            /**
             * @type { HTMLInputElement }
             */
            search : null
        },
        empty : null,
        options : [],
        /** 
        * @type { HTMLElement }
        */
        pickRoot : null
    };

    this.m_prompt = '';
    this.m_keep_selectedIndex = {
        index : -1,
        value : 0
    };

    this.addPrompt = (Label) => {
        this.m_prompt = Label;
        this.virtualTable.items.push(Label, '', null);
    }

    this.virtualTable = {
        createTable : (items = {}) => {
            this.pickSelect = document.createElement('select');

            for(const [key, value] of Object.entries(items)) {
                this.virtualTable.items.push(key, value[0], value[1]);
            }
        },
        items : {
            push : (label, value, name) => {
                if(this.pickSelect == null)
                    return;

                let option = document.createElement('option');
                option.setAttribute('aria-label', label);
                option.setAttribute('value', value);
                option.innerHTML = name;

                this.pickSelect.appendChild(option);
            },
            assign : (items) => {
                for(const [key, value] of Object.entries(items)) {
                    this.virtualTable.items.push(key, value[0], value[1]);
                }
            },
            popByValue : (value) => {
                let end = false;
                this.pickSelect.querySelectorAll('option').forEach(element => {
                    if(end)
                        return;

                    if(element.value == value) {
                        element.remove();
                        end = true;
                    }
                });
            },
            clean : () => {
                this.pickSelect.innerHTML = "";
                if(this.m_prompt != '')
                    this.addPrompt(this.m_prompt);
            },
            selectByValue : (value) => {
                value = value.trim();
                this.pickSelect.selectedIndex = 0;
                let allOptions = this.pickSelect.querySelectorAll('option');
                for(let i = 0; i < allOptions.length; i++) {
                    if(allOptions[i].value.trim() == value) {
                        this.pickSelect.selectedIndex = i;
                        break;
                    }
                }

                this.returnValue.value = this.pickSelect.options[this.pickSelect.selectedIndex].value;
                this.returnValue.name = this.pickSelect.options[this.pickSelect.selectedIndex].innerHTML;
                this.returnValue.label = this.pickSelect.options[this.pickSelect.selectedIndex].getAttribute('aria-label');
            },
            select : (index = null) => {
                this.pickSelect.selectedIndex = 0;
                if(index == null) {
                    if(this.m_keep_selectedIndex.index != -1) {
                        if(this.pickSelect.options[this.m_keep_selectedIndex.index].value == this.m_keep_selectedIndex.value) {
                            this.pickSelect.selectedIndex = this.m_keep_selectedIndex.index;
                        }
                        else {
                            let allOptions = this.pickSelect.querySelectorAll('option');
                            for(let i = 0; i < allOptions.length; i++) {
                                if(allOptions[i].value == this.m_keep_selectedIndex.value) {
                                    this.pickSelect.selectedIndex = i;
                                    break;
                                }
                            }
                        }
                    }
                }
                else {
                    this.pickSelect.selectedIndex = index;
                }

                this.returnValue.value = this.pickSelect.options[this.pickSelect.selectedIndex].value;
                this.returnValue.name = this.pickSelect.options[this.pickSelect.selectedIndex].innerHTML;
                this.returnValue.label = this.pickSelect.options[this.pickSelect.selectedIndex].getAttribute('aria-label');
            }
        }
    };

    this.open = () => {
        if(this.m_window == null || this.m_window.closed) {
            this.m_window = window.open('', 'PickPro', 'width=600,height=480,toolbar=no,menubar=no,resizable=yes');
            this.m_window.document.title = this.viewSettings.title;
            this.m_window.document.body.innerHTML = "";

            let link = document.createElement('link');
            link.rel = 'stylesheet';
            link.type = 'text/css';
            link.href = `${this.viewSettings.pathToCss}/pickPro.css`;

            this.m_window.document.head.appendChild(
                link
            );

            this.m_build_by_mode();
        }
    };

    this.m_select_by_value = (value) => {
        for(let i = 0; i < this.pickSelect.options.length; i++) {
            if(this.pickSelect.options[i].value == value) {
                this.pickSelect.selectedIndex = i;

                this.returnValue.value = value;
                this.returnValue.name = this.pickSelect.options[i].innerHTML;
                this.returnValue.label = this.pickSelect.options[i].getAttribute('aria-label');

                if(this.onreturn != null)
                    this.onreturn();
                break;
            }
        }

        this.m_window.close();
    };

    this.m_check_whats_is_filter = () => {
        let docBlank = this.m_window.document;

        if(this.viewSettings.alwaysFilter.startsWith('/')) {
            if(this.viewSettings.alwaysFilter == '/') {
                let directory = docBlank.createElement('ul');
    
                let element = docBlank.createElement('span');
                element.innerHTML = "&#128448";
    
                directory.appendChild(element);

                element = docBlank.createElement('span');
                element.innerHTML = this.viewSettings.directoryAll;
    
                directory.appendChild(element);
    
                docBlank.body.appendChild(directory);
            }
            else {
                let directory = docBlank.createElement('ul');
                let splitData = this.viewSettings.alwaysFilter.split('/');
    
                let element = docBlank.createElement('span');
                element.innerHTML = "&#128448";
    
                directory.appendChild(element);
    
                for(let i = 1; i < splitData.length; i++)
                {
                    let element = docBlank.createElement('span');
                    element.innerHTML = splitData[i];
    
                    directory.appendChild(element);
                }
    
                docBlank.body.appendChild(directory);
            }
        }
        else if(this.viewSettings.alwaysFilter.startsWith('@')) {
            let directory = docBlank.createElement('ul');

            let element = docBlank.createElement('span');
            element.innerHTML = "&#127760;";

            directory.appendChild(element);

            element = docBlank.createElement('span');
            element.innerHTML = this.viewSettings.alwaysFilter.substring(1, this.viewSettings.alwaysFilter.length);

            directory.appendChild(element);

            docBlank.body.appendChild(directory);
        }
    }

    this.m_build_by_mode = () => {
        this.m_elements.nav.root = this.m_window.document.createElement('nav');
        this.m_window.document.body.appendChild(
            this.m_elements.nav.root
        );

        this.m_elements.nav.footer = this.m_window.document.createElement('footer');
        this.m_window.document.body.appendChild(
            this.m_elements.nav.footer
        );

        this.m_elements.options = [];

        this.m_elements.nav.search = this.m_window.document.createElement('input');
        this.m_elements.nav.search.type = 'search';
        this.m_elements.nav.search.addEventListener('keyup', event => {
            this.m_filter();
        });
        this.m_elements.nav.root.appendChild(this.m_elements.nav.search);

        if(Settings.PickPro.addFile.href != '') {
            this.m_addFile();
        }

        this.m_check_whats_is_filter();

        switch(this.viewSettings.mode) {
            case 'file':
                this.m_mode_file();
                break;
            case 'image':
                this.m_mode_image();
                break;
        }
    };

    this.clearContent = () => {
        if(this.m_window != null && this.m_window.closed == false)
        {
            if(this.m_elements.nav.footer)
            this.m_elements.nav.footer.innerHTML = '';

            if(this.m_elements.empty)
                this.m_elements.empty.remove();

            this.m_elements.pickRoot.innerHTML = 'Loading...';
        }
    }
    
    this.reloadData = () => {
        if(this.m_window != null && this.m_window.closed == false)
        {
            this.m_elements.pickRoot.innerHTML = '';

            switch(this.viewSettings.mode) {
                case 'file':
                    this.m_mode_file();
                    break;
                case 'image':
                    this.m_mode_image();
                    break;
            }
        }
    }

    this.m_addFile = () => {
        let addFileButton = document.createElement('button');
        addFileButton.innerText = Settings.PickPro.addFile.label;

        addFileButton.classList.add(['add-file']);
        addFileButton.addEventListener('click', () => {
            let dir = '';
            if(this.viewSettings.alwaysFilter.startsWith('/')) {
                dir = '/?folder='+this.viewSettings.alwaysFilter.substring(1, this.viewSettings.alwaysFilter.length);
            }

            let winAddFile = window.open(Settings.PickPro.addFile.href+dir, 'PickAddFile', 'width=600,height=480,toolbar=no,menubar=no,resizable=yes');
            
            winAddFile.onunload = () => {
                if(this.onaddfileend != null) {
                    this.onaddfileend();
                }
            };
        });

        this.m_elements.nav.root.appendChild(addFileButton);
    };

    this.m_filter = () => {
        let alwaysFilter = this.viewSettings.alwaysFilter;
        if(alwaysFilter.startsWith('@')) {
            alwaysFilter = alwaysFilter.substring(1, alwaysFilter.length);
        }

        let searchInput = this.m_elements.nav.search;
        this.m_elements.options.forEach(
            /**
             * @param {HTMLElement} element 
             */
            element => {
            if(element.getAttribute('value') == '' || (element.innerHTML.includes(searchInput.value) || searchInput.value == '' || element.getAttribute('alt').includes(searchInput.value)) && (this.viewSettings.alwaysFilter == '' ? true : element.getAttribute('alt').includes(alwaysFilter)))
                element.removeAttribute('hidden');
            else
                element.setAttribute('hidden', '');
        });
    };

    this.m_mode_file = () => {
        let docBlank = this.m_window.document;
        this.m_elements.pickRoot = docBlank.createElement('div');
        this.m_elements.pickRoot.classList.add(['fileRoot']);

        docBlank.body.appendChild(this.m_elements.pickRoot);

        this.pickSelect.querySelectorAll('option').forEach(element => {
            let optionVirtual = docBlank.createElement('element');
            this.m_elements.options.push(optionVirtual);

            optionVirtual.innerHTML = element.getAttribute('aria-label');
            optionVirtual.setAttribute('value', element.getAttribute('value'));
            optionVirtual.setAttribute('alt', element.innerHTML);

            optionVirtual.addEventListener('click', element => {
                this.m_select_by_value(optionVirtual.getAttribute('value'));
            });

            this.m_elements.pickRoot.appendChild(optionVirtual);
        });

        let emptyOption = docBlank.createElement('div');
        emptyOption.classList.add('file-empty');

        this.m_elements.pickRoot.appendChild(emptyOption);

        this.m_filter();
    };

    this.m_mode_image = () => {
        let docBlank = this.m_window.document;
        this.m_elements.pickRoot = docBlank.createElement('div');
        this.m_elements.pickRoot.classList.add(['imageRoot']);

        docBlank.body.appendChild(this.m_elements.pickRoot);

        this.pickSelect.querySelectorAll('option').forEach(element => {
            let optionVirtual = docBlank.createElement('element');
            this.m_elements.options.push(optionVirtual);
            optionVirtual.setAttribute('alt', element.innerHTML);

            if(element.getAttribute('value') != '') {
                let img = docBlank.createElement('img');
                img.src = element.innerHTML;
    
                img.onerror = () => {
                    let errorDiv = docBlank.createElement('div');
                    img.before(errorDiv);
                    img.remove();
    
                    errorDiv.innerHTML = 'preview <br> not found'
    
                    errorDiv.classList.add(['img']);
                }
    
                optionVirtual.appendChild(img);
            }

            let text = docBlank.createElement('div');
            text.innerHTML = element.getAttribute('aria-label');

            optionVirtual.appendChild(text);

            optionVirtual.setAttribute('value', element.getAttribute('value'));

            optionVirtual.addEventListener('click', element => {
                this.m_select_by_value(optionVirtual.getAttribute('value'));
            });

            this.m_elements.pickRoot.appendChild(optionVirtual);
        });

        let empty = docBlank.createElement('div');
        empty.classList.add(['empty-footer']);

        let changeInput = () => {
            let val = sizeOf.value;
            this.m_elements.pickRoot.style.gridAutoRows = `calc(100vw / ${val})`;
            this.m_elements.pickRoot.style.gridTemplateColumns = `repeat(${val}, 1fr)`;
            this.m_elements.pickRoot.style.fontSize = `calc(10vw / ${val})`;
        }

        let sizeOf = docBlank.createElement('input');
        sizeOf.setAttribute('as-size', '');
        sizeOf.type = 'range'
        sizeOf.min = 3;
        sizeOf.max = 8;
        sizeOf.value = 5;

        sizeOf.addEventListener('input', element => {
            changeInput();
        });

        changeInput();

        this.m_elements.nav.footer.appendChild(sizeOf);

        this.m_elements.pickRoot.after(empty);
        this.m_elements.empty = empty;
        this.m_filter();
    };
};

window.addEventListener('load', () => {
    document.querySelectorAll('input[type=pick-on-server]').forEach(element=>{
        let pickObject = new PickPro();
        pickObject.virtualTable.createTable();

        let init = false;

        let prompt = element.getAttribute('prompt');
        if(prompt)
            pickObject.addPrompt(prompt);

        window.addEventListener('focus', () => {
            pickObject.m_keep_selectedIndex.index = pickObject.pickSelect.selectedIndex;
            pickObject.m_keep_selectedIndex.value = pickObject.pickSelect.options[pickObject.pickSelect.selectedIndex].value;
            
            ajaxLogic();
        });
        pickObject.onaddfileend = () => {
            pickObject.m_keep_selectedIndex.index = pickObject.pickSelect.selectedIndex;
            pickObject.m_keep_selectedIndex.value = pickObject.pickSelect.options[pickObject.pickSelect.selectedIndex].value;

            pickObject.clearContent();

            ajaxLogic();
        };

        let nameInput = element.getAttribute('name');
        if(nameInput)
            pickObject.pickSelect.name = nameInput;

        pickObject.viewSettings.pathToCss = location.origin + (Settings.PickPro.defaultCssDir == '' ? '' : '/'+Settings.PickPro.defaultCssDir);

        let disabled = true;
        let error = false;
        let value = element.getAttribute('value');

        let alwaysFilter = element.getAttribute('filter');
        if(alwaysFilter) 
            pickObject.viewSettings.alwaysFilter = alwaysFilter;

        let input = document.createElement('div');
        let classes = element.getAttribute('class');
        let style = element.getAttribute('style');

        let hrefAjax = element.getAttribute('href');

        let asLogic = element.getAttribute('as');
        if(!asLogic)
            asLogic = 'file';

        if(classes)
            input.setAttribute('class', classes + ' input-pick');
        else 
            input.setAttribute('class', 'input-pick');

        if(style)
            input.setAttribute('style', style);

        let textField = document.createElement('span');
        textField.innerText = 'Loading...';
        input.appendChild(textField);

        if(asLogic == 'image') {
            pickObject.viewSettings.mode = asLogic;

            let innerImage = document.createElement('img');
            innerImage.height = "100%";
            textField.before(innerImage);

            pickObject.onreturn = () => {
                if(pickObject.returnValue.value != '') {
                    innerImage.hidden = false;
                    innerImage.src = pickObject.returnValue.name;
                }
                else {
                    innerImage.hidden = true;
                }
                textField.innerText = pickObject.returnValue.label;
            };
        }

        pickObject.pickSelect.hidden = 'true';
        pickObject.pickSelect.name = element.name;
        input.appendChild(pickObject.pickSelect);

        let isFetching = false;
        let ajaxLogic = () => {
            pickObject.clearContent();
            pickObject.virtualTable.items.clean();
            
            error = false;
            disabled = true;

            if(isFetching == false) {
                isFetching = true;
                fetch(hrefAjax,{
                    mode: 'no-cors',
                    method: 'GET'
                }).then(e => e.json()).then(e => {
                    if(!error) {
                        isFetching = false;
                        pickObject.virtualTable.items.assign(e);
                        disabled = false;
    
                        if(init == false) {
                            if(value != null){
                                pickObject.virtualTable.items.selectByValue(value);
                            }
                            else {
                                pickObject.virtualTable.items.select();
                            }
    
                            init = true;
                        }
                        else {
                            pickObject.virtualTable.items.select();
                            pickObject.reloadData();
                        }
    
                        if(pickObject.onreturn)
                            pickObject.onreturn();
                    }
                });
            }
            
        };

        input.addEventListener('click', event => {
            if(disabled == false) {
                pickObject.open();
            }
            else {
                if(error) {
                    let anim = input.animate([
                        { borderColor: "red" },
                        { borderColor: "gray" }
                    ],{
                        'duration' : 800
                    });
                    anim.play();
                    anim.onfinish = () => {
                        input.style.removeProperty('borderColor');
                    };
                }
                else {
                    let anim = input.animate([
                        { borderColor: "yellow" },
                        { borderColor: "gray" }
                    ],{
                        'duration' : 800
                    });
                    anim.play();
                    anim.onfinish = () => {
                        input.style.removeProperty('borderColor');
                    };
                }
            }
        });

        element.before(input);
        element.remove();
        ajaxLogic();
    });

});