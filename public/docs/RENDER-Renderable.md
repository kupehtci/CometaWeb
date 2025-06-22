# Renderable Class Documentation

The `Renderable` class is the base class for all renderable objects in Cometa Render. It encapsulates the essential components required for rendering an object in the scene, such as its mesh, material, and transform. It also provides an interface for shadow casting.

---

## Members

### Protected Members

| Name            | Type                        | Description                              |
|-----------------|----------------------------|------------------------------------------|
| `_mesh`         | `std::shared_ptr<Mesh>`     | The mesh data for the renderable object. |
| `_material`     | `std::shared_ptr<Material>` | The material used for rendering.         |
| `_transform`    | `Transform*`               | The transform (position, rotation, scale)|
| `_castShadow`   | `bool`                     | Whether the object casts shadows.        |

### Public Methods

#### Constructor & Destructor

- **`Renderable(std::shared_ptr<Mesh> mesh, std::shared_ptr<Material> material, Transform* transform)`**  
  Constructs a renderable object with the given mesh, material, and transform.

- **`virtual ~Renderable() = default;`**  
  Virtual destructor for safe inheritance.

#### Getters

- **`std::shared_ptr<Mesh> GetMesh() const`**  
  Returns the mesh of the renderable.

- **`std::shared_ptr<Material> GetMaterial() const`**  
  Returns the material of the renderable.

- **`Transform* GetTransform() const`**  
  Returns the transform of the renderable.

- **`bool DoesCastShadow() const`**  
  Returns whether the object casts shadows.

#### Setters

- **`void SetMesh(std::shared_ptr<Mesh> mesh)`**  
  Sets the mesh.

- **`void SetMaterial(std::shared_ptr<Material> material)`**  
  Sets the material.

- **`void SetTransform(Transform* transform)`**  
  Sets the transform.

- **`void SetCastShadow(bool value)`**  
  Sets whether the object casts shadows.

---

## Usage Example

```cpp
auto mesh = std::make_shared<Mesh>(...);
auto material = std::make_shared<Material>(...);
auto transform = new Transform();

Renderable* renderable = new Renderable(mesh, material, transform);
renderable->SetCastShadow(true);
```

---

## Notes

- This class is intended to be used as a base class for more specific renderable types.
- Ownership of the `Transform*` is not managed by `Renderable` (no deletion in destructor).
- Shadow casting can be toggled per-object for advanced rendering control.
