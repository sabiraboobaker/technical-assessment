// Define a ListNode interface representing a node in a singly-linked list.
interface ListNode {
    value: number;       // Value of the node.
    next: ListNode | null; // Reference to the next node.
  }
  
  // Function to find the middle node of a linked list.
  function findMiddle(head: ListNode | null): ListNode | null {
    if (!head) return null;
    let slow: ListNode | null = head;
    let fast: ListNode | null = head;
  
    // Use the slow and fast pointer technique to find the middle.
    // The slow pointer moves one step at a time, and the fast pointer moves two steps at a time.
    // When the fast pointer reaches the end, the slow pointer will be at the middle.
    while (fast && fast.next) {
      slow = slow!.next;
      fast = fast!.next!.next;
    }
  
    return slow;
  }
  
  // Asynchronously merge two sorted linked lists.
  async function merge(
    left: ListNode | null,
    right: ListNode | null
  ): Promise<ListNode | null> {
    // Special case when left or right side is completely sorted
    if (!left) return right;
    if (!right) return left;
  
    let result: ListNode | null;
  
    // Compare the values of the left and right nodes to merge them in sorted order.
    if (left.value < right.value) {
      result = left;
      result.next = await merge(left.next, right);
    } else {
      result = right;
      result.next = await merge(left, right.next);
    }
  
    return result;
  }
  
  // Asynchronously perform merge sort on a linked list.
  async function mergeSort(head: ListNode | null): Promise<ListNode | null> {
    if (!head || !head.next) return head;
  
    // Find the middle of the linked list and split it into two halves.
    let middle: ListNode | null;
    if (head.next.next == null) middle = head; // Special case when the list has only two elements.
    else middle = findMiddle(head); // Find the middle using the previously defined function.
    const leftHalf: ListNode | null = head;
    const rightHalf: ListNode | null = middle!.next;
    middle!.next = null; // Disconnect the two halves to split the list.
  
    // Recursively sort and merge the two halves.
    const sortedLeft: ListNode | null = await mergeSort(leftHalf);
    const sortedRight: ListNode | null = await mergeSort(rightHalf);
  
    return merge(sortedLeft, sortedRight); // Merge the sorted halves back together.
  }
  
  // Function to convert an array of numbers into a linked list.
  function arrayToList(arr: number[]): ListNode | null {
    let dummyHead: ListNode = { value: 0, next: null };
    let current: ListNode | null = dummyHead;
  
    for (let val of arr) {
      current.next = { value: val, next: null };
      current = current.next;
    }
  
    return dummyHead.next;
  }
  
  // Function to convert a linked list into an array.
  function listToArray(head: ListNode | null): number[] {
    const result: number[] = [];
    let current: ListNode | null = head;
  
    while (current) {
      result.push(current.value);
      current = current.next;
    }
  
    return result;
  }
  
  const sortLinkedList = async () => {
    console.log("=====LINKED LIST SORTING=====");
  
    const arr: number[] = [3, 1, 4, 1, 5, 9, 2, 6, 5, 3, 5];
    console.log(`Input array : ${arr}`);
  
    console.log(`\nConverting Array into Linked list...`);
    const linkedList: ListNode | null = arrayToList(arr);
  
    console.log(`Bubble sorting Linked list...`);
    const sortedList: ListNode | null = await mergeSort(linkedList);
  
    console.log(`Converting Linked list into Array...`);
    const sortedArray: number[] = listToArray(sortedList);
    console.log(`\nSorted array : ${sortedArray}`);
  };
  
  sortLinkedList();
  