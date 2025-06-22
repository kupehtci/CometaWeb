#COMETA 

# COMETA - Shaders

Cometa allow shaders written in GLSL as OpenGL's standar language for GPU integration of the pipeline. 

Some classes built in Cometa use parameters and variables defined in the shaders that need to be preserved for a correct behaviour of this classes. 

This is an standard naming convention for Cometa for using the different classes: 

### Materials

Material's variables affect directly into the shaders by affecting the shinnies, color, texture, specular reflections of an object. 



How a texture included in a Material is blended in the object is defined by the Texture Coordinates (TexCoord) defined in each one of the vertex. 

### Shaders debug

In case a shader is not correctly formed or has some compilation errors, on execution console you can view the different shader compilation errors: 

Example
```bash
ERROR::SHADER::COMPILATION_FAILED
ERROR: 0:76: Use of undeclared identifier 'num_lights'
```

This will show the errors that OpenGL's GLSL compiled detect upon program compilation. 
