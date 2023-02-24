// let PickRuleObject = function () {

// }

// let PickProBasicUI = function (parent) {
//     /**
//      * @type {PickProInterface}
//      */
//     this.parent = parent;

//     this.drawInner = function () {

//     }

//     this.drawHeader = function () {

//     }

//     this.drawFooter = function () {

//     }
// }

// let PickProFileUI = function (parent) {
//     /**
//      * @type {PickProInterface}
//      */
//     this.parent = parent;

//     this.drawInner = function () {

//     }

//     this.drawHeader = function () {

//     }

//     this.drawFooter = function () {

//     }
// }

// let PickProImageUI = function (parent) {
//     /**
//      * @type {PickProInterface}
//      */
//     this.parent = parent;

//     this.drawInner = function () {
//         this.parent.object.add('test');
//     }

//     this.drawHeader = function () {

//     }

//     this.drawFooter = function () {

//     }
// }

// let PickProInterface = function () {
//     this.m_type_pick = 'basic';
//     /**
//      * @type {PickProImageUI|null}
//      */
//     this.m_type_object = null;
//     this.m_where_add = '*';

//     this.m_filter = {
//         name : "",
//         type : "direction"
//     };

//     this.m_self_rules_ui = [

//     ];

//     this.m_generate_logic = {
//         cssPath : '',
//         autoDetectChanges : false
//     };

//     this.m_window = {
//         title : "",
//         /**
//          * @type {Window}
//          */
//         window : null,
//         width : 400,
//         height : 400
//     };

//     this.m_content = {
//         virtualSelect : {
//             /**
//              * @type {HTMLSelectElement}
//              */
//             object : null,
//             selected : {
//                 index : 0,
//                 value : ''
//             }
//         },
//         nav : {
//             /**
//              * @type {HTMLElement}
//              */
//             object : null,
//             /**
//              * @type {HTMLInputElement}
//              */
//             defaultSearch : null
//         },
//         inner : {
//             /**
//              * @type {HTMLElement}
//              */
//             object : null
//         },
//         footer : {
//             /**
//              * @type {HTMLElement}
//              */
//             object : null
//         }
//     };

//     this.events = {

//     };

//     this.items = {
//         /**
//          * Add localy option
//          * 
//          * @param {string} content 
//          * @param {string} value 
//          * @param {{}} attributes Works as {attribute_name : attribute_value}
//          */
//         push : (content, value, attributes = {}, silentMode = false) => {

//             if(this.m_generate_logic.autoDetectChanges && silentMode == false)
//                 this.updateContent();
//         },
//         /**
//          * Remove all items
//          * 
//          * @param {boolean} silentMode If enable autoDetectChanges, silentMode disable autoDetectChanges
//          */
//         clear : (silentMode = false) => {
//             this.m_content.virtualSelect.object.innerHTML = "";
            
//             if(this.m_generate_logic.autoDetectChanges && silentMode == false)
//                 this.updateContent();
//         }
//     };

//     this.params = {
//         /**
//          * Set name for Form
//          * 
//          * @param {string} name 
//          */
//         setName : (name) => {
//             this.m_content.virtualSelect.object.name = name;
//         },
//         autoDetectChanges : (value) => {
//             this.m_generate_logic.autoDetectChanges = value;
//         },
//         setCssRoute : (path = '/') => {
//             let origin = location.origin.substring(0, location.origin.length);
//             if(path.startsWith('http://') || path.startsWith('https://')) {
//                 if(path.endsWith('.css')) {
//                     this.m_generate_logic.cssPath = path;
//                 }
//                 else
//                 {
//                     this.m_generate_logic.cssPath = path + "/pickPro.css";
//                 }
//             }
//             else if(path.startsWith('/')) {
//                 if(path.endsWith('.css')) {
//                     this.m_generate_logic.cssPath = origin + path;
//                 }
//                 else
//                 {
//                     this.m_generate_logic.cssPath = origin + path + "/pickPro.css";
//                 }
//             }
//             else {
//                 if(path.endsWith('.css')) {
//                     this.m_generate_logic.cssPath = origin + "/" + path;
//                 }
//                 else
//                 {
//                     this.m_generate_logic.cssPath = origin  + "/" + path + "/pickPro.css";
//                 }
//             }
//         }
//     };

//     this.load = {
//         /**
//          * Load options from content
//          * 
//          * And auto detect type pick
//          * 
//          * Support of options type:
//          * ```html
//          * <!--Image pick -->
//          * <option value='Value' aria-label='Label'>
//          *   'ImagePath'
//          * </option>
//          * 
//          * <!--Basic pick -->
//          * <option value='Value'>
//          *   'Content'
//          * </option>
//          * 
//          * <!--File pick -->
//          * <option value='IdValue' mime='example: .png'>
//          *   'NameFile'
//          * </option>
//          * ```
//          * 
//          * @param {HTMLSelectElement} selectElement 
//          */
//         contentFromSelect : (selectElement) => {
//             if(selectElement.options.length > 0) {
//                 this.m_type_pick = 'basic';
//                 this.m_type_object = new PickProBasicUI(this);

//                 let attribute = selectElement.options[0].getAttribute('mime');
//                 if(attribute) {
//                     this.m_type_pick = 'file';
//                     this.m_type_object = new PickProFileUI(this);
//                 }

//                 attribute = selectElement.options[0].getAttribute('aria-label');
//                 if(attribute) {
//                     this.m_type_pick = 'image';
//                     this.m_type_object = new PickProImageUI(this);
//                 }
//             }

//             for(let item of selectElement.options) {
//                 this.m_content.virtualSelect.object.appendChild(
//                     item.cloneNode()
//                 );

//                 this.m_content.virtualSelect.object.options[
//                     this.m_content.virtualSelect.object.options.length - 1
//                 ].innerHTML = item.innerHTML;
//             }

//             if(this.m_generate_logic.autoDetectChanges)
//                 this.updateContent();
//         },

//         /**
//          * Load content from array
//          * 
//          * And auto detect type pick
//          * 
//          * Example :
//          * ```js
//          * // Image pick
//          * {
//          *      "Label" : {
//          *          "Value" : 'Val',
//          *          "FilePath" : "/test.png"
//          *      }
//          * }
//          * 
//          * // File pick
//          * {
//          *      "FileName" : {
//          *          "Value" : 'Val',
//          *          "Mime" : '.png',
//          *      }
//          * }
//          * 
//          * // Basic pick
//          * {
//          *      "FileName" : {
//          *          "Value" : 'Val'
//          *      }
//          * }
//          * ```
//          * 
//          * @param {{name : {arg1 : string, arg2 : string}}} array 
//          */
//         contentFromArray : (array) => {


//             if(this.m_generate_logic.autoDetectChanges)
//                 this.updateContent();
//         }
//     };

//     this.get = {
//         htmlSelect : () => {
//             return this.m_content.virtualSelect.object;
//         } 
//     };

//     this.object = {
//         add : (element) => {
//             if(typeof(element) == 'string') {
//                 let text = element;
//                 element = document.createElement('span')
//                 element.innerHTML = text;
//             }

//             switch(this.m_where_add) {
//                 case '*':
//                     this.m_window.window.document.body.appendChild(
//                         element
//                     );
//                     break;
//                 case 'inner':
//                     this.m_content.inner.object.appendChild(
//                         element
//                     );
//                     break;
//                 case 'header':
//                     this.m_content.nav.object.appendChild(
//                         element
//                     );
//                     break;
//                 case 'footer':
//                     this.m_content.footer.object.appendChild(
//                         element
//                     );
//                     break;
//             }
//         },
//         appendChild : (element, parent, how = 'in') => {
//             switch(how) {
//                 case 'in':
//                     parent.appendChild(element);
//                     break;
//                 case 'after':
//                     parent.after(element);
//                     break;
//                 case 'before':
//                     parent.before(element);
//                     break;
//             }
//         },
//         setCss : (href) => {
//             let link = document.createElement('link');
//             link.rel = 'stylesheet';
//             link.type = 'text/css';
//             link.href = href;
            
//             this.m_window.window.document.head.appendChild(
//                 link
//             );
//         }
//     };

//     this.set = {
//         /**
//          * create own rule for own design
//          * 
//          * Example:
//          * ```html
//          * <option value="test" self-type="Something">Data</option>
//          * ```
//          * In JS:
//          * ```js
//          * class SelfUI {
//          *   constructor(parent) {
//          *      this.parent = parent
//          *   }  
//          * 
//          *   function drawInner() {
//          *      this.parent.add.object('test');
//          *   }
//          * }
//          * 
//          * modal.set.ruleUI(
//          *    (PickRuleObject) => {
//          *       if(PickRuleObject.has('self-type')) {
//          *          return true;
//          *       }
//          *       return false;
//          *    },
//          *    SelfUI
//          * );
//          * ```
//          * 
//          * @param {Function} filterFunction 
//          * @param {Object} classObject 
//          */
//         ruleUI : (filterFunction, classObject) => {
//             this.m_self_rules_ui = {
//                 func : filterFunction,
//                 class : classObject
//             }
//         }
//     }

//     /**
//      * Just open modal window with picker.
//      * 
//      * @param {string} title 
//      * @param {number} width 
//      * @param {number} height 
//      */
//     this.open = function(title = 'Test', width = 400, height = 400) {
//         if(this.m_window.window == null || this.m_window.window.closed) {
//             this.m_window.title = title;
//             this.m_window.width = width;
//             this.m_window.height = height;
    
//             this.m_window.window = window.open('', this.m_window.title, `width=${this.m_window.width},height=${this.m_window.height}`);

//             if(this.m_generate_logic.autoDetectChanges)
//                 this.m_open_event();
//         }
//     };

//     this.updateContent = () => {
//         if(this.m_window.window != null && this.m_window.window.closed == false) {
//             if(this.m_content.inner.object != null)
//                 this.m_content.inner.object.innerHTML = '';
            
//             this.m_where_add = 'inner';
//             this.m_type_object.drawInner();
//             this.m_where_add = '*';
//         }
//     };

//     /**
//      * # Filter works always
//      * 
//      * This filter works like sort items,
//      * and display some content.
//      * 
//      * Basic filter:
//      * ```js
//      * pickModal.setFilter('uploads');
//      * ```
//      * 
//      * Folder filter:
//      * ```js
//      * pickModal.setFilter('/uploads');
//      * ```
//      * 
//      * Internet filter:
//      * ```js
//      * pickModal.setFilter('@uploads');
//      * ```
//      * 
//      * Tag filter:
//      * ```js
//      * pickModal.setFilter('#uploads');
//      * ```
//      * 
//      * Author filter:
//      * ```js
//      * pickModal.setFilter('*uploads');
//      * ``` 
//      * 
//      * @param {string} value 
//      */
//     this.setFilter = function (value) {
//         if(value.startsWith('/')) {
//             this.m_filter.name = value.substring(1, value.length);
//             this.m_filter.type = "direction";
//         }
//         else if(value.startsWith('@')) {
//             this.m_filter.name = value.substring(1, value.length);
//             this.m_filter.type = "internet";
//         }
//         else if(value.startsWith('#')) {
//             this.m_filter.name = value.substring(1, value.length);
//             this.m_filter.type = "tag";
//         }
//         else if(value.startsWith('*')) {
//             this.m_filter.name = value.substring(1, value.length);
//             this.m_filter.type = "author";
//         }
//         else {
//             this.m_filter.name = value;
//             this.m_filter.type = null;
//         }
//     };

//     this.m_open_event = () => {
//         this.m_where_add = '*';
//         this.object.setCss(this.m_generate_logic.cssPath);
//         let header = document.createElement('header');
    

//         this.object.add(header);
//         this.m_content.nav.object = header;

//         let inner = document.createElement('main');
            

//         this.object.add(inner);
//         this.m_content.inner.object = inner;

//         let footer = document.createElement('footer');
            

//         this.object.add(footer);
//         this.m_content.footer.object = footer;

//         if(this.m_type_object != null) {
//             this.m_where_add = 'header';
//             this.m_type_object.drawHeader();
//             this.m_where_add = 'inner';
//             this.m_type_object.drawInner();
//             this.m_where_add = 'footer';
//             this.m_type_object.drawFooter();
//             this.m_where_add = '*';
//         }
//     }

//     (() => {
//         this.m_content.virtualSelect.object = document.createElement('select');
//     }).call()
// };