
# Premake5

**Premake5** is the building configuration tool that allows Cometa Framework to be compiled and exported to other IDE or Compilation formats depending on the operating system where is compiled. 

In addition to the compilation, also the dependency binding are configured depending on the platform that is being built to. 

### Overview

Premake5 is a build configuration tool that generates native build files for various platforms from a single, declarative script (`premake5.lua`). 
This simplifies the process of building software across multiple operating systems.

### Key Concepts

The main structure of the file is composed by the following components: 
*   **Workspace:** A container for one or more projects. Each set of projects that compose an application need a workspace. 
*   **Project:** Represents a single buildable entity that will generate either a executable or a library. 
*   **Configurations:** Build settings for different scenarios, that can be Debug or Release
*   **Filters:** Platform-specific or configuration-specific settings. This filters can be use to set specific configurations depending on the architecture or the operating system that the application is being built for. 

## Implementation Details

In this section, the different properties of the built-in configuration in `premake5.lua` file for Cometa Framework are detailed

### Workspace and Configurations

```lua
workspace "Cometa"
    configurations { "Debug", "Release" }
    architecture "x86_64"

-- Defines the project workspace named "Cometa".
-- Specifies two build configurations: "Debug" and "Release".
-- Sets the target architecture to 64-bit.
```
### Project Definition

Within Cometa workspace, the main project is defined as an executable file output: 

```lua
project "CometaGL"
    kind "ConsoleApp"
    language "C++"
    cppdialect "C++17"


-- Defines a project named "CometaGL".
-- Specifies that it's a console application.
-- Sets the language to C++.
-- Specifies the C++17 standard.
```

### Include Directories

The include directories is an array of directories for storing the main `include` directories of the different dependencies of the project that are common between operating systems. 

```cpp 
IncludeDir = {}
IncludeDir["GLM"] = "vendor/glm/glm"
IncludeDir["GLFW"] = "vendor/GLFW/include"
IncludeDir["GLAD"] = "vendor/glad/include"
IncludeDir["STB_IMAGE"] = "vendor/stb_image"
IncludeDir["ImGUI"] = "vendor/imgui"
IncludeDir["Assimp"] = "vendor/assimp/include"

includedirs {
    "%{IncludeDir.ImGUI}",
    "%{IncludeDir.GLFW}",
    "%{IncludeDir.GLM}",
    "%{IncludeDir.GLAD}",
    "%{IncludeDir.STB_IMAGE}",
    "%{IncludeDir.Assimp}",
    "vendor/imgui/backends/imgui_impl_glfw.h",
    "vendor/imgui/backends/imgui_impl_opengl3.h",
    "vendor/imgui/misc/cpp/imgui_stdlib.h",
    "src"
}
```

### Source Files

Source files are the files that need to be compiled into the output of the executable
```lua
files {
    "src/**.h",
    "src/**.cpp",
    "src/**.vert",
    "src/**.frag",
    "%{IncludeDir.ImGUI}/*.h",
    "%{IncludeDir.ImGUI}/*.cpp",
    "vendor/imgui/backends/imgui_impl_glfw.h",
    "vendor/imgui/backends/imgui_impl_opengl3.h",
    "vendor/imgui/misc/cpp/imgui_stdlib.h",
    "vendor/imgui/backends/imgui_impl_glfw.cpp",
    "vendor/imgui/backends/imgui_impl_opengl3.cpp",
    "vendor/imgui/misc/cpp/imgui_stdlib.cpp"

}
```

- The `files` block lists all source files, headers, shaders, and other assets that belong to the project.

### 5. Platform-Specific Settings (Filters)

#### macOS

filter "system:macosx"

    includedirs{

        "/opt/homebrew/include"

    }

    libdirs{

        "vendor/glad/bin",

        "vendor/GLFW/lib_macos_arm",

        "/opt/homebrew/lib"

    }

    links{

        "glfw3",

        "OpenGL.framework",

        "glad",

        "Cocoa.framework",

        "IOKit.framework",

        "assimp"

    }

    defines { "PLATFORM_MACOS" }

- 
- 
- 
- 

- `filter "system:macosx"`: Applies the following settings only when building for macOS.
- `includedirs`: Adds macOS-specific include directories (e.g., [include](vscode-file://vscode-app/Applications/Visual%20Studio%20Code.app/Contents/Resources/app/out/vs/code/electron-sandbox/workbench/workbench.html)).
- `libdirs`: Adds macOS-specific library directories.
- `links`: Specifies the libraries to link against, including macOS frameworks (`OpenGL.framework`, `Cocoa.framework`, `IOKit.framework`).
- `defines { "PLATFORM_MACOS" }`: Defines a preprocessor macro `PLATFORM_MACOS` for conditional compilation in C++ code.

#### Linux

 filter "system:linux"

        libdirs{

            "/usr/local/lib"

        }

        links{

            "assimp"

        }

- 
- 
- 
- 

- `filter "system:linux"`: Applies the following settings only when building for Linux.
- `libdirs`: Adds Linux-specific library directories.
- `links`: Specifies the libraries to link against.

#### Windows

filter "system:windows"

    libdirs{

        "vendor/GLFW/lib",

        "vendor/assimp/lib"

    }

    links{

        "glfw3",

        "glad",

        "assimp-vc143-mt"

    }

    defines { "PLATFORM_WINDOWS" }

- 
- 
- 
- 

- `filter "system:windows"`: Applies the following settings only when building for Windows.
- `libdirs`: Adds Windows-specific library directories.
- `links`: Specifies the libraries to link against, including the Windows-specific Assimp library (`assimp-vc143-mt`).
- `defines { "PLATFORM_WINDOWS" }`: Defines a preprocessor macro `PLATFORM_WINDOWS` for conditional compilation in C++ code.

### 6. Configuration-Specific Settings

filter { "configurations:Debug" }

    defines { "DEBUG" }

    symbols "On"

filter { "configurations:Release" }

    defines { "NDEBUG" }

    optimize "On"

- 
- 
- 
- 

- `filter { "configurations:Debug" }`: Applies the following settings only to the "Debug" configuration.
    - `defines { "DEBUG" }`: Defines the `DEBUG` preprocessor macro.
    - `symbols "On"`: Enables debugging symbols.
- `filter { "configurations:Release" }`: Applies the following settings only to the "Release" configuration.
    - `defines { "NDEBUG" }`: Defines the `NDEBUG` preprocessor macro.
    - `optimize "On"`: Enables optimization.

### 7. Target and Object Directories

targetdir ("bin/%{cfg.buildcfg}")

objdir ("bin/obj/%{cfg.buildcfg}")

- 
- 
- 
- 

- `targetdir`: Specifies the directory where the compiled executable will be placed.
- `objdir`: Specifies the directory where the object files will be placed.
- `%{cfg.buildcfg}`: A Premake5 variable that expands to the current build configuration (e.g., "Debug" or "Release").

## Building the Project

1. **Install Premake5:** Download and install Premake5.
2. **Generate Build Files:**
    - macOS: `premake5 gmake2` (or `premake5 gmake`)
    - Windows: `premake5 vs2022`
3. **Build the Project:**
    - macOS: `make config=debug` or `make config=release`
    - Windows: Open the generated `.sln` file in Visual Studio and build the solution.

## Conditional Compilation in C++

Use preprocessor directives to conditionally compile platform-specific code:

#ifdef PLATFORM_MACOS

    // macOS-specific code

    #include <OpenGL/gl.h>

#elif defined(PLATFORM_WINDOWS)

    // Windows-specific code

    #include <Windows.h>

#else

    // Linux-specific code

    #include <GL/gl.h>

#endif

- 
- 
- 
- 

## Benefits

- **Simplified Build Configuration:** A single script manages build settings for multiple platforms.
- **Cross-Platform Compatibility:** Generates native build files for different operating systems.
- **Reduced Maintenance:** Avoids the need to maintain separate build scripts for each platform.
- **Easy to Learn:** Premake5's Lua-based syntax is relatively easy to learn.