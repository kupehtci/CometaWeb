
The `CollisionDispatcher` is in charge of dispatching the collisions Helps in the dispatching of the collision events Uses a dispatch matrix to resolve collisions using different functions.

```cpp
CollisionPoint CollisionDispatcher::Dispatch(const Collider *	collider,
const Transform *	transform,
const Collider *	otherCollider,
const Transform *	otherTransform )
```

Dispatch a collision between two colliders. The colliders need to be ordered by ColliderType, so the lower one comes first in the arguments. This function uses the CollisionDispatchFunction to determine the function (IntersectBoxBox, IntersectBoxSphere or IntersectSphereSphere) that need to be used to check for the CollisionPoint

In case there are not Function implemented for that type of collider, it will return an empty CollisionPoint {}.

Parameters
* collider	Collider component of the entity 1 to check
* transform	Transform of the entity 1 to check
* otherCollider	Collider component of the entity 2 to check
* otherTransform	Transform of the entity 2 to check.
* Returns: CollisionPoint containing the data of the collision or intersection between two colliders. CollisionPoint is generated indepently if they collide or not.