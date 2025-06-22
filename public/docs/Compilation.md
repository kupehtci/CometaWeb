
# COMETA - Compilation

Cometa Framework is a *multiplatform* videogame development framework. This imply that cometa needs a system to allow a developer to program in MacOS and Windows Operating Systems without needing to reconfigure the project for their local environment. 

Cometa Framework uses Premake5 tool (https://premake.github.io/) to configure the project once and build that configuration into an specific platform or tool. 

## Premake5 

By defining the compilation parameters in the main file (`premake5.lua`) you can then build the Cometa Framework project into someone of the following configurations:

The primary configuration file `premake5.lua`, define a workspace called Cometa with a single project, CometaGL that builds the engine as a console application. 
The system support multiple configurations (Debug and Release) together with targets for x86_64 architecture that can be shared across macOS and windows platforms. 

## MacOS Build orchestration


MacOS compilation is based in a two-tier makefile system, wheree the workspace level `Makefile` file orchestrates and give the template for the building of `CometaGL.make` file. 

This file stores the project dependencies and build order of all the files, also making sure that Glad and GLFW make files are compiled as dependencies. 

`build.sh -t {operating_system}` serves as the command main entry point to the application for building Cometa Framework in MacOS and Windows platforms. It provides a unified interface for cross-platform compilation while handling by itself the platform-specific configurations. 

```bash
# Build for macOS
./build.sh -t macos

# Build for Windows  
./build.sh -t windows

# Display help
./build.sh -h
```

Also a premake5 command `clean` is incorporated in order to remove all build-related artifacts and generated files and make a clean compilation. 
```bash
premake5 clean
```



### Build artifacts and output structure

The build process generates the following organized output in the configuration specific directories: 
```txt
bin/
├── Debug/
│   └── CometaGL                    # Debug executable
├── Release/
│   └── CometaGL                    # Release executable
└── obj/
    ├── Debug/
    │   ├── Application.o           # Core system objects
    │   ├── Renderer.o              # Rendering system objects
    │   ├── PhysicsManager.o        # Physics system objects
    │   └── ...                     # All compiled objects
    └── Release/
        └── ...                     # Release object files
```

