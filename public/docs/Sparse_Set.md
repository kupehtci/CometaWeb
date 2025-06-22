#COMETA 

# Sparse Set

The `SparseSet` template class is a container designed to efficiently store and manage a set of elements indexed by integer keys. It uses a combination of two internal vectors—_dense_ and _sparse_—to provide rapid insertions, deletions, and existence checking.

This structure is particularly useful in scenarios where the indices of elements might be sparsely distributed over a large range, but the actual number of elements stored is small, making it a great choice for performance-sensitive applications such as game engines, entity-component systems, or any system that benefits from fast lookups and compact storage.

### Concepts

An sparse set data structure is mainly based in the following components: 

* ***Dense Array**

Stores the actual data elements contiguously. This allows efficient iteration and memory locality.

* ***Sparse Array**

Acts as a mapping from the external indices (keys) to the positions in the dense array. Entries not present have a value of -1 to indicate absence.

* ***Dense Index Array**

Stores the reverse mapping — the dense array’s indices point back to their corresponding key indices. This supports effective removal operations.

### Attributes

The `SparseSet<t>` class implements the following attributes: 

`std::vector<T> _dense;`
Holds the inserted values densely.

`std::vector<int> _denseIndex;`
Records corresponding indices for each dense element.
`std::vector<int> _sparse;`: Maps external indices to dense positions; contains -1 where no element exists.
- `size_t _size;`: Tracks current number of elements stored.
- `size_t _capacity;`: Maximum index capacity for the sparse array.
- `size_t _denseCapacity;`: Capacity reserved for dense array storage.
- `size_t _lastInsertedSparse;`: Helper to track the last sparse index inserted (primarily useful for optimized removals).

### Methods

* `Add(size_t index, const T& value)`

Adds a new element to the sparse set under the provided `index` with the associated `value`. If the index already exists, a warning is generated and the addition is skipped.

The method will automatically resize internal containers if the capacity is reached:
- Doubles the dense array capacity if full.
- Doubles the sparse array capacity if the `index` is beyond current capacity.

```cpp
SparseSet<int> set;
set.Add(5, 42);  // Adds value 42 at index 5
```

--- 
* `Pop(size_t index)`

Removes the element at the given `index`, if present. It does this by swapping the element to remove with the last dense element and then decrementing size. This ensures efficient removal without leaving gaps.

---

* *`T* Get(const size_t index)`

Returns a pointer to the element associated with the given `index` if it exists. If no element is present at that index, returns `nullptr`.

--- 

* `T* GetFirst()` and `T* GetLast()`

Provide pointers to the first and last dense elements respectively. Return `nullptr` if the sparse set is empty.

--- 

* `bool Contains(const size_t value) const`

Returns `true` if there is an element at the given index, otherwise `false`.

---

* `bool Contains(T data) const`

Checks whether the dense array contains the specified data element. The type `T` must have equality comparison defined.

--- 

* `void Clear()`

Resets the number of stored elements to zero, logically clearing the set. Note: This does not clear the underlying storage or reset capacity.

--- 

* `int GetDenseIndex(size_t i)`

Retrieves the original sparse index corresponding to the `i`-th position in the dense array.

--- 

* `Print()` and `PrintIndex()`

Debug utilities to display contents of the dense array and sparse-to-dense index mappings on the console.
Take into account that `operator<<` need to be implemented in the class inside the `SparseSet<t>` in order to call this method or it will cause a crash. 

--- 

* `operator[]`

Provides indexed access to elements in the dense array by position. Note that this is _not_ direct access by sparse index.

### Getters

Provides access to current size and capacity metrics:
- `Size()` - number of stored elements
- `Capacity()` - capacity of the sparse array
- `DenseCapacity()` - capacity reserved for dense storage

### Iteration

`SparseSet<T>` class implements iteration by their `begin()` and `end()` methods. 

```cpp
SparseSet<int> set;
//... add elements to set
for (const auto &element : set) {
  std::cout << element << std::endl;
}
```

###  Why use an sparse set? 

Sparse sets is a data structure that has some interesting properties in terms of efficiency: 

* `O(1)` to add an item
* `O(1)` to remove an item from the list
* `O(1)` to search for an item
* `O(1)` to clear the entire set
* `O(n)` to iterate all over the set. 

