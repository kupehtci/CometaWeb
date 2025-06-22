
# PhysicsManager Calculations Documentation

This document outlines the physics calculations performed within the `PhysicsManager` class. The `PhysicsManager` is responsible for simulating physics interactions between objects in the game world that has attached Collider and Rigidbody components. 

## Overview

The `PhysicsManager::Update()` method is the core of the physics simulation. It performs the following steps on each frame: 

1.  **Step Phase (Integration):**  Updates the position and orientation of rigid bodies based on applied forces and torques.
2.  **Broad Phase (Collision Detection):**  Detects potential collisions between collider components.
3.  **Collision Resolution:**  Resolves collisions by applying impulses and correcting positions to prevent interpenetration.

## 1. Step Phase (Integration)

This phase updates the state, positions and rotations of each Entity that has attached a `RigidBody` component.

####  Linear Motion
*   **Force Accumulation:**
```cpp
rb._force += rb.IsAffectedByGravity() ? (rb._mass * _gravity) : glm::vec3(0.0f, 0.0f, 0.0f);
```
The total force acting on the rigid body is calculated.  Gravity is added if the `RigidBody` is affected by it.

*   **Linear Velocity Update:**
```cpp
rb._linearVelocity += rb._force / rb._mass * dt;
```
The linear velocity is updated based on the accumulated force and the time step (`dt`).

*   **Position Update:**
```cpp
rbTransform->position += rb._linearVelocity * dt;
```
The position of the rigid body is updated based on its linear velocity and the time step.

*   **Force Reset:**
```cpp
rb._force = glm::vec3(0.0f);
```
The force is reset to zero for the next time step.

#### Angular Motion

*   **Angular Velocity Update:**
```cpp
 rb._angularVelocity += rb._inverseInertiaTensor * rb._torque * dt;
```
The angular velocity is updated based on the accumulated torque, inverse inertia tensor, and the time step.

*   **Rotation Update:**
```cpp
glm::quat rotation = glm::quat(glm::vec3(rb._angularVelocity * dt));
rbTransform->rotation = glm::degrees(glm::eulerAngles(rotation * glm::quat(glm::radians(rbTransform->rotation))));
```
The rotation (orientation) of the rigid body is updated using quaternions based on the angular velocity and time step.  The result is converted back to Euler angles in degrees.

*   **Torque Reset:**
```cpp
rb._torque = glm::vec3(0.0f);
```
The torque is reset to zero for the next time step.

## 2. Broad Phase (Collision Detection)

This phase identifies potential collisions between `ColliderComponent` instances.

*   **Pairwise Iteration:** The code iterates through all pairs of `ColliderComponent` instances in the world.
*   **Collider and Transform Retrieval:** For each pair, it retrieves the `Collider` and `Transform` components.
*   **Collision Dispatch:** The `CollisionDispatcher::Dispatch()` method is called to determine if a collision has occurred and to calculate the collision point and normal.
*   **Collision Storage:** If a collision is detected, a `Collision` struct is created and added to the `collisions` vector.
*   **Script Notification:** The `ScriptManagerRef->ProcessCollision()` method is called to notify the scripting system about the collision event.

## 3. Collision Resolution

This phase resolves the collisions detected in the broad phase.

*   **Iteration:** The code iterates through all `Collision` instances in the `collisions` vector.
*   **Relative Velocity Calculation:** The relative velocity between the two colliding objects is calculated.
*   **Impulse Calculation:** An impulse is calculated to resolve the collision.  This calculation takes into account:
    *   Coefficient of restitution (`restitution`)
    *   Baumgarte stabilization (`_beta`)
    *   Penetration depth (`penetration`)
    *   Total mass of the objects (`totalMass`)
*   **Impulse Application:** The impulse is applied to the linear and angular velocities of the colliding objects.
*   **Position Correction:** The positions of the colliding objects are adjusted to reduce penetration, using Baumgarte stabilization.
*   **Friction:**  Friction is applied to the colliding objects to reduce their relative tangential velocity.

### Key Calculations

*   **Impulse Scalar:**
    ```
    float j = (-(1.0f + restitution) * velAlongNormal + (_beta * (penetration/dt)))/totalMass;
    glm::vec3 impulse = j * col.point.normal;
    ```
    This calculates the magnitude of the impulse required to resolve the collision, incorporating restitution, Baumgarte stabilization, and penetration depth.

*   **Angular Impulse:**
    ```
    glm::vec3 angularImpulse = glm::cross(rA, impulse);
    rbA->_angularVelocity -= rbA->_inverseInertiaTensor * angularImpulse * (rbA->_mass / totalMass);
    ```
    Calculates and applies angular impulse to affect the rotation of the objects.

*   **Position Correction:**
    ```
    transformA->position -= col.point.normal * penetration * _beta * massRatioA;
    ```
    Corrects the position of the objects to reduce penetration, using Baumgarte stabilization.

*   **Friction Impulse:**
    ```
    float jt = -glm::dot(relativeVel, tangent);
    jt /= totalMass;

    // Coulomb's law
    float maxFriction = j * frictionCoeff;
    jt = glm::clamp(jt, -maxFriction, maxFriction);

    glm::vec3 frictionImpulse = jt * tangent;
    ```
    Calculates and applies friction to reduce the relative tangential velocity of the objects.

## Parameters

*   `_gravity`:  The gravity vector.
*   `_beta`:  Baumgarte stabilization factor.  Controls the amount of position correction applied to reduce penetration.
*   `restitution`: Coefficient of restitution.  Controls the "bounciness" of the collision.
*   `slop`: Penetration slop.  A small amount of penetration is allowed to avoid jitter.
*   `frictionCoeff`: Coefficient of friction.  Controls the amount of friction applied during the collision.

## Notes

*   The code includes checks to prevent division by zero and to handle cases where one or both colliding objects are static (infinite mass).
*   The code uses `glm` (OpenGL Mathematics) for vector and matrix calculations.
*   The `CollisionDispatcher` class is responsible for determining the collision point and normal based on the types of the colliding colliders.
*   The `ScriptManagerRef` is used to notify the scripting system about collision events, allowing game logic to respond to collisions.