# Components

Cometa Framework is based in an ECS architecture. 

In a **component-based architecture**, the behavior and data of game objects (entities) are defined by attaching various components to them. Entities are just simple containers without logic or properties and only control the World were they belong to and an *Unique ID (UID)* that references them. 

Each **component** encapsulates a specific aspect of functionality, such as position, rendering, physics, or input handling. This approach improves flexibility and code reuse, as components can be mixed and matched to create different types of entities without the need for deep inheritance hierarchies.

# Built-in components

Cometa Framework offers some built-in components that allow to build an scene in the framework: 

### Component (Base Class)

**Description:**  
The abstract base class for all components. Every component holds a pointer to its owning `Entity` and must implement the `Init()` method.

**Key Methods:**
- `Init()`: Pure virtual, must be implemented by derived components.
- `GetOwner()`: Returns the owning entity.
- `SetOwner(Entity*)`: Sets the owning entity.

---

### Transform

**Description:**  
Stores position, rotation, and scale for an entity. Supports parent-child relationships for hierarchical transforms.

**Fields:**
- `position`: `glm::vec3` — World position.
- `rotation`: `glm::vec3` — Euler angles in degrees.
- `scale`: `glm::vec3` — Local scale.
- `_parent`: Pointer to parent `Transform` (optional).

**Key Methods:**
- `GetTransform()`: Returns the local transformation matrix.
- `GetWorldTransform()`: Returns the world transformation matrix, including parent transforms.
- `SetParent(Transform*)`: Sets the parent transform.

---

### MeshRenderable

**Description:**  
Handles mesh and material data for rendering 3D models.

**Fields:**
- `_mesh`: Main mesh (shared pointer).
- `_meshes`: Vector of meshes (for models with multiple meshes).
- `_material`: Material used for rendering.

**Key Methods:**
- `SetMesh(std::shared_ptr<Mesh>)`: Sets the mesh.
- `SetMaterial(std::shared_ptr<Material>)`: Sets the material.
- `LoadModel(const std::string&)`: Loads a model and its meshes/materials.
- `GetMesh()`, `GetMeshes()`, `GetMaterial()`: Getters for mesh and material.

---

### SpriteRenderable

**Description:**  
Represents a 2D sprite with a texture and color.

**Fields:**
- `texture`: The sprite's texture.
- `color`: RGBA color.

---

### PointLight

**Description:**  
Defines a point light source for dynamic lighting.

**Fields:**
- `_ambient`, `_diffuse`, `_specular`: Light color properties.
- `_constant`, `_linear`, `_quadratic`: Attenuation factors.

**Key Methods:**
- Getters and setters for all light properties.

---

### DirectionalLight

**Description:**  
Defines a directional light (like sunlight) with shadow mapping support.

**Fields:**
- `_direction`: Light direction.
- `_ambient`, `_diffuse`, `_specular`: Light color properties.
- Shadow mapping properties: `_shadowNearPlane`, `_shadowFarPlane`, `_shadowOrthoSize`.
- `_lightSpaceMatrix`: Cached matrix for shadow mapping.

**Key Methods:**
- `UpdateLightSpaceMatrix()`: Recalculates the shadow matrix.
- Getters and setters for all properties.

---

### ColliderComponent

**Description:**  
Attaches a collider shape to the entity. The shape needs to inherit from `Collider` class and im

**Fields:**
- `_collider`: Pointer to the collider object (e.g., box, sphere).
- `_isTrigger`: Whether the collider is a trigger (no physical response).

**Key Methods:**
- `SetCollider<T>(...)`: Sets the collider type and parameters.
- `GetCollider()`: Returns the collider.
- `IsTrigger()`, `SetTrigger(bool)`: Set whether the collider is only trigger.

**Trigger**
If a collider is marked as trigger it wont interact phsyically with a rigidbody so they will overlap, but the methods `OnCollisionEnter()` and `OnCollisionExit()` of the script attached in both entities will be called.

---

### RigidBody

**Description:**  
Adds and manage physical properties of an entity. 
An entity with rigidbody needs to have a **collider** component. 

**Fields:**
- `_linearVelocity`, `_force`, `_mass`: Linear motion properties
- `_torque`, `_angularVelocity`, `_inertiaTensor`, `_inverseInertiaTensor`: Angular motion properties
- `_enabled`: Control if the rigidbody will respond to collisions and be updated by the physics system. 
- `_affectedByGravity`: Control whether the rigidbody is affected by gravity. 

**Key Methods:**
- Getters and setters for all physics properties.
- `Init()`, `Reset()`: Initialization and reset logic.

---

## Tag

**Description:**  
Assigns a string tag to an entity for identification or grouping.

**Fields:**
- `_tag`: The tag string.

**Key Methods:**
- `GetTag()`, `SetTag(const std::string&)`: Get/set the tag.

---

### Script

**Description:**  
Attaches a script (derived from `BaseScript`) to an entity for custom behavior. This script class is the only one that doesnt have built-in UI components but its listed as a component attached to the entity. 

**Fields:**
- `_script`: Shared pointer to the attached script.

**Key Methods:**
- `Attach<T, Args...>(Args&&...)`: Instantiates and attaches a script of type `T`. This custom script needs to be derived from `BaseScript` class.
- `Detach()`: Removes the script.
- `OnInit()`, `OnUpdate(float)`, `OnClose()`, `OnCollisionEnter(Entity*, Collision*)`, `OnCollisionExit(Entity*, Collision*)`: Forwards events to the script.

---

Each component is designed to be modular and reusable, allowing you to build complex entities by combining different components.