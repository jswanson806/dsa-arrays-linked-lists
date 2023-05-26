/** Node: node for a singly linked list. */

class Node {
  constructor(val) {
    this.val = val;
    this.next = null;
  }
}

/** LinkedList: chained together nodes. */

class LinkedList {
  constructor(vals = []) {
    this.head = null;
    this.tail = null;
    this.length = 0;

    for (let val of vals) this.push(val);
  }

  /** push(val): add new value to end of list. */

  push(val) {
    const newNode = new Node(val);
    // check if node is empty
    if(!this.head){
      // node is empty, set head and tail to new node
      this.head = newNode;
      this.tail = newNode;
      this.length++;
    } else {
      // set tail.next to be the newNode
      this.tail.next = newNode;
      // update the tail to be newNode
      this.tail = newNode;
      this.length++;
    }
  }

  /** unshift(val): add new value to start of list. */

  unshift(val) {
    let newNode = new Node(val);
    // check for empty list
    if(!this.head){
      // set head and tail to newNode
      this.head = newNode;
      this.tail = newNode;
      // increment list length
      this.length++;
    } else {
      // set newNode.next to current head
      newNode.next = this.head;
      // make newNode the current head
      this.head = newNode;
      // increment list length
      this.length++;
    }
  }

  /** pop(): return & remove last item. */

  pop() {
    let currentNode = this.head;
    // as long as currentNode.next !== null
    while(currentNode){
      let popVal = null;
      // if there is only one value in list
      if(this.head === this.tail){
        // set popVal to value of head
        popVal = this.head.val;
        // set head and tail to null
        this.head = null;
        this.tail = null;
        // decrement list length
        this.length--;
        // return popVal
        return popVal;
      }
      // if next value is the tail
      if(currentNode.next === this.tail ) {
        // set popVal to the value of tail
        popVal = currentNode.next.val;
        // sever connection to current tail
        currentNode.next = null;
        // update tail to be currentNode
        this.tail = currentNode;
        // decrement list length
        this.length--;
        // return popVal
        return popVal;
      } else {
        // move on to the next node in list
        currentNode = currentNode.next;
      }
    }
  }

  /** shift(): return & remove first item. */

  shift() {
    // check for the list to have a head
    if(this.head) {
      // set value of shiftVal to value of head
      let shiftVal = this.head.val;
      // check for a next value in the list
      if(this.head.next) {
        // set head to next value in list
        this.head = this.head.next;
        // decrement list length
        this.length--;
        // return shiftVal
        return shiftVal;
      } else { // value is the only value in list
        // set head and tail to null
        this.head = null;
        this.tail = null;
        // decrement list length
        this.length--;
        // return shiftVal
        return shiftVal;
      }
    }
  }

  /** getAt(idx): get val at idx. */

  getAt(idx) {
    // initialize count
    let count = 0;
    // set currentNode to head
    let currentNode = this.head;
    // as long as the list is not empty
    while(currentNode){
      // check if count is equal to target index
      if(count === idx){
        // found the value, return it
        return currentNode.val;
      }
      // otherwise, keep searching
      currentNode = currentNode.next;
      // increment count
      count++;
    }
  }

  /** setAt(idx, val): set val at idx to val */

  setAt(idx, val) {
    let count = 0;
    let currentNode = this.head;

    while(currentNode){
      if(count === idx) {
        currentNode.val = val;
      }

      currentNode = currentNode.next;
      count++;
    }
  }

  /** insertAt(idx, val): add node w/val before idx. */

  insertAt(idx, val) {
    // create new node with val
    let newNode = new Node(val);
    let currentNode = this.head;
    let count = 0;

    // list is empty
    if(!this.head) {
      // set head and tail to new node
      this.head = newNode;
      this.tail = newNode;
      // increment length
      this.length++;
    }

    // list is not empty, iterate over list
    while(currentNode){
      // next index is target idx
      if(count + 1 === idx) {
        // check for end of the list
        if(!currentNode.next) {
          // set .next of tail to newNode
          currentNode.next = newNode;
          // set new tail
          this.tail = newNode;
          // increment length
          this.length++;
          return;
        }
        // not at the end, set .next of newNode to the next node in list (index === count + 1)
        newNode.next = currentNode.next;
        // set .next of currentNode (index before target idx) to newNode
        currentNode.next = newNode;
        // increment length
        this.length++;
        return;
      } else {
        // set currentNode to next node for next iteration
        currentNode = currentNode.next;
        // increment count
        count++;
      }
    }
  }

  /** removeAt(idx): return & remove item at idx, */

  removeAt(idx) {
    let count = 0;
    let currentNode = this.head;

    // check for list to have a single item
    if(!currentNode.next) {
      // set targetVal to currentNode.val
      let targetVal = currentNode.val;
      // set head and tail to null
      this.head = null;
      this.tail = null;
      // decrement length
      this.length--;
      // return target val
      return targetVal;
    }

    // iterate over list
    while(currentNode){
      // declare target value variable
      let targetVal;
      // check for next index to be target idx
      if(count + 1 === idx){
        // check if next index is the tail
        if(!currentNode.next.next) {
          // set targetVal to val of next node (target)
          targetVal = currentNode.next.val;
          // update tail to be next node
          this.tail = currentNode.next;
          // set tail.next to null
          this.tail.next = null;
          // decrement list length
          this.length--;
          // return target val
          return targetVal;
        }
        // not at the end, set val to be .next.val (target)
        targetVal = currentNode.next.val;
        // sever connection to .next by setting .next.next
        currentNode.next = currentNode.next.next;
        // decrement list length
        this.length--;
        // return target val
        return targetVal;
      } else {
        // set currentNode to .next for next iteration
        currentNode = currentNode.next;
        // increment count
        count++;
      }
    }
  }

  /** average(): return an average of all values in the list */

  average() {
    let count = 0;
    let sum = 0;
    let currentNode = this.head;

    // return 0 if list is empty
    if(!this.head){
      return 0;
    }

    // until end of list
    while(currentNode){
      // at the end of the list
      if(!currentNode.next){
        // add currentNode.val to sum
        sum += currentNode.val;
        // increment count
        count++;
        // return average (sum/count)
        return sum / count;
      } else {
        // add currentNode.val to sum
        sum += currentNode.val;
        // set currentNode to .next for next iteration
        currentNode = currentNode.next;
        // increment count
        count++;
      }
    }
  }
}

module.exports = LinkedList;
