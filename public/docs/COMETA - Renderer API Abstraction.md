

### Buffers Abstraction

Most Rendering APIs like OpenGL, Vulkan or DirectX depend on the use of buffers to improve the exchange of data between the CPU and GPU using the VRAM or VideoRam (TODO REVISE)

In order to be able to abstract the usage of Buffers from the rendering API, the `Buffer` class is designed to be implemented then by the Rendering Wrapping for each type of Buffer that is offers. 


### Layout abstraction 

Layouts in Rendering specify how the data is structured in the shaders and in memory in order to be used by the GPU. 

They are mainly used for: 

* Vertex Attributes: Example: `layout(location = 0) in vec3 position`
* Uniform buffer layouts: `layout(std140) uniform DataBlock { ... }`
* **Image bindings:** `layout(binding = 0) uniform sampler2D myTexture;`

This layouts, `VkPipelineLayout` in the case of Vulkan or `ID3D11InputLayout` in the case of DirectX, need to define how the vertex buffer data is structured. 
This imply that if in the same data structure from a buffer, the Game Engine pass the vertex position, colours, texture coordinates and more to the GPU, the data structure in the buffer need to be set, in order to the GPU to be interpreted. 

In case of OpenGL, it use `glVertexAttribPointer()` function to define each data structure passed into the GPU and store it in a layout position. 

```cpp
 // position attribute
 glVertexAttribPointer(0, 3, GL_FLOAT, GL_FALSE, 8 * sizeof(float), (void*)0);
 glEnableVertexAttribArray(0);

 // color attribute
 glVertexAttribPointer(1, 3, GL_FLOAT, GL_FALSE, 8 * sizeof(float), (void*)(3 * sizeof(float)));
 glEnableVertexAttribArray(1);
 
 // texture coord attribute
 glVertexAttribPointer(2, 2, GL_FLOAT, GL_FALSE, 8 * sizeof(float), (void*)(6 * sizeof(float)));
 glEnableVertexAttribArray(2);
```

Because this data is stored in the same buffer, we need to set the size of each data (stride), the offset of each one and the type of data stored (float, int, vectors, mat4 and more).

A good approach to abstract this from the RendererAPI declaration, would be a common format to declare the structure of each buffer layout element, something like this: 

```cpp
BufferLayouts layout = {
	{DataType::Float3, "_position"},
	{DataType::Float4, "_color" }
}
```

And from this declaration, each layout element's property can be infered: (Length (stride), offset, position, type of data). 

In order to be able to define this type of structure declaration that is more visual than: 

```cpp
Layout layout0 = {DataType::Float3, "_position", sizeof(float) * 8, 0}
Layout layout1 = {DataType::Float4, "_color_", sizeof(float) * 8, 0}
BufferLayout bLayouts; 
bLayouts->Attach(layout0);
bLayouts->Attach(layout1); 
```

### Vulkan vertex structure

To define the structure of a shader's position attribute for example:

```cpp 
struct Vertex {
    glm::vec3 position; // Matches layout(location = 0) in vec3 position;

    static VkVertexInputBindingDescription getBindingDescription() {
        VkVertexInputBindingDescription bindingDescription{};
        bindingDescription.binding = 0; // Binding index in the shader
        bindingDescription.stride = sizeof(Vertex); // Size of a vertex
        bindingDescription.inputRate = VK_VERTEX_INPUT_RATE_VERTEX;
        return bindingDescription;
    }

    static std::array<VkVertexInputAttributeDescription, 1> getAttributeDescriptions() {
        std::array<VkVertexInputAttributeDescription, 1> attributeDescriptions{};

        // Position attribute (matches layout(location = 0) in shader)
        attributeDescriptions[0].binding = 0; // Same binding as in binding description
        attributeDescriptions[0].location = 0; // Matches "layout(location = 0)"
        attributeDescriptions[0].format = VK_FORMAT_R32G32B32_SFLOAT; // vec3
        attributeDescriptions[0].offset = offsetof(Vertex, position);

        return attributeDescriptions;
    }
};
```


