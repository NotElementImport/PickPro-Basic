// let pickInterface = new PickProInterface();
// pickInterface.params.setCssRoute('');

// let button = document.querySelector('button');

// button.after(pickInterface.get.htmlSelect());

// let pickTest = () => {
//     pickInterface.load.contentFromSelect(
//         document.querySelector('select[name=Example]')
//     );

//     pickInterface.params.autoDetectChanges(true);
//     pickInterface.open('test', 640, 400);
// }

let data = new PickFileUI(null);

PickUI.createObject('div')
    .putChild(PickUI.createObject().self())
    .thread(async object => {
        PickUI.object(object)
            .beALastChildren()
            .addStyle({
                'background-color' : '#ddd',
                'padding' : '1em'
            })
            .display()
    })
    .display();