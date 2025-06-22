
# Vertex Buffer

This class manages vertex data buffer sent to the GPU. Its main function is to hold vertices that describe geometrical shapes, which can then be rendered by the graphics pipeline.

It inherits from Buffer abstract class. 

### Creation

Its highly recommendable to do initialization-first constructors for building the Vertex Buffer, so its automatically created with the data and binded. 

- `VertexBuffer()`: Default constructor; creates an empty vertex buffer object with default parameters.
- `VertexBuffer(uint32_t size)`: Constructs a vertex buffer object of a specified size without initial data, useful for dynamically updating vertex data.
- `VertexBuffer(float* vertices, uint32_t size)`: Constructs and initializes the vertex buffer with a given array of vertices. This buffer is marked for static drawing, which means it is optimized for data that won’t change frequently.

The creacion and binding of the vertex buffer can be done as follows: 

```cpp 
float vertices[] = {0.0f, 0.0f, 0.0f, 1.0f, 1.0f, 0.0f};
VertexBuffer vb(vertices, sizeof(vertices));
vb.Bind();
// issue draw calls ...
vb.Unbind();
```