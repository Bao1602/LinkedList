
class Node {
   constructor (data) {
       this.data = data;
       this.prev = null;
       this.next = null;
   }
}
// H,T
// [1]

class DoublyLinkedList {
   constructor() {
       this.head = null;
       this.tail = null;
       this.size = 0;
   }

   append(data) {
       // Create a new node for linked list
       const newNode = new Node(data);
       // If the linked list is empty
       if (!this.head) {
           this.head = newNode;
           this.tail = newNode;
       } else {
           this.tail.next = newNode;
           newNode.prev = this.tail;
           this.tail = newNode;
       }

       this.size++;
   }

       //                             C
   // [10] <-> [20] <-> [30] <-> [40]
   // Print the linked list.
   // Can we do this recursively ?
   printForward() {
       let current = this.head;
       let str = 'null <->';
       while(current) {

           console.log(current, 'current');
           str = str + current.data + ' <-> '
           current = current.next;
       }

       console.log(str + ' null');
   }
//  Console 1 -> 2 -> 3 -> 4 -> 
   // [1] -> [2] -> [3] -> [4] -> null
   printForwardWithRecursion(node) {
       if (!node) { // Base Case
           return;
       }

       console.log(node.data + ' ->');
       this.printForwardWithRecursion(node.next);
   }
       //                       C
   // [1] -> [2] -> [3] -> [4]

   // Console 4 -> 3 -> 2 -> 1
   printBackwardsWithRecursion(node) {
       if (!node) { // Base Case
           return;
       }

       this.printForwardWithRecursion(node.next);
       console.log(node.data + ' ->');
   }

   // Algo not the actual solution (You can give it a try)
   printBackwardsWithWhile(node) {
       // C --> T

       while(current) {
           current = current.next;
       }

       while(current) {
           console.log(current.data);
           current = current.prev;
       }
   }

   //  [10] <-> [20] <-> [30] <-> [40], position  = 1, newData = 15
   updateAt(position, newData) {
       let current = this.head;
       let index = 0;

       while (current) {
           if (index === position) {
               current.data = newData;
               return true;
           }

           current = current.next;
           index++;
       }

       return false;
   }

   removeAt(position) {
    if (position < 0) {
        return false;
    }

    let current = this.head;
    let index = 0;

    if (position === 0 && current) {
        this.head = current.next;

        if (this.head) {
            this.head.prev = null;
        } else {
            this.tail = null;
        }

        this.size--;
        return true;
    }

    while (current) {
        if (index === position) {
            if (current.next) {
                current.next.prev = current.prev;
            } else {
                this.tail = current.prev;
            }

            if (current.prev) {
                current.prev.next = current.next;
            }

            this.size--;
            return true;
        }

        current = current.next;
        index++;
    }

    return false;
}

   /*Try to solve these 2 problems and submit the solution


Merge Two Sorted Linked Lists (ASSIGNMENT)
1 -> 3 -> 5 and 2 -> 4 -> 6 should become 1 -> 2 -> 3 -> 4 -> 5 -> 6

Delete the N-th Node from the End (ASSIGNMENT)
   1 -> 2 -> 3 -> 4 -> 5 and n = 2 , should return 1 -> 2 -> 3 -> 5




   l1  C
   l1: 1-3-5-7
       C
   l2: 2-4-6-8


   MergeList :

   1-2
*/

   mergeTwoSortedLinkedLists(l1,l2){
      if(!l1){
         return l2;
      }
      if(!l2){
         return l1;
      }

      let mergeList = new DoublyLinkedList();
      let current = mergeList.head;

      let current1 = l1.head;
      let current2 = l2.head

      while(current1 && current2){
        if(current1.data <= current2.data){
            if(!current){
                //make list 1 the head if less than list 2
                mergeList.head = current1; //mergeList: 1-
                current = mergeList.head;// Current = 1
            } else {
                current.next = current1 // mergeList
                current1.prev = current; // 
                current = current.next
            }
            current1 = current1.next;
        } else {
            if(!current){
                //make list 2 the head if less than list 1
                mergeList.head = current2;
                current = mergeList.head;
            } else {
                current.next = current2; // current = 1 , current.next = 2
                current2.prev = current;// 2 will point at current(1)
                current = current.next;//go to the next 
            }
            current2 = current2.next; //moving forward l2
        }
      }
    //if there is no element to compare between 2 lists
    if(current1){
        current.next = current1;
        current1.prev = current;
    } else {
        current.next = current2;
        current2.prev = current;
    }

    return mergeList;
   }


   deleteFromTheEnd(pos){
    if (pos < 0) {
        return false;
    }

    let current = this.head
    let index = this.size;

    if (pos === 0 && current) {
        this.head = current.next;
        if (this.head) {
            this.head.prev = null;
        } else {
            this.tail = null;
        }
        this.size--;
        return true;
    }

    while (current) {
        if (index === pos) {
            if (current.next) {
                current.next.prev = current.prev;
            } else {
                this.tail = current.prev;
            }

            if (current.prev) {
                current.prev.next = current.next;
            }

            this.size--;
            return true;
        }

        current = current.next;
        index--;
    }

    return false;
   }
   
}
// [10] <-> [20]
//part 1 merge 2 sorted linkedList
const doubleLinkedList1 = new DoublyLinkedList();
const doubleLinkedList2 = new DoublyLinkedList();
doubleLinkedList2.append(2);
doubleLinkedList2.append(4);
doubleLinkedList2.append(6);
doubleLinkedList2.append(8);

doubleLinkedList1.append(1);
doubleLinkedList1.append(3);
doubleLinkedList1.append(5);
doubleLinkedList1.append(7);

doubleLinkedList2.printForward();

doubleLinkedList1.printForward();

const mergedList = doubleLinkedList1.mergeTwoSortedLinkedLists(doubleLinkedList1, doubleLinkedList2);
mergedList.printForward();


//Part 2 delete nth from the end
const doubleLinkedList3 = new DoublyLinkedList();
doubleLinkedList3.append(11);
doubleLinkedList3.append(22);
doubleLinkedList3.append(33);
doubleLinkedList3.append(44);
doubleLinkedList3.printForward();

doubleLinkedList3.deleteFromTheEnd(2)

doubleLinkedList3.printForward();
