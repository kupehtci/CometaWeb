# OpenGL Workflow

OpenGL is a rendering backend interface, defined by the Kronos group to abstract the implementation of Hardware-specific code to an accessible and reusable manner between different Operating systems and hardware combinations.

Although OpenGL offers a fine-grained control over the graphics pipeline, requires developers to manage lots of complexity by themselves. Also, introduces lots of boilerplate code that is repeated along the application, leading into an Error-prone

This control has a drawback; it introduces lots of repeated code among the application in order to repeat the same actions.

OpenGL’s normal workflow imply the following steps:

1.     Initialize OpenGL rendering and set the properties for the type of GPU, Operating system and extensions.
2.     Create the Window or surface that defines a framebuffer together with GPU information and initializes the swapchain attached to it in order to swap buffers with the graphics card.
3.     Load shaders from a file or directly embended into the code. Join them into a Shader Program and compile it.
4.     Set the Vertex Array Object (VAO) together with the consequent Vertex Buffer Objects (VBO) and the Index Buffer Object (EBO) that define a geometry, colors, texture coordinates and normals.
5.     Set the layout for the VAO that defines the structure of the data contained within it and pass other variables as uniforms to the shader.
6.     Draw call with all the previously generated resources binded
7.     Call the swap buffers command to swap the frame buffer with the current screen

The first step to define the geometry that the developer must do includes definind the data required for the rendering process and send it to the GPU.

This data normally includes vertex attributes that need to define the appearance of the geometry that will be rendered. This attributes of the different points of an object need to be stores in GPU memory buffers that are called _Vertex Buffer Objects_ (VBO). This buffers attributes need to be associated between them normally with indices. These integers specify how the different vertex attributes work together and join to conform a “Mesh”.

To manage these indices, they are binded into _Element Buffer Objects_ (EBO), coupled together with the VBO to conform Vertex Array Objects (VAOs). This element can be stored and binded and unbinded on demand during the rendering to switch the current rendering mesh.

EBOs allow to define triangles or other geometry primitives conformed by different vertices without redefining them.

The shape of a geometry is not only defined by the mesh, as it only will define the collection of points that are grouped to form lines or triangles. In addition to this shape, more attributes are normally defines to conform a more complex visual object.

So normally an geometry is defined by the following attributes:

·       **Position**: represent the position in non-normalized coordinates in the scene.

·       **Colour**: visual colour to be used on that vertex rendering.

·       **Texture coordinates (UV)** that define the relationship between that point and a coordinate in the texture mapped to it.

·       **Normal vecto**r that indicates the perpendicular to the surface that define which side the mesh’s face is looking at.

These attributes are all joined into a single VBO, but GPU doesn’t understand the purpose and influence of each one of this values into the rendering process.

Shaders are GLSL user-defined programs that runs on GPU to provide functionality to some programmable stages of the rendering pipeline. The pipeline performs a series of tasks to transform the data from the vertex array object’s data up to the pixels that are showed on screen. This involve four main stages:

1.     **Application stage** imply the previous steps of defining the data composition that is passed into the GPU, as well as textures, colors, uniforms and proyections that would be analysed in the following sections.

2.     **Geometry processing** step determine the position of each vertex in the screen to be rendered and its defined in the _Vertex Shader_. It need to define the final position of the vertex in normalized coordinates (From (-1.0, -1.0f) up to (1.0, 1.0). Also if other data is passed to the shader program using the VBOs, it need to be transformed in this step and passes though the following shaders.

3.     **Rasterization stage** determine the raster position or pixel that correspond in two-dimensional screen to the vertex that were previously settled.

4.     **Fragment processing** step determine the visual properties or colour of each pixel that is rendered. This colour is settled through the Fragment shader, that define this property by binding a texture, colour attribute passed by VBO, result of the lightning reflections of some light sources.

A good example of workflow for basic 2D rendering shader technique is passing vertex position, color and texture coordinates through VAO into the shader. Set the vertex position in the vertex shader and pass the color and texture coordinates to the fragment shader that will map the texture settled via uniform into the fragment colour (FragColor). This implementation can be seen in the following figure:

![[./IMAGES/frag_vs_vertex_shaders.png]]

Direct buffer input using a VAO is not the only way to pass data into a shader. In the previous defined Fragment Shader, the texture is passed as a sampler2D uniform value. _Uniforms_ are values that can be accessed anywhere from the shader and are immutable during the shader execution. Also in the application stage, uniform values need to be set per shader compiled.

As can be seen in the following figure, a set of 4 vertex with position and texture coordinates, coupled with a texture image and a Index Buffer (0, 1, 3 and 1, 2, 3) that define the indices that joined form a set of triangles, passed through the previous figure Shader program that define the rendering pipeline, can form a perfect quad for an image:

![[./IMAGES/rendering_quad.png]]

OpenGL works as an state machine. It maintains an internal set of variables or states that control how rendering operations are made and executed. Developer can change the state that is set and it will persist until is modified. This imply certain thing like active texture, active buffers, shaders loaded, drawing modes needs to be settled and take into account which one is configured while doing other operations.

This allows to avoid setting all the environment before each draw call but has a huge drawback, debugging can be really hard. As you don’t have control over the entire OpenGL’s state at each time, finding errors became more difficult.