var person;

describe("Person", function() {

  beforeEach(function() {
    person = new Person();
  });

  it("person name is 'nobody' when not assigned", function() {
    expect(person.introduce()).toEqual('Hi I am nobody');
  });

  it("test person has a name when assigned", function() {
    var person = new Person('Brian');
    expect(person.introduce()).toEqual('Hi I am Brian');
  });

});
