
# COMETA - Collision Resolution phase

Collision resolution phase is the phase in the physics system update, when all the collisions has been calculated and the physics managed need to calculate the necessary impulses to separate all entities. 


$v_{\text{normal}} = \mathbf{v}_{\text{rel}} \cdot \mathbf{n}$

* Relative velocity calculation: 
$$v_{\text{rel}}​=(v_{\text{B}}​+ω_{\text{B}​}×r_{\text{B}}​)−(v_{\text{A}}​+ω_{\text{A​}}×r_{\text{A​}})$$


* Impulse magnitude (j) calculation simplified
$$j_{\text{code}} = \frac{-(1 + e) v_{\text{normal}} + \beta \frac{\text{penetration}}{\Delta t}}{m_A + m_B}$$

* Positional correction with baumgarte: 
$$\Delta x = \beta \cdot \text{penetration} \cdot \text{n}$$

* Tangential velocity: 
$$v_{\text{tangent}}=v_{\text{rel}}-(v_{\text{rel}} \cdot n)n$$

* Friction magnitude: 
$$j_{\text{friction}}=-\frac{v_{\text{tangent}} \cdot t}{M_{\text{effective}}}$$


$\mathbf{n} = \frac{\mathbf{p}_B - \mathbf{p}_A}{\|\mathbf{p}_B - \mathbf{p}_A\|}$

* Symbols 

| Symbol                                         | Meaning                        |
| ---------------------------------------------- | ------------------------------ |
| $\mathbf{v}_A, \mathbf{v}_B$                   | Linear velocities              |
| $\boldsymbol{\omega}_A, \boldsymbol{\omega}_B$ | Angular velocities (rad/s)     |
| $\mathbf{r}_A, \mathbf{r}_B$                   | Contact point offsets from COM |
| $e$                                            | Coefficient of restitution     |
| $\beta$                                        | Baumgarte stabilization factor |
| $\mu$                                          | Friction coefficient           |

$|j_{\text{friction}}| \leq \mu |j|$