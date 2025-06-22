
# Buffer 

Buffer abstract base class named `Buffer`, which outlines the basic interface and structure for different types of buffers used in graphics rendering. Two classes, `VertexBuffer` and `IndexBuffer`, inherit from this base class to provide specific implementations for vertex data and index data respectively.

Buffers are essential in modern rendering pipelines: vertex buffers store information about points in 3D space such as coordinates, colors, and texture coordinates, while index buffers hold indices that specify the order in which vertices should be drawn, enabling efficient reuse of vertex data.

This class sets some aspects and properties that each subclass that implements a buffer in the rendering backed API should implement: 

- `_uid` (protected): A unique identifier for each buffer instance. This ID typically corresponds to the OpenGL internal reference for managing the specific buffer.
- `virtual ~Buffer()`: A virtual destructor, ensuring proper cleanup of derived classes.
- `virtual void Bind() = 0;`: Pure virtual function to bind the buffer to the graphics pipeline, making it active for subsequent operations. Must be implemented by derived classes.
- `virtual void Unbind() = 0;`: Pure virtual function to unbind or deactivate the buffer.
- `uint32_t GetUid() const;`: Inline getter that returns the unique ID of the buffer.