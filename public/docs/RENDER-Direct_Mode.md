# Cometa Render - Direct Mode

**Direct mode** is one of the modes of use of Cometa Render. 
It imply that you don`t let Cometa Render's subsystems to generate and input the data to the built-int shaders and you configure and manage the pipeline directly using Cometa's classes. 


An example of direct graphics is the following: 

```cpp


// Load a shader
_mat.LoadShader("Main Shader",  
    "src/render/shaders/light_map_shader.vert",  
    "src/render/shaders/light_map_shader.frag");  
  
_mat.Bind();  
std::shared_ptr<Shader> mainShader = _mat.GetShader();  
  
glm::vec3 lightPosition = glm::vec3(3.0f, 1.0f , glm::cos(glfwGetTime()) * 3 );  
  
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
  
float distance = glm::length(lightPosition - _camera.GetPosition());  
float attenuation = 1.0 / (1.0f + 0.14f * distance + 0.07 * (distance * distance));  
std::cout << "distance: " << distance << std::endl;  
std::cout << "attenuation: " << attenuation << std::endl;  
  
  
  
mainShader->SetFloat3("directionalLight.direction", glm::vec3(-0.2f, -1.0f, -0.3f));  
mainShader->SetFloat3("directionalLight.ambient", glm::vec3(0.05f, 0.05f, 0.05f));  
mainShader->SetFloat3("directionalLight.diffuse", glm::vec3(0.35f, 0.4f, 0.35f));  
mainShader->SetFloat3("directionalLight.specular", glm::vec3(0.5f, 0.5f, 0.5f));  
  
// Update camera and its projection  
_camera.OnUpdate();  
mainShader->SetMatrix4("uViewProjection", _camera.GetViewProyection());  
mainShader->SetFloat3("uViewPos", _camera.GetPosition());  
  
  
glm::mat4 modelRotated = glm::translate(glm::mat4(1.0f), glm::vec3(0.0f, 0.0f, -3.0f));  
mainShader->SetMatrix4("uModel", modelRotated);  
  
  
float vertices[] = {  
    // Front face  
    // positions          // normals           // colors            // texture coords    -0.5f, -0.5f,  0.5f,  0.0f,  0.0f,  1.0f,  1.0f, 0.0f, 0.0f,  0.0f, 0.0f,  
    0.5f, -0.5f,  0.5f,  0.0f,  0.0f,  1.0f,  1.0f, 0.0f, 0.0f,  1.0f, 0.0f,  
    0.5f,  0.5f,  0.5f,  0.0f,  0.0f,  1.0f,  1.0f, 0.0f, 0.0f,  1.0f, 1.0f,  
    -0.5f,  0.5f,  0.5f,  0.0f,  0.0f,  1.0f,  1.0f, 0.0f, 0.0f,  0.0f, 1.0f,  
  
    // Back face  
    -0.5f, -0.5f, -0.5f,  0.0f,  0.0f, -1.0f,  0.0f, 1.0f, 0.0f,  1.0f, 0.0f,  
    -0.5f,  0.5f, -0.5f,  0.0f,  0.0f, -1.0f,  0.0f, 1.0f, 0.0f,  1.0f, 1.0f,  
    0.5f,  0.5f, -0.5f,  0.0f,  0.0f, -1.0f,  0.0f, 1.0f, 0.0f,  0.0f, 1.0f,  
    0.5f, -0.5f, -0.5f,  0.0f,  0.0f, -1.0f,  0.0f, 1.0f, 0.0f,  0.0f, 0.0f,  
  
    // Top face  
    -0.5f,  0.5f, -0.5f,  0.0f,  1.0f,  0.0f,  0.0f, 0.0f, 1.0f,  0.0f, 1.0f,  
    -0.5f,  0.5f,  0.5f,  0.0f,  1.0f,  0.0f,  0.0f, 0.0f, 1.0f,  0.0f, 0.0f,  
    0.5f,  0.5f,  0.5f,  0.0f,  1.0f,  0.0f,  0.0f, 0.0f, 1.0f,  1.0f, 0.0f,  
    0.5f,  0.5f, -0.5f,  0.0f,  1.0f,  0.0f,  0.0f, 0.0f, 1.0f,  1.0f, 1.0f,  
  
    // Bottom face  
    -0.5f, -0.5f, -0.5f,  0.0f, -1.0f,  0.0f,  1.0f, 1.0f, 0.0f,  0.0f, 1.0f,  
    0.5f, -0.5f, -0.5f,  0.0f, -1.0f,  0.0f,  1.0f, 1.0f, 0.0f,  1.0f, 1.0f,  
    0.5f, -0.5f,  0.5f,  0.0f, -1.0f,  0.0f,  1.0f, 1.0f, 0.0f,  1.0f, 0.0f,  
    -0.5f, -0.5f,  0.5f,  0.0f, -1.0f,  0.0f,  1.0f, 1.0f, 0.0f,  0.0f, 0.0f,  
  
    // Right face  
    0.5f, -0.5f, -0.5f,  1.0f,  0.0f,  0.0f,  1.0f, 0.0f, 1.0f,  1.0f, 0.0f,  
    0.5f,  0.5f, -0.5f,  1.0f,  0.0f,  0.0f,  1.0f, 0.0f, 1.0f,  1.0f, 1.0f,  
    0.5f,  0.5f,  0.5f,  1.0f,  0.0f,  0.0f,  1.0f, 0.0f, 1.0f,  0.0f, 1.0f,  
    0.5f, -0.5f,  0.5f,  1.0f,  0.0f,  0.0f,  1.0f, 0.0f, 1.0f,  0.0f, 0.0f,  
  
    // Left face  
    -0.5f, -0.5f, -0.5f, -1.0f,  0.0f,  0.0f,  0.0f, 1.0f, 1.0f,  0.0f, 0.0f,  
    -0.5f, -0.5f,  0.5f, -1.0f,  0.0f,  0.0f,  0.0f, 1.0f, 1.0f,  1.0f, 0.0f,  
    -0.5f,  0.5f,  0.5f, -1.0f,  0.0f,  0.0f,  0.0f, 1.0f, 1.0f,  1.0f, 1.0f,  
    -0.5f,  0.5f, -0.5f, -1.0f,  0.0f,  0.0f,  0.0f, 1.0f, 1.0f,  0.0f, 1.0f  
};  
  
unsigned int indices[] = {  
    0,  1,  2,    2,  3,  0,   // Front  
    4,  5,  6,    6,  7,  4,   // Back  
    8,  9,  10,   10, 11, 8,   // Top  
    12, 13, 14,   14, 15, 12,  // Bottom  
    16, 17, 18,   18, 19, 16,  // Right  
    20, 21, 22,   22, 23, 20   // Left  
};  
  
Mesh mesh0 = Mesh();  
mesh0.AddVertices(vertices, sizeof(vertices) / sizeof(float));  
mesh0.AddIndices(indices, sizeof(indices) / sizeof(uint32_t));  
mesh0.SetLayoutBuffer(  
{  
    {0, DataType::Float3, "aPos"},  
    {1, DataType::Float3, "aNormal"},  
    {2, DataType::Float3, "aColor"},  
    {3, DataType::Float2, "aTexCoord"}  
    });  
mesh0.Build();  

  
  
// ------------------ DRAW MORE CUBES ---------------------------  
for (int i = 0; i < 6; i++)  
{  
    mainShader->SetMatrix4("uModel", glm::translate(glm::mat4(1.0f), glm::vec3(1.0f + i, 0.0f, -4.0f - i)));  
    mesh0.Draw();  
}  
  
for (int i = 0; i < 6; i++)  
{  
    mainShader->SetMatrix4("uModel", glm::translate(glm::mat4(1.0f), glm::vec3(1.0f + i, 1.0f, -5.0f - i)));  
    mesh0.Draw();  
}  
// ------------------ END OF DRAWING MORE CUBES ---------------------------  
  
  
mainShader->Unbind();  
  
  
// --------- Draw LIGHT POINT ---------  
  
mesh0.Bind();  
std::shared_ptr<Shader> lightShader = Shader::LoadShader("Light Shader", "src/render/shaders/light_shader.vert", "src/render/shaders/light_shader.frag"); 
lightShader->Bind();  
  
lightShader->SetMatrix4("uViewProjection", _camera.GetViewProyection());  
glm::mat4 lightPosMatrix = glm::translate(glm::mat4(1.0f), lightPosition);  
lightPosMatrix = glm::scale(lightPosMatrix, glm::vec3(0.2f, 0.2f, 0.2f));  
  
lightShader->SetMatrix4("uModel", lightPosMatrix);  
  
// mesh0.Draw();  
  
lightShader->Unbind();  
  
// --------- END OF DRAWING LIGHT POINT ---------  
  
// --------- DRAWING SECOND LIGHTS FOR TESTING MULTIPLES LIGHTS ------------  
  
mesh0.Bind();  
// std::shared_ptr<Shader> lightShader = Shader::LoadShader("Light Shader", "src/render/shaders/light_shader.vert", "src/render/shaders/light_shader.frag"); // new Shader("Light Shader", "src/render/shaders/light_shader.vert", "src/render/shaders/light_shader.frag");  
lightShader->Bind();  
  
lightShader->SetMatrix4("uViewProjection", _camera.GetViewProyection());  
lightPosMatrix = glm::translate(glm::mat4(1.0f), -lightPosition);  
lightPosMatrix = glm::scale(lightPosMatrix, glm::vec3(0.2f, 0.2f, 0.2f));  
  
lightShader->SetMatrix4("uModel", lightPosMatrix);  
  
// mesh0.Draw();  
  
lightShader->Unbind();
```