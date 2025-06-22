
As you may recall from the _OpenGL_ chapter, the glClearColor function is a _state-setting_function and glClear is a _state-using_ function in that it uses the current state to retrieve the clearing color from.

To pass memory data as a buffer that can be then sent completely into the GPU, we create the Vertex Buffer Objects or VBOs. 

```cpp
// Generate the buffer  
unsigned int VBO; 
glGenBuffers(1, &VBO);

// Bind to it the type of buffer
glBindBuffer(GL_ARRAY_BUFFER, VBO);
// after this point, all calls maked over the GL_ARRAY_BUFFER will end in that buffer

// with this function we call the vertices we have previously defined into the buffer
glBufferData(GL_ARRAY_BUFFER, sizeof(vertices), vertices, GL_STATIC_DRAW);

```

The fourth parameter of that function defines the type of data that is copied into the buffer: 

- GL_STREAM_DRAW: the data is set only once and used by the GPU at most a few times.
- GL_STATIC_DRAW: the data is set only once and used many times.
- GL_DYNAMIC_DRAW: the data is changed a lot and used many times.


##### Shader creation process

Shader creation in OpenGL involves the following steps:

1. Create vertex shader: 

Shader Source is the source code of the shader itself and you need to Create the shader, indicate the source and compile the shader. 

```cpp
vertexShaderID = glCreateShader((GLenum)GL_VERTEX_SHADER);  
glShaderSource(vertexShaderID, 1, &vertexShaderSource, NULL);  
glCompileShader(vertexShaderID);
```




Extra: You can check if a shader compilation has failed this way, using `glGetShaderiv()` function: 

```cpp
// Error handling variables  
int  success;  
char infoLog[512];

// Check if shader compilation was sucessfull  
glGetShaderiv(vertexShaderID, GL_COMPILE_STATUS, &success);  
  
if(!success)  
{  
    glGetShaderInfoLog(vertexShaderID, 512, NULL, infoLog);  
    std::cout << "ERROR::SHADER::VERTEX::COMPILATION_FAILED\n" << infoLog << std::endl;  
}  
else{  
    std::cout << "Successful vertex shader compilation" << std::endl;  
}
```

##### Vertex attributes

The vertex shader allow you to specify the type and format of the input. 

You need to **manually** set this type of data as follows: 

```cpp
glVertexAttribPointer(0, 3, GL_FLOAT, GL_FALSE, 3 * sizeof(float), (void*)0);
glEnableVertexAttribArray(0); 
```

The parameters are the following: 

* The first one indicate the position of the vertex attribute types that then is selected in the vertex shader using: 

```shader
layout (location = 0) in vec3 aPos;
```

* The next one specify the size (in values) of each vertex attribute. Each vec3 has 3 values so its 3
* The next argument specify the type of value that is stored within each value, in this case `GL_FLOAT`. 
* The next boolean indicates if the data needs to be normalized in case that we are passing byte or int values when casting to float. In this case we dont need it so its `GL_FALSE`. 
* The next value is the `stride` or the space in bits of a vertex attribute. In this case because we are passing 3 floats is `3 * sizeof(float)` . If values are packed together without space between them, you can set this to 0 and let OpenGL to determine the size of each element
* Last parameter is the offset of where the data begins in the buffer. As we have no offset we specify 0 but casting to `void*` because is the data type of this parameter. 

The data of this vertex attribute type is taking from the VBO and in this case its settled to the object currently attached to the GL_ARRAY_BUFFER. 

And finally `glEnableVertexAttribArray(0)`  to indicate that we enable that vertex attribute. 


#### VAO

If we want to handle more than one VBO for drawing more than 1 object into the screen, we should have a method to group them. 
This is called **Vertex Array Object** or **VAO**. 

This object can be bounded as a vertex buffer and any subsequent vertex attribute call will be stored inside the VAO. 





---


how to check for GL errors: 

```cpp
static bool GLCheckError()
{
    while (GLenum error = glGetError())
    {
        
        std::cout << "[OpenGL Error] ";
          switch(error) {
              case GL_INVALID_ENUM :
                  std::cout << "GL_INVALID_ENUM : An unacceptable value is specified for an enumerated argument.";
                  break;
              case GL_INVALID_VALUE :
                  std::cout << "GL_INVALID_OPERATION : A numeric argument is out of range.";
                  break;
              case GL_INVALID_OPERATION :
                  std::cout << "GL_INVALID_OPERATION : The specified operation is not allowed in the current state.";
                  break;
              case GL_INVALID_FRAMEBUFFER_OPERATION :
                  std::cout << "GL_INVALID_FRAMEBUFFER_OPERATION : The framebuffer object is not complete.";
                  break;
              case GL_OUT_OF_MEMORY :
                  std::cout << "GL_OUT_OF_MEMORY : There is not enough memory left to execute the command.";
                  break;
              case GL_STACK_UNDERFLOW :
                  std::cout << "GL_STACK_UNDERFLOW : An attempt has been made to perform an operation that would cause an internal stack to underflow.";
                  break;
              case GL_STACK_OVERFLOW :
                  std::cout << "GL_STACK_OVERFLOW : An attempt has been made to perform an operation that would cause an internal stack to overflow.";
                  break;
              default :
                  std::cout << "Unrecognized error" << error;
          }
          std::cout << std::endl;
          return false;
    }
    return true;
}
```