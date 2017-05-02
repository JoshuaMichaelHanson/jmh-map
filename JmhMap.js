JmhMap = {
  //version 1.1.05.02.2017
  initMap: function (usedBy) {

    this.usedBy = usedBy;
    this.jmhMap = Object.create(null);
    this.jmhObjectType = "JmhMap";

  },
  initFromObject: function (inputObject) {

    var innerMap;

    if (inputObject.jmhObjectType === "JmhMap") {

      this.usedBy = inputObject.usedBy;
      this.jmhObjectType = "JmhMap";
      this.jmhMap = Object.create(null);
      innerMap = this.jmhMap;

      Object.getOwnPropertyNames(inputObject.jmhMap).forEach(function (val, idx, array) {
        
        if (inputObject.jmhMap[val].jmhObjectType) {

          //dynamically create an object inside of the map ie)another map
          //Object must contain a .jmhObjectType and initFromObject f(x)
          var tempObject = Object.create(this[inputObject.jmhMap[val].jmhObjectType]);

          //TODO: add check for initFromObject f(X)
          tempObject.initFromObject(inputObject.jmhMap[val]);
          innerMap[val] = tempObject;

        } else {

          innerMap[val] = inputObject.jmhMap[val];

        }
      });//end for each
    }//end if
  },
  put: function (jmhName, jmhValue) {

    this.jmhMap[jmhName] = jmhValue;

  },
  get: function (jmhName) {

    if (jmhName in this.jmhMap) {

      return this.jmhMap[jmhName];

    } else return "_NOT_IN_MAP_";

  },
  mapToString: function () {

    var rtnString = "";
    var myJmhMap = this.jmhMap; //used in inner function
    rtnString += "Used by - " + this.usedBy;

    Object.getOwnPropertyNames(this.jmhMap).forEach(function (val, idx, array) {

      if (myJmhMap[val] !== undefined) {

        if (myJmhMap[val].jmhMap) {

          //its a Map in a vMap
          rtnString += myJmhMap[val].mapToString();

          //TODO: if it has a jmhObjectType would have its own objectToString()
        } else {

          rtnString += " [Property: " + val + " - Value: " + myJmhMap[val] + " ] ";

        }

      }

    });//end foreach

    return rtnString;

  },
  getMap: function () {

    return this.jmhMap;

  },
  remove: function (jmhName) {

    if (jmhName in this.jmhMap) {

      delete this.jmhMap[jmhName];

    }
  },
  getKeys: function () {

    var rtnKeys = [];

    Object.getOwnPropertyNames(this.jmhMap).forEach(function (val, idx, array) {

      rtnKeys.push(val);

    });

    return rtnKeys;

  },
  getValues: function () {

    var rtnValues = [];
    var myJmhMap = this.jmhMap;

    Object.getOwnPropertyNames(this.jmhMap).forEach(function (val, idx, array) {

      rtnValues.push(myJmhMap[val]);

    });

    return rtnValues;

  },
};//end Object

