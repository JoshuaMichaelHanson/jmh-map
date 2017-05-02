# jmh-map
This is a general purpose key/value map.

# ES 6
If you are using es 6 you may want to use the new Map object
https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map

## Usage
```javascript
var myCoolMap = Object.create(JmhMap);

myCoolMap.initMap('Used in a demo');

myCoolMap.put('Name', 'Value');
myCoolMap.put(2, 5);

console.log(myCoolMap.get('Name'); // Value
console.log(myCoolMap.get(2); // 5
console.log(myCoolMap.get(3); //_NOT_IN_MAP_

myCoolMap.remove('Name');
console.log(myCoolMap.get('Name');//_NOT_IN_MAP_
```
## Main Usage
This is my goto data structure.  Great for passing info during HTML redirects using sessions storage.  Could also use local storage.

### Session Storage
```javascript
var myCoolMap, sessionObject;

function loadState()
{
  myCoolMap = Object.create(JmhMap);
  
  if(!sessionStorage.getItem('coolMap')) {
    //new empty map
    myCoolMap.initMap('Used in demo');
  } else {
    //init from object
    sessionObject = sessionStorage.getItem('coolMap');
    sessionObject = JSON.parse(sessionObject);
    myCoolMap.initFromObject(sessionObject);
  }
}

function saveState() {
  sessionStorage.setItem('coolMap', JSON.stringify(myCoolMap));
}
```
### Advaced Usage
Note you can have maps inside of maps.  You may store other complex objects that have both jmhObjectType property and initFromObject f(X).

#### TODO
1. Add check for initFromObject f(X) line 29
2. If object has a jmhObjectType would have its own objectToString() line 70
