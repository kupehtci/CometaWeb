# Managing Components

### Adding custom new components

ComponentStorage and registry allow a flexible and easy management of custom implemented components. 

On a new component type being added into the framework, only adding it to the registry is necessary to work with it. 

Adding a new component, you need to add it to the ComponentRegistry's tuple: 

```cpp
class ComponentRegistry {  
private:  
    std::tuple<  
       ComponentStorage<Transform>,  
       ComponentStorage<MeshRenderable>,  
       ComponentStorage<SpriteRenderable>,  
       ComponentStorage<PointLight>,  
       ComponentStorage<Collider>,  
       ComponentStorage<RigidBody>,  
       ComponentStorage<Tag>  // Add here the new component
       > _components;
 // ....      
}
```

This will allow to associate the components to a entity's UID or a integer and retrieve them: 

```
ComponentRegistry registry; 

Entity ent1; 
ent1.CreateComponent<NewComponent>(1)
NewComponent newCmp = ent1.GetComponent<NewComponent>()
```

And you are also able to obtain the ComponentStorage for that component hold inside the registry: 

```cpp

ComponentStorage<NewCompontent>& cmpStrg = registry.GetStorage<NewComponent>(); 

for(auto newComponent : cmpStrg){
	newCompontent.DoSomething()
}

std::cout << "Number items in storage: " << cmpStrg.Size() << std::endl; 
```

You can iterate between all the components or items stored in the ComponentStorage as its an SparseSet with begin() and end() iterators. 

Take into account that adding new components should also be added into the Entity delete method: 

