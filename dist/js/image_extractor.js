var Person = (function(){"use strict";var PRS$0 = (function(o,t){o["__proto__"]={"a":t};return o["a"]===t})({},{});var DP$0 = Object.defineProperty;var GOPD$0 = Object.getOwnPropertyDescriptor;var MIXIN$0 = function(t,s){for(var p in s){if(s.hasOwnProperty(p)){DP$0(t,p,GOPD$0(s,p));}}return t};var proto$0={};
    function Person() {var name = arguments[0];if(name === void 0)name = 'nobody';
    	this.name = name;
    }DP$0(Person,"prototype",{"configurable":false,"enumerable":false,"writable":false});
    proto$0.introduce = function() {
        return 'Hi I am ' + this.name;
    };
MIXIN$0(Person.prototype,proto$0);proto$0=void 0;return Person;})();