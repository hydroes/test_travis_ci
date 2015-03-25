class Person {
    constructor(name = 'nobody') {
    	this.name = name;
    }
    introduce() {
        return 'Hi I am ' + this.name;
    }
}