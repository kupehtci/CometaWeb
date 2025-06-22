
# Application

The `Application.cpp` file is the core entry point of the Cometa engine’s application lifecycle. It manages initialization, main loop execution, and cleanup of core subsystems such as world management, rendering, input handling, physics simulation, and time tracking. The file orchestrates communication between several manager classes and coordinates layered rendering of UI and map visuals through the onion layering system.


### Application class

The `Application` class encapsulates the lifecycle of a Cometa-based application. It holds pointers to main managers and maintains the execution state. 
The class uses an `_onion` object to manage the layered architecture for visual elements.

### `Init` method

The `init` method is responsible for the complete setup of the application before the main loop starts. 
It follows these steps:
1. **Manager Creation:** Calls static `Create()` and obtains singleton pointers for Time, WorldManager, Renderer, Input, and PhysicsManager. These managers handle core domains such as timing, world state, rendering, input events, and physics simulation.
2. **Layer Setup:** Adds visual layers to `_onion`. Currently, the UI and Maps layers are pushed for layered rendering. Comments suggest past use of specialized Material and Cometa layers for materials and other effects.
3. **Manager Initialization:** Calls `Init()` on all managers to prepare them for use (e.g., setting up internal states, resource loading).
4. **Layer Initialization:** Initializes the onion’s layers.

### `Running` method

Implements the main loop of the application, which continues running until the application signals a close event. In each loop iteration:

- All managers (Time, WorldManager, PhysicsManager, Renderer, Input) plus the onion layers are updated to progress application state, physics simulations, user input processing, etc.    
- The renderer draws the current frame after all updates.
- Checks if the window requests closure, and adjusts the running flag accordingly.

This loop is the heartbeat of the application where most runtime logic occurs.

### `Close` method

The `close` method gracefully shuts down the application by closing all manager systems in reverse order of initialization, ensuring resources are freed and external systems (like windowing and physics backends) are informed of the shutdown.

It ends with an assertion confirming the successful closure of the application.