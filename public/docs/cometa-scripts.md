
# Cometa - Scripts

Script is a type of component that can be attached to an `Entity` to program its behavior.  

The methods of this component to modify its properties are: 

* Attach\<T\>(Args ...)
Create and attach an script to the Script component. This method needs to be called indicating T as the BaseScript to create and Args as the arguments to pass to the BaseScript constructor. 

<span style="color:fuchsia;">Note!</span> The script attached needs to be child of `BaseScript` class. 

Script component has the following methods that are used by Cometa Framework to handle the scritps: 

* Init(): initialize the component. Without use. 
* OnInit(): Call the assigned script OnInit() method. 
* OnUpdate(): Call the assigned script OnUpdate() method. 
* OnCollisionEnter(Entity* other, Collision* collision): Call the OnCollisionEnter method in the assigned script and passes to it the other entity of the collision and the collision information. 
* OnCollisionExit(Entity* other, Collision* collision): Call the OnCollisionEnter method in the assigned script and passes to it the other entity of the collision and the collision information. 


## BaseScript class

The scripts of Cometa Render needs to be children of BaseScript class and implement the following methods: 
* `OnInit()`: will be called upon script initialization, attachment or world initialization. 
* `OnUpdate()`: will be called once per frame. 
* `OnClose()`: will be called on world close, world change, shutdown or entity destroy. 
* `OnCollisionEnter()`: will be called when a collision of the entity will another collider is detected by the `PhysicsSystem` in the collision step phase. 
* `OnCollisionExit()`: will be called when a collision end of the entity will another collider is detected by the `PhysicsSystem` in the collision step phase. Its only called if Scripting System has the collision stored and its now outside the collision. 

`OnUpdate()` method is called with an variable `float deltaTime` that represents the delta time (Time in ms between frame and frame) calculated by the `Time` class. This helps time relative implementations without extracting delta time directly using `Time::GetDeltaTime()`. 

Both methods `OnCollisionEnter()` and `OnCollisionExit()` are called with the following arguments: 
* `Entity* other` a pointer to the other entity object. This entity is the one that is colliding with this entity. As its a pointer can be used to accessing other components of the entity. 
* `Collision* collision`: collision information pointer. This is an struct used by Physics manager to represent Collision information. This class stores the following information: 
	* Collider Component of the A Entity involved in the collision
	* Collider Component of the B Entity involved in the collision
	* Collision Point struct containing the following information: 
		* `vec3 a`: closest point in the A collider to the collision point
		* `vec3 b`: closest point in the B collider to the collision point
		* `vec3 point`: exact point of the collision. Its normally the medium between `a` and `b`
		* `vec3 normal`: normal vector of the collision. Can be used to calculate the separation forces applied in the Physics Manager
		* `float length`: distance of penetration between `a` and `b`
		* `bool collided`: boolean that represent if the collision point represents a collision point that has collided. In the case of OnCollisionExit, this `collided` boolean is false

Take a look into more documentation about Collision and CollisionPoints in <a href='/docs/getting-started.md'>Collisions</a>. 

#### BaseScript implementation

In order to define a Script that each one of the previous exposes methods are called, we need to define a custom Script class that inherits from `BaseScript` class. 

This is a template for creating scripts: 
```cpp
#ifndef COMETA_TEMPLATE_SCRIPT_H
#define COMETA_TEMPLATE_SCRIPT_H  

#include "world/BaseScript.h"  
  
class TemplateScript final : public BaseScript {  
  private:    
  public:  
    TestScript() = default;  
    TestScript(const TestScript&) = default;  
  
    ~TestScript() override = default;  
  
    void OnInit() override {  }  
    void OnUpdate(float deltaTime) override{  }  
    void OnClose() override{  }  
    void OnCollisionEnter(Entity* other, Collision* collision) override{  }  
    void OnCollisionExit(Entity* other, Collision* collision) override{  }  
};  

#endif // COMETA_TEMPLATE_SCRIPT_H
```

This is an example of implementation that holds some variables within the script: 
```cpp
#ifndef COMETA_TEST_SCRIPT_H  
#define COMETA_TEST_SCRIPT_H  
  
#include <iostream>  
#include "world/BaseScript.h"  
  
#include "debug/Assertion.h"  
  
  
class TestScript final : public BaseScript {  
  private:  
    std::string _text = "";  
  
    uint8_t _health = 100;  
    uint8_t _maxHealth = 100;  
    uint8_t _damage = 10;  
  
  public:  
    TestScript() = default;  
    explicit TestScript(const std::string& text) {_text = text;}  
    TestScript(const TestScript&) = default;  
  
    ~TestScript() override = default;  
  
    void OnInit() override {  
      COMETA_MSG("OnInit ", _text);  
    }  
  
    void OnUpdate(float deltaTime) override{  
      COMETA_MSG("OnUpdate ", _text, " delta time: ", deltaTime);  
    }  
  
    void OnClose() override{  
      COMETA_MSG("OnClose ", _text);  
    }  
  
    void OnCollisionEnter(Entity* other, Collision* collision) override{  
      COMETA_MSG("[TEST SCRIPT] OnCollisionEnter");  
      Tag* otherTag = other->GetComponent<Tag>();  
      if (otherTag != nullptr && otherTag->GetTag() == "enemy"){  
        _health -= _damage;   
      }  
    }  
  
    void OnCollisionExit(Entity* other, Collision* collision) override{  
      COMETA_MSG("[TEST SCRIPT] OnCollisionExit");  
    }  
};  
  
#endif //COMETA_TEST_SCRIPT_H
```