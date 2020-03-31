// The data of cats
var model = {
    listOfCats: [
        {name: 'Floppy',
        src: 'img/cat.jpg',
        counter: 0},
        {name: 'Mr. Happy',
        src: 'img/cat2.jpg',
        counter: 0},
        {name: 'Sweetness',
        src: 'img/cat3.jpg',
        counter: 0},
        {name: 'Browny',
        src: 'img/cat4.jpg',
        counter: 0},
        {name: 'Dunny',
        src: 'img/cat5.jpg',
        counter: 0}
    ]
}

// My cat-clicker's octopus
var controller = {
    init: function() {
        view1.init(model.listOfCats)
        view2.init(model.listOfCats)
        view3.init(model.listOfCats)
    },
    renderView1: function() {
        view1.render(model.listOfCats)
    },
    renderView2: function() {
        view2.renderAll(model.listOfCats)
    },
    renderView3: function() {
        view3.render(model.listOfCats)
    },
    renderAll: function() {
        view1.render(model.listOfCats)
        view2.renderAll(model.listOfCats)
        view3.render(model.listOfCats)
    }
}

// List of cats
var view1 = {
    listOfCats: document.getElementById('list-of-cats'),
    listOfNames: null,
    init: function(listOfCats) {
        let newElements = document.createDocumentFragment()
        for (let index = 0; index < listOfCats.length; index++) {
            let newName = document.createElement('li')
            newName.className = 'design-flex list-of-names'
            newName.textContent = listOfCats[index].name
            newName.addEventListener('click', function() {
                for (let i in listOfCats) {
                    if (listOfCats[i].name === this.textContent) {
                        let aux = listOfCats[0]
                        listOfCats[0] = listOfCats[i]
                        listOfCats[i] = aux
                        break
                    }
                }
                controller.renderView2()
                controller.renderView3()
            })
            newElements.appendChild(newName)
        }
        this.listOfCats.appendChild(newElements)
        this.listOfNames = document.getElementsByClassName('list-of-names')
    },
    render: function(listOfCats) {
        for (let index in this.listOfNames) {
            if (this.listOfNames[index].textContent === view2.name.textContent) {
                this.listOfNames[index].textContent = listOfCats[0].name
            }
        }
    }
}

// Current cat in the view1
var view2 = {
    name: document.getElementById('name'),
    image: document.getElementById('img-cat'),
    counter: document.getElementById('counter'),
    init: function(listOfCats) {
        let currentCat = listOfCats[0]
        this.name.textContent = currentCat.name
        let newImage = document.createElement('img')
        newImage.src = currentCat.src
        let obj = this
        newImage.addEventListener('click', function() {
            currentCat.counter++
            obj.renderCounter(currentCat)
            controller.renderView3()
        })
        this.image.appendChild(newImage)
        this.counter.textContent = currentCat.counter + ' clicks'
    },
    renderAll: function(listOfCats) {
        this.image.firstElementChild.remove()
        this.init(listOfCats)
    },
    renderCounter: function(currentCat) {
        this.counter.textContent = currentCat.counter + ' clicks'
    }
}

// View form
var view3 = {
    displayButton: document.getElementById('display-admin'),
    form: document.getElementById('admin-form'),
    name: document.getElementById('f-name'),
    source: document.getElementById('f-src'),
    clicks: document.getElementById('f-counter-clicks'),
    cancelButton: document.getElementById('cancel'),
    saveButton: document.getElementById('save'),
    init: function(listOfCats) {
        let obj = this
        this.displayButton.addEventListener('click', function() {
            obj.render(listOfCats)
            obj.form.style.display = 'block'
        })
        this.cancelButton.addEventListener('click', function() {
            obj.form.style.display = 'none'
        })
        this.saveButton.addEventListener('click', function() {
            listOfCats[0].name = obj.name.value
            listOfCats[0].src = obj.source.value
            listOfCats[0].counter = obj.clicks.value
            controller.renderAll()
        })
        this.render(listOfCats)
    },
    render: function(listOfCats) {
        let currentCat = listOfCats[0]
        this.name.value = currentCat.name
        this.source.value = currentCat.src
        this.clicks.value = currentCat.counter
    }
}

controller.init()