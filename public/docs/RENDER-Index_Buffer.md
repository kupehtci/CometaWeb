
# Index Buffer

This class handles index data which defines how vertices are assembled into primitives like triangles. Index buffers enable efficient reuse of vertex data and help reduce memory usage and increase performance.

This class inherits from `Buffer` abstract class. 

### Properties: 

* `_count`: Holds the number of indices contained by the buffer. This is useful for drawing operations that require knowledge of how many indices to process.

### Creation

It highly recommendable to do an initialization-first constructor method to create the class initialized. 

- `IndexBuffer()`: Default constructor creating an empty index buffer.
- `IndexBuffer(uint32_t* indices, uint32_t size)`: Creates an index buffer initialized with an array of unsigned integers representing the indices.


### Manipulation methods

- `void Bind()`: Binds the index buffer to the pipeline making it the current buffer used for indexed drawing.
- `void Unbind()`: Unbinds the index buffer from the pipeline.
- `uint32_t GetCount() const;`: Returns the number of indices stored, which is often necessary to specify how many vertices to draw.

A good example of Index Buffer declaration and usage: 
```cpp
uint32_t indices[] = {0, 1, 2, 2, 3, 0};
IndexBuffer ib(indices, sizeof(indices) / sizeof(uint32_t));
ib.Bind();
// Render using indexed drawing with ib.GetCount()
ib.Unbind();
```


### Take into account

Both `VertexBuffer` and `IndexBuffer` provide a binding mechanism for the rendering pipeline to use the stored data during draw calls.