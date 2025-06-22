# Material

`Material` class define the surface properties for the 3D rendering. This properties include colors, textures (Combining diffuse, specular and emission) and shinnies. 

Also each material has a `shader` object associated together, that define the rendering pipeline that will transform the material data into rendering on the screen. 

This class can be instantiated as follows: 
```cpp
std::shared_ptr<Material> material0 = std::make_shared<Material>(
							glm::vec3(1.0f, 1.0f, 1.0f),
							glm::vec3(1.0f, 0.5f, 0.31f),
							glm::vec3(1.0f, 0.5f, 0.31f),
							glm::vec3(0.5f, 0.5f, 0.5f),
							64.0f,
							"resources/bricks_diffuse_map.jpg",
							"resources/bricks_specular_map.jpg",
							"resources/black.jpg");

material0->LoadShader("Main Shader",
	"src/render/shaders/blinn_phong_shader.vert",
	"src/render/shaders/blinn_phong_shader.frag");
```

It uses the fully provided constructor for the class: 
```cpp 
Material(glm::vec3 color, glm::vec3 ambient, glm::vec3 diffuse, glm::vec3 specular, float shininess,  
    const std::string& diffuseMapPath, const std::string& specularMapPath, const std::string& emissionMapPath)
```

For texture management of the material: 
- `LoadDiffuseMap(path)`: loads a diffuse map and mark it as enabled
- `LoadSpecularMap(path)`: loads an specular map and mark it as enabled
- `LoadEmissionMap(path)`: loads an emissive map and mark it as enabled
- `HasDiffuseMap()`: check if the diffuse map is loaded and enabled
- `HasSpecularMap()`: check if the specular maps is loaded and enabled
- `HasEmissionMap()`: check if the emission map is loaded and mark it as enabled

For shader control and loading: 
* `LoadShader(Shader& shader)`: loads an existing shader into the material
* `LoadShader(string name, string vertexPath, string fragmentPath)`: loads the shader from a file by loading the vertex and fragment shaders. 
* `UnsetShader()`: detach the shader from the material. 

## Properties

These are the properties of `Material` class: 

### Phong Material Parameters

|Type|Property|Default|Description|
|---|---|---|---|
|`glm::vec3`|`color`|`(1.0, 1.0, 1.0)`|Base albedo color|
|`glm::vec3`|`ambient`|`(1.0, 0.5, 0.32)`|Ambient lighting factor|
|`glm::vec3`|`diffuse`|`(1.0, 0.5, 0.32)`|Diffuse lighting factor|
|`glm::vec3`|`specular`|`(0.5, 0.5, 0.5)`|Specular highlight color|
|`float`|`shininess`|`256.0`|Specular exponent (more high imply more specular reflections)|

### Texture Maps

Texture maps are textures loaded from an image that determine the colors and light reflections in a material's surface. 

|Type|Property|Description|
|---|---|---|
|`std::shared_ptr<Texture>`|`diffuseMap`|Albedo texture that define the main colour of the surface|
|`std::shared_ptr<Texture>`|`specularMap`|Specular intensity/color in greyscale. Determine the parts of the surface that shines more in reflection of light|
|`std::shared_ptr<Texture>`|`emissionMap`|Self-illumination texture. It will glow on the material's surface|

### Shader

| Type                      | Property | Description                          |
| ------------------------- | -------- | ------------------------------------ |
| `std::shared_ptr<Shader>` | `shader` | Linked shader program for rendering. |