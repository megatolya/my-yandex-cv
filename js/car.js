/**
 * Создает экземпляр Машины
 * @this {Car}
 * @param {string} manufacturer Производитель
 * @param {string} model Модель
 * @param {number} year Год производство
 */
function Car(manufacturer, model, year) {
    this.manufacturer = manufacturer;
    this.model = model;
    if (year==undefined) {
        this.year=new Date().getFullYear();
    }else{
        this.year = year;
    }
    return this;
}

Car.prototype.getInfo = function() {
    return this.manufacturer+' '+this.model+' '+this.year;
}
Car.prototype.getDetailedInfo = function() {
    return 'Производитель: '+this.manufacturer+'. Модель: '+this.model+'. Год: '+this.year;
}

// @TODO: если конструктор вызывается без указания текущего года, то подставлять текущий
// @TODO: реализовать методы вывода информации о машине:  


var bmw = new Car("BMW", "X5", 2010),
    audi = new Car("Audi", "Q5", 2012),
    toyota = new Car("Toyota", "Camry");


 
 console.log(bmw.getInfo()); 


/**
 * Создает экземпляр Автосалона
 * @this {CarDealer}
 * @param {string} name Название автосалона
 */
function CarDealer(name) {
    this.name = name;
    this.cars = [];
    this.prices = [];
    return this;
}
CarDealer.prototype.add = function() {
    console.log('\/\/add');
    for (var k in arguments) {
        var orig_car= arguments[k];
        //делаем копию объекта чтобы передавать не ссылку на объект, 
        //а его данные, чтобы впоследствии при задании цены, цена не занасилась в первоначальный объект Car
        var new_car= new Car(orig_car.manufacturer, orig_car.model,orig_car.year);
        this.cars.push(new_car);
    }
    return this;
}
var yandex = new CarDealer('Яндекс.Авто');
console.log(toyota);
 console.log(audi); 
 console.log(bmw); 
// @TODO: реализовать метод добавления машин в автосалон. Предусмотреть возможность добавления одной машины, нескольких машин.
yandex
    .add(toyota)
    .add(bmw, audi);


// @TODO: реализовать метод установки цены на машину
/**
 * Установить цену на машину
 * @param {string} car идентификатор машины
 * @param {string} price стоимость
 */
// идентификатор машины составляется следующим образом "производитель модель год"
// стоимость машины может быть задана в двух валютах: йена и евро.
CarDealer.prototype.setPrice = function(id,price) {
    console.log('\/\/setPrice');
   var arr=id.split(' ');
   for(var car in this.cars){
        if(this.cars[car].manufacturer == arr[0] && this.cars[car].model == arr[1] && this.cars[car].year==arr[2]){
            this.cars[car].price=price.substring(1);
            this.cars[car].currency=price[0];
        }
   }
   return this;
};
yandex
    .setPrice('BMW X5 2010', '€2000')
    .setPrice('Audi Q5 2012', '€3000')
    .setPrice('Toyota Camry 2012', '¥3000');
console.log(yandex);
// @TODO: реализовать вывод списка автомобилей в продаже, с фильтрацией по стране производителю, используя метод getCountry:
function getCountry(car) {

    switch (car.manufacturer.toLowerCase()) {
        case 'bmw':
	case 'audi':
            return 'Germany';

        case 'toyota':
            return 'Japan';
	}
}

function sortObj(arr){
    // Setup Arrays
    var sortedKeys = new Array();
    var sortedObj = {};

    // Separate keys and sort them
    for (var i in arr){
        sortedKeys.push(i);
    }
    sortedKeys.sort();

    // Reconstruct sorted obj based on keys
    for (var i in sortedKeys){
        sortedObj[sortedKeys[i]] = arr[sortedKeys[i]];
    }
    return sortedObj;
}

CarDealer.prototype.list = function(){
    console.log('\/\/list');
    var arr=new Array();
    for(var k in this.cars){
        arr[getCountry(this.cars[k])+k]=this.cars[k];
    }
    for(var k in sortObj(arr)) {
        console.log(arr[k].getInfo());
    }
    return sortObj(arr);
}
CarDealer.prototype.listByCountry = function(country){
    console.log('\/\/listByCountry');
    var arr=new Array();
    for(var k in this.cars){
        if(getCountry(this.cars[k])==country)
            arr.push(this.cars[k]);
    }
    for(var k in arr) {
        console.log(arr[k].getInfo());
    }
    return arr;
}
CarDealer.prototype.listInRub = function(){
     console.log('\/\/listInRub');
     var arr=[];
   for(var k in this.cars){
       if(this.cars[k].currency=='¥'){
            arr.push({
                price:this.cars[k].price*0.4,
                car:this.cars[k].getDetailedInfo()
                //carObj:this.cars[k]
            });
       }
       if(this.cars[k].currency=='€'){
            arr.push({
                price:this.cars[k].price*40,
                car:this.cars[k].getDetailedInfo()
                //carObj:this.cars[k]

            });
       }
    } 
    console.log(arr);
    return arr;
}
yandex.list(); //BMW X5 2010, Audi Q5 2012, Toyota Camry 2012
yandex.listByCountry('Germany'); //BMW X5 2010, Audi Q5 2012
yandex.listInRub();

// @TODO: бонус! выводить список машин с ценой в рублях.
