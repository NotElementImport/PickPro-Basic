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

How it work?<br>
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