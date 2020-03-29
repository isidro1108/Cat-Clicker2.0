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
    },
    render: function() {
        view2.renderAll(model.listOfCats)
    }
}

// List of cats
var view1 = {
    listOfCats: document.getElementById('list-of-cats'),
    init: function(listOfCats) {
        let newElements = document.createDocumentFragment()
        for (let index = 0; index < listOfCats.length; index++) {
            let newName = document.createElement('li')
            newName.className = 'design-flex'
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
                controller.render()
            })
            newElements.appendChild(newName)
        }
        this.listOfCats.appendChild(newElements)
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

controller.init()