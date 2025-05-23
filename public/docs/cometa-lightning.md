#COMETA 

# COMETA - Lightning

You can define the lights using the array of light structs composed in the Fragment shader: 

```c
struct Light {  
    vec3 position;  
  
    vec3 ambient;  
    vec3 diffuse;  
    vec3 specular;  
  
    float constant;  
    float linear;  
    float quadratic;  
};
```

This struct define a light inside the shader and its properties that will affect the reflected lights in the scene. 

This struct define the typical properties of a point light in a Phong style lightning model: 

* **position**: world space position of the light. Used in computing the light angle of reflection

* **ambient**: simulate the ambient light color, an indirect scattered light that is always present. Its recommended to set a low value, from 0.1f to 0.3f. 

* **diffuse**: diffuse light color used in reflection. It simulates the direct light reflected in the surfaces that face the light. 

* **specular**: specular light for a phong or blinn-phong reflection that simulate the shiny highlight in a surface and depends directly on the view direction and the reflected vector calculated by the light position and the reflected surface normal. 

The following values, constant, linear and quadratic; are attenuation values used to simulate in an algorithm the attenuation factor with a high decay. 

* constant: define the base value of the attenuation
* linear: represent the linear falloff and its multiplied by the distance
* quadratic: represents a high decay and is multiplied by the distance pow 2. 


By default the maximum number of lights per shader in the built-in shader is set to 16. If you want to set more than 16 lights you can modify this value (Recommended to a power of 2): 

```c
#define MAX_LIGHTS_CONSTANT 16
```

### Direct mode

If rendering in the direct mode, in order to modify and set the different properties of the `lights` uniform array you can define it accessing and setting each one of the lights. 

This can be set using SetFloat and SetInt methods of the shader to modify the *uniform* values: 

```cpp
mainShader->SetInt("number_lights", 2);  
mainShader->SetFloat3("lights[0].position", lightPosition);  
mainShader->SetFloat3("lights[0].ambient", glm::vec3(0.2f, 0.2f, 0.2f));  
mainShader->SetFloat3("lights[0].diffuse", glm::vec3(0.7f, 0.7f, 0.7f));  
mainShader->SetFloat3("lights[0].specular", glm::vec3(1.0f, 1.0f, 1.0f));  
  
mainShader->SetFloat("lights[0].constant", 1.0f);  
mainShader->SetFloat("lights[0].linear", 0.07f);  
mainShader->SetFloat("lights[0].quadratic", 0.017f);  
  
mainShader->SetFloat3("lights[1].position", -lightPosition);  
mainShader->SetFloat3("lights[1].ambient", glm::vec3(0.2f, 0.2f, 0.2f));  
mainShader->SetFloat3("lights[1].diffuse", glm::vec3(0.7f, 0.7f, 0.7f));  
mainShader->SetFloat3("lights[1].specular", glm::vec3(1.0f, 1.0f, 1.0f));  
  
mainShader->SetFloat("lights[1].constant", 1.0f);  
mainShader->SetFloat("lights[1].linear", 0.07f);  
mainShader->SetFloat("lights[1].quadratic", 0.017f);
```

You need to define the `number_lights` int property with the number of lights that are added to the shader. 

