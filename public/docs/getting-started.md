# COMETA

Cometa Framework is custom Game Development Framework built from scratch using OpenGL as the RendererAPI and GLFW + GLAD to handle modern OpenGL. 

This engine is intended to provide a foundation or a base for common game features such as rendering, advanced input handling and scene management. 

### Features

* Cometa Render: Provides a robust rendering system with support for rendering Meshed and materials integrated with dynamic lightning and shadows out-of-the-box.
* OpenGL Rendering: Efficient rendering pipeline with integrated and custom GLSL shaders. 
* GLFW for window management: Handle the window creation and input. 
* GLAD for moder OpenGL Loading: Ensures the cross platform compatibility when loading OpenGL functions. 
* Entity Component System or ECS: Modular and efficient instances handling. 
* ImGUI Integration: Integration with in-engine debugging and functionalities using UI.
* Basic Math Library GLM: Integration with commmon math library GLM to perform advanced operations of transforms. 
* Cross-Platform Compatibility: By using Premake5 and different shell scripting it works in Windows and MacOS.
* Layer system: Modular design allowing for easy customization and extension.
* Scene Management: System to handle different scenes and their components.
* Input Handling: System to handle user input and events.

## Getting Started

Cometa Framework is stored in Github and it is recommended to clone the repository and use it as a submodule.
As Cometa use other repositories and systems as dependencies and this ones are handled as git submodules, in order to pull them together clone the repository: 

```bash
git clone --recurse-submodules https://github.com/kupehtci/Cometa.git
```

Or in case you only want to use Cometa Render and not the whole game developement framework, you can clone only the Cometa Render repository:
```bash
git clone --recurse-submodules https://github.com/kupehtci/CometaRender.git
```

The following steps needs to be done depending on the OS you are using:

### MacOS Getting Started 
To get started with Cometa, you will need to have the following installed: 
* Premake5

Once you have Premake5 installed, you can clone the repository and generate the project files: 
```bash
premake5 gmake --cc=gcc --os=macosx
make config=debug
```

Or even use the built-in script that will automatically generate the project files and compile: 
```bash
./build.sh -t macos
```

### Windows Getting Started
Cometa Framework is also available for Windows. 
To get started, Cometa offer a built-int premake5.exe executable that will generate the project files for you.
To use it you need to use the built-in script: 
```bash
./build.sh -t windows
```

### Current State

Cometa Framework and Render are already in version 1.0.0, fully available and ready to start implementing yout videogame.

### License
Both Cometa Render and Cometa Framework are under MIT LICENCE.

### Author
Daniel Laplana Gimeno