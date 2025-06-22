
### Layer

Layers are abstract classed that can be inserted within the Onion layered system and handled its communication between layers by the event bus.

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




