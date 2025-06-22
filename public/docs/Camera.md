# Camera

The `Camera` class represents a virtual camera in a 3D environment. It manages the camera's position, orientation (direction, up, right vectors), movement speed, sensitivity to input, and projection properties such as field of view (FOV) and near/far clipping planes. This class interacts closely with user input to allow smooth camera navigation and updates the camera's view and projection matrices used for rendering.

Both `VertexBuffer` and `IndexBuffer` provide a binding mechanism for the rendering pipeline to use the stored data during draw calls.

### Attributes

`_position`: 
The camera's current position in 3D space as a 3D vector.

`_up`: 
The up vector defining the camera's vertical orientation, initially set to point along the positive Y-axis.

`_direction`
The normalized vector representing the direction the camera is facing.

`_right`
The right vector, computed as a cross-product between the camera's direction and the up vector, used for lateral movement.

`_movementSpeed`
Controls how fast the camera moves when responding to input (units per second).

`_sensitivity`
Controls how sensitive the camera is to mouse input, influencing rotation speed.

`_pitch`, `_yaw`
Euler angles (in degrees) representing vertical (pitch) and horizontal (yaw) rotations of the camera.

`_fov`
Field of view in degrees, affecting the perspective projection.

`_near`, `_far`
Distances defining the near and far clipping planes for viewing frustum culling.

`_projectionMatrix`
Matrix handling the camera's perspective projection, recalculated based on FOV and window aspect ratio.

`_viewMatrix`
Matrix representing the camera’s position and orientation, used to transform world coordinates into the camera’s coordinate space.

### Constructors

* `Camera()`
Initializes the camera with default position at the origin, facing along the positive Z-axis, and configured with default values for movement speed, sensitivity, pitch, yaw, and field of view. The projection matrix is set using default resolution constants defining the screen's width and height.

The initial view matrix positions the camera slightly forward along its direction vector. This constructor is ideal for scenarios where default camera settings are sufficient or the projection and view matrices will be recalculated later.

### Member functions

* `OnUpdate()` 
This function updates the camera's state every frame, incorporating user input to modify position and orientation. It handles keyboard and mouse input, particularly when the left **ALT** key is pressed, allowing the user to move forward, backward, left, and right using `W`, `S`, `A`, and `D` keys respectively.

Mouse movements adjust the camera's yaw and pitch, enabling rotation. The pitch angle is clamped between -89 and 89 degrees to avoid odd flipping behavior at extreme angles.

After processing input, it recalculates the camera's direction, right vector, view matrix, and updates the projection matrix to match the current window resolution, ensuring correct viewport aspect ratio adjustments.

**How movement works:**

- **W/S keys:** Move forward/backward along the camera's direction
- **A/D keys:** Move left/right along the camera's right vector
- **Alt (Opt) key**: This key needs to be pressed in order to move the camera. If its not press, it won't move with WASD keys.

Movement and rotation speeds are managed using delta time to ensure smooth and frame-rate independent motion.

**Example:** holding the ALT key and pressing `W` — the camera advances forward smoothly, while moving the mouse horizontally will rotate the camera left or right.

> Note!: On custom implementations, this method <span style="color:green;">needs to be called each frame</span> so camera is updated. 