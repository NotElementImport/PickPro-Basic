* How to use
* How work
* Settings and Helpers
    * Settings
    * How get return value (selected item)
    * Events
* HTML as input (Request mode)

# How to use

This libary to js, give a image or file, pick modal window.

Connect to project:
```html
<script src="/pickPro.js"></script>
```

Use in js:
```js
let pickModal = new PickPro(
    // Work only with <select> tag
    document.querySelector('select[name=Example]')
);

// or

let pickModal = new PickPro();
pickModal.virtualTable.createTable();
```
And open
```js
pickModal.open();
```

# How it work?
PickPro use \<select\> tag, and read \<option\> tags

Example:
```html
<select name="Example">
    <option value="1" aria-label="Label use in modal">
        /SomePngFile.png
    </option>
</select>
```

Also you can use `Virtual table`
```js
let pickModal = new PickPro();

pickModal.virtualTable.createTable({
    'Label' : [
        'Value',
        'filePath'
    ],
    ...
});

// or

pickModal.virtualTable.createTable();

pickModal.virtualTable.items.push('Label', 'value', 'filePath');

// or

pickModal.virtualTable.createTable();

pickModal.virtualTable.items.assign({
    'Label' : [
        'Value',
        'filePath'
    ],
    ...
});
```
# Settings and Helpers
## Settings
PickPro have a settings: static and object
<br>
<br>
Static settings is:
```js
Settings = {
    PickPro : {
        defaultCssDir : '' // Route to css, use in <input>
    }
};

//Example:
Settins.PickPro.defaultCssDir = 'css'; //Work as www.site.com/css/pickPro.css
```

Object settings is:
```js
class PickPro = {
    this.viewSettings = {
        mode : 'file',
        pathToCss : '',
        title : 'PickPro v1',
        alwaysFilter : '',
        directoryAll : 'All files'
    }
}

pickModal.viewSettings.mode = 'image'; // Have two modes 'image', 'file'

pickModal.viewSettings.pathToCss = 'http://www.site.com/pickPro.css'; // need full address

pickModal.viewSettings.title = 'Test title'; // Title window

pickModal.viewSettings.alwaysFilter = '/folder_example';
pickModal.viewSettings.alwaysFilter = '@site_example';
pickModal.viewSettings.alwaysFilter = 'just filter'; // used always and sort files to show

pickModal.viewSettings.directoryAll = 'name_empty_directory'; // if `alwaysFilter` is '/' used this value

```

## How get return value (selected item)

```js
let data = pickModal.returnValue;

console.log(data.name); // Path
console.log(data.value); // Value
console.log(data.label); // Label
```

## Events
```js
// On Return : Called when pick item
pickModal.onreturn = () => {
    console.log(pickModal.returnValue);
};
```
# HTML as input (Request mode)
You also can use only \<input\>, but it's work like ajax mode.
<br>How?<br>
In input write a href attribute, which a return array(JSON) like a virtualTable

Example in html:
```html
<input type="pick-on-server" as="image" href="/test.json" filter="/" name="">
```

Arguments:<br>
<i style="color:lightskyblue;">type</i> = <i style="color:lightsalmon;">"pick-on-server"</i> - New type for input<br>
<i style="color:lightskyblue;">as</i> = <i style="color:lightsalmon;">"image"</i> - Same as `pickModal.viewSettings.mode`<br>
<i style="color:lightskyblue;">href</i> = <i style="color:lightsalmon;">"/test.json"</i> - Ajax link to get data<br>
<i style="color:lightskyblue;">filter</i> = <i style="color:lightsalmon;">"/"</i> - Same as `pickModal.viewSettings.alwaysFilter`<br>
<i style="color:lightskyblue;">name</i> = <i style="color:lightsalmon;">""</i> - Basic input field<br>

You can use in \<form\>, input submit a value of selected