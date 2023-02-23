let pickTest = new PickPro(
    document.querySelector('select[name=Example]')
);

pickTest.viewSettings.mode = 'image';
pickTest.viewSettings.pathToCss = 'http://127.0.0.1:5500/';

function pickOpen() {
    pickTest.open();
}