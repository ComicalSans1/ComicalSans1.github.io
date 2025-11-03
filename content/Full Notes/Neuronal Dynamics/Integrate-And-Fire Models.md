These models leverage the fact that individual action potentials carry no information themselves and can be simplified into “events” that happen at a precise moment in time.  
Integrate-And-Fire Models have 2 separate components that define their dynamics:  
- An equation that describes the evolution of the membrane potential $u_i (t)$  
- A mechanism to generate spikes.  

The simplest form of Integrate-And-Fire models is the Leaky Integrate-And-Fire model, which consists of:  
- A LDE which describes membrane evolution 
- A threshold for spike firing.

In the absence of any input, the membrane potential is at its resting value $u_{rest}$. When a current $I(t)$ is injected into the neuron, it results in a new potential $u_i (t)$. We now need to derive an equation that links $u_i(t)$ to $I(t)$.  
When $I(t)$ is injected into the neuron, Not all of it is conducted by the neuron, and the additional charge $\int I(t')dt'$ charges the cell membrane, making it act like a capacitor with capacity $C$. The membrane is not a perfect insulator either, so it leaks charge, characterized by a leak resistance $R$.

![[Pasted image 20251029153257.png|400]]

