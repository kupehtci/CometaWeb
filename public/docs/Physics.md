
# Physics System Documentation 

## Overview
The Cometa Framework includes a robust physics system that handles rigid body dynamics, collision detection, and resolution. The system is designed with a component-based architecture that integrates with the entity-component system of the framework.

## Core Components

These are the main components attached to entities that are involved in physics calculation,  collision detection and resolution. 
### PhysicsManager
The PhysicsManager is the central controller for all physics simulations in the framework. It's implemented as a singleton, making it accessible throughout the application.

```cpp
class PhysicsManager : public 
SingletonManager<PhysicsManager> {
    // ...
}
```
The main features and functionalities of the Physics Manager are: 
- Manages gravity (default: 0.0f, -9.81f, 0.0f )
- Controls simulation state (can be enabled/disabled)
- Implements Baumgarte stabilization for constraint solving
- Handles the physics update loop

### Colliders
Colliders define the physical shape of objects for collision detection. The framework supports multiple collider types through a polymorphic design:

```
class Collider {
    enum class ColliderType {
        BOX_COLLIDER = 0,
        SPHERE_COLLIDER = 1,
        COUNT = 2,
    };
    // ...
}
```

Implemented collider types:
* BoxCollider
```cpp 
class BoxCollider : public Collider {
    // Defines a box shape with extents, 
    center, and rotation
    // ...
}
```

* Sphere collider
```cpp
class SphereCollider : public Collider {
    // Defines a sphere shape with radius and 
    center
    // ...
}
```

Each collider type implements:
- Shape-specific properties (extents, radius, etc.)
- Inertia tensor calculations for rigid body dynamics

### Physics Components
The physics system integrates with the entity-component system through two main components:

* ColliderComponent
```cpp
class ColliderComponent : public Component {
    // Wraps a Collider instance for use with 
    entities
    // ...
}
```

The collider wraps a specific collider type (Box, Sphere) and make them attachable to an entity. 

Also a collider can be configured as a <span style="color:DodgerBlue">trigger</span> (non-solid collider), that will serve to detect the collisions but wont resolve the collision of a rigidbody colliding with it, so can overlap. s

* Rigidbody
```cpp 
class RigidBody : public Component {
    // Handles physical properties and motion
    // ...
}
```

A `rigidbody` has the following features
- Linear properties: velocity, force, mass
- Angular properties: torque, angular velocity
- Inertia tensor calculations based on collider shape
- Can be enabled/disabled to control physics simulation


### Collision Detection

The framework uses a two-phase collision detection approach:
1. Broad Phase : Identifies potential collisions between all colliders in the scene
2. Narrow Phase : Performs precise collision tests between specific collider types

Collision detection is handled by the CollisionDispatcher which uses a double-dispatch pattern to resolve collisions between different collider types:

```
class CollisionDispatcher {
    // Handles collision detection between 
    different collider types
    // ...
}
```
Implemented collision tests:

- Box vs Box
- Box vs Sphere
- Sphere vs Sphere
### Collision Data
Collision information is obtained using `CollisionDispatch` class and is stored in two structures:

* CollisionPoint
```cpp
struct CollisionPoint {
    glm::vec3 a;         // Point on first 
    collider
    glm::vec3 b;         // Point on second 
    collider
    glm::vec3 point;     // Contact point
    glm::vec3 normal;    // Contact normal
    float length;        // Penetration depth
    bool collided;       // Collision state
};
``` 

* Collision
```cpp
struct Collision {
    ColliderComponent* colliderCompA;
    ColliderComponent* colliderCompB;
    CollisionPoint point;
};
```

## Physics Simulation
The physics simulation process in PhysicsManager::Update() follows these steps:

1. Step Phase : Updates rigid body positions and orientations based on forces and torques
   
   - Applies gravity
   - Integrates linear and angular velocities
   - Updates positions and orientations
2. Broad Phase : Detects all potential collisions in the scene
   
   - Iterates through all collider pairs
   - Uses CollisionDispatcher to check for collisions
   - Builds a list of all detected collisions
3. Collision Resolution : Resolves collisions using impulse-based dynamics
   
   - Calculates impulse based on collision normal and relative velocity
   - Applies Baumgarte stabilization to prevent sinking
   - Handles both linear and angular responses
   - Applies friction forces
## Usage Example

```cpp
// Create an entity with physics properties
Entity* entity = world->CreateEntity();

// Add a transform component
Transform* transform = 
entity->AddComponent<Transform>();
transform->position = glm::vec3(0.0f, 5.0f, 0.0f);

// Add a collider component with a box shape
ColliderComponent* collider = entity->AddComponent<ColliderComponent>();
collider->SetCollider<BoxCollider>(glm::vec3(1.0f, 1.0f, 1.0f));

// Add a rigid body component
RigidBody* rigidBody = entity->AddComponent<RigidBody>();
rigidBody->SetMass(10.0f);
```
## Advanced Features

The physics manages also takes into account the following features: 
### Inertia Tensor Calculation

The framework automatically calculates appropriate inertia tensors based on the collider shape and mass:

```cpp
// For a sphere
float i = (2.0f * _radius * _radius) / 5.0f;
glm::mat3 inertiaTensor = glm::mat3(i, 0.0f, 0.0f, 0.0f, i, 0.0f, 0.0f, 0.0f, i);

// For a box
float x2 = size.x * size.x;
float y2 = size.y * size.y;
float z2 = size.z * size.z;

// Diagonal elements for box inertia tensor
inertiaTensor[0][0] = (y2 + z2) / 12.0f;
inertiaTensor[1][1] = (x2 + z2) / 12.0f;
inertiaTensor[2][2] = (x2 + y2) / 12.0f;
```
### Baumgarte Stabilization

The physics system uses Baumgarte stabilization to prevent objects from sinking into each other due to numerical errors. This prevent the effect known as `Jittering`

```cpp 
float penetration = std::max(col.point.length - slop, 0.0f);
float baumgarteTerm = (_beta / dt) * penetration;
```
The `_beta` parameter (default: 0.2f) controls the strength of the stabilization effect and its known as the `Baumgarte factor`

### Friction

The collision resolution includes friction calculations to simulate realistic surface interactions:
```cpp
const float frictionCoeff = 0.3f;
glm::vec3 tangent = relativeVel - (col.point.
normal * velAlongNormal);
// Apply friction impulse
```
## Limitations and Future Improvements

Cometa Framework current physics implementation has certain limitations that need to be taken into account under the implementation: 
- Currently limited to box and sphere colliders
- No continuous collision detection (tunneling effect can occur at high velocities)
- No joints or constraints system
- No sleep mechanism for inactive objects