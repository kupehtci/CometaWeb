
# Cometa - Layer

Layers are abstract classed that can be inserted within the Onion layered system and handled its communication between layers by the event bus.

They can be used to add functionalities to the engine and or the game in an structured way. It preserves order of rendering and order of event propagation. 

To implement a Layer it needs to fulfill this minimal template: 

```cpp
class ExampleLayer : public Layer{

public: 
    ExampleLayer() : Layer("Example Layer") {};
    ExampleLayer(std::string name) : Layer(name) {};

    void Init() override {
        // Implementation of the initializing functions
    }
    void Update() override {
        // Implementation of the loop that is called repeatedly
        // Dont subscribe to EventBus under the loop
    }
    void Close() override {
        // Closing or ending functionality
    }

    void HandleEvent(Event& event) override{
        // Handle the different types of events that Layer is subscribed for
        // ...
        // At the end: 
        event.SetHandled();
    }
};  
```

### Layer Order
Layers are added to the engine in the order that they are added to the `Engine::GetInstancePtr()->PushLayer(Layer* layer)` function.

The order is preserved in the rendering and in the event propagation.

So if you add a layer A, then a layer B, then a layer C, the order for event propagation will be:
1. Layer A
2. Layer B
3. Layer C

And the order for rendering will be:
1. Layer C
2. Layer B
3. Layer A

The order of execution is <span style="color:red;">important</span>, as you can use a layer similar to built-in `UILayer` to handle user input. And this layer needs to be added first, in order to receive the user input before the other layers and be rendered the last, so appears on top of the other layers.

### Event Subscription

In order to receive a notification that will call `HandleEvent()` from the Event Bus, the layer need to be subscripted for that type of event to receive its call: 

Example: 

```cpp
void ExampleLayer::Init(){
	// ...
	EventBus::GetInstancePtr()->Subscribe(EventType::COMETA_KEY_PRESS_EVENT, this);
	// ...
}
```

This allow to add the current layer as a subscriber, so in case an event of this kind is triggered, it will call `HandleEvent(Event& event)`




