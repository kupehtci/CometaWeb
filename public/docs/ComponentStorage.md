#COMETA

# Cometa Entity ComponentStorage

Cometa Game Engine provides a Registry's based ECS that stores the components of each Entity in an scene into different storages, keeping the modularity and performance. 

### Entities

Entity class represents an object within the game. This class is an empty container, as it doesnt store the components that belong to it. 
This entity can have component "attached" or "associated" to it. This association is handled through the ComponentRegistry that belong to the parent world object. 

Entities are strightly joined to the world where they are stored. The world stores the entities in an Sparse Set and their components in a ComponentRegistry. 

### Components

The components define the behaviour, execution and properties of an Entity. 

The creation, modification or retrieval of components that belong to an entity, should be handled or managed using the entity reference: 
```cpp
WorldManagerRef->CreateWorld(0);  
WorldManagerRef->SetCurrentWorld(0);  
std::shared_ptr<World> world0 = WorldManagerRef->GetWorld(0);
Entity* ent0 = world0->CreateEntity("Entity0");

// Component management functions
ent0->CreateComponent<Rigidbody>(); 
Rigidbody* comp = ent0->GetComponent<Rigidbody>(); 
ent0->RemoveComponent<Rigidbody>(); 
if(ent0->HasComponent<Rigidbody>()){
	COMETA_MSG("Ent0 has rigidbody component"); 
}

```

As they are stored within the ComponentStorage of their Component type and all of them managed by the component registry that they belong, addition or manipulation of them without using Entity's methods can break the references between components. 

### Component Storage

Components storage are buffers for a single type of Component. Each component type has a dedicated storage system that allow to storage all the components of the same type together. 

This Component Storage is based on a custom Sparse Set implementation, that maintain a high standard in performance: 

* O(1) when adding or inserting a new item
* O(1) to remove an item
* O(1) to search for an item or check if its contained in the sparse set. 
* O(1) to clear the set
* O(n) to iterate along the dense or the sparse

Each component stored its linked to the UID of the entity but keeps them pack together to be able to make operations that involve iteration along all of them easier. 

Avoid to iterate over all entities and checking if that entity has that component.

As well as implementing the Component's registry as SparseSet have a high standard in performance has a drawback. Getting all the components of an entity imply going through all Component Storages and look up if contains (O(1)) a component for the Entity. So this action has a O(n) performance. 

### Registry

The registry is a central or main manager for the entities and components and its proper Component Storage. 

Manage the addition of components, retrieval and removal of components. 