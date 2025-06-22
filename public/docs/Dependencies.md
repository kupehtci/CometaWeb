# Cometa Framework Dependencies

These are the different compilation methodolodies used in `premake5` within Cometa Framework to import the different libraries

| Library  | Purpose              | Integration                                  |
|----------|----------------------|----------------------------------------------|
| OpenGL   | Rendering API        | Linked via GLAD/GLFW, platform-specific      |
| GLAD     | OpenGL loader        | Included and linked                          |
| GLFW     | Window/input/context | Included and linked                          |
| ImGui    | GUI                  | Included and linked                          |
| Assimp   | Model loading        | Included and linked (Dynamic dll and static library)                          |
| STB Image| Image loading        | Included and linked (header-only)                          |
| GLM      | Math                 | Header-only, included                        |