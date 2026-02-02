These models leverage the fact that individual action potentials carry no information themselves and can be simplified into “events” that happen at a precise moment in time.  
Integrate-And-Fire Models have 2 separate components that define their dynamics:  
- An equation that describes the evolution of the membrane potential $u_i (t)$  
- A mechanism to generate spikes.  

The simplest form of Integrate-And-Fire models is the **Leaky Integrate-And-Fire model**, which consists of:  
- A LDE which describes membrane evolution 
- A mechanism that triggers action potentials above a certain voltage. 

In the absence of any input, the membrane potential is at its resting value $u_{rest}$. When a current $I(t)$ is injected into the neuron, it results in a new potential $u_i (t)$. We now need to derive an equation that links $u_i(t)$ to $I(t)$.  
When $I(t)$ is injected into the neuron, Not all of it is conducted by the neuron, and the additional charge $\int I(t')dt'$ charges the cell membrane, making it act like a capacitor with capacity $C$. The membrane is not a perfect insulator either, so it leaks charge, characterized by a leak resistance $R$.  
The basic circuit representing a LIF model consists of capacitor $C$ in parallel with resistor $R$, driven by current $I(t)$.   
![[Pasted image 20251029153257.png|400]]  
We need to arrive at a differential equation that describes the evolution of membrane potential $u$ over time.  
We start with splitting the driving current $I(t)$ into 2 components  $$I(t) = I_R + I_C$$,  
where $I_R$ is the current passing through the resistor $R$, and is equal to $$\frac{u_R}{R} = \frac{u(t) - u_{rest}}{R}$$
and $I_C$ is the current passing through the capacitor $C$, $I_C = C \frac{du}{dt}$  
Therefore$$I(t) = \frac{u(t) - u_{rest}}{R} + C \frac{du}{dt}$$ 
Rearranging terms, we get $$RC \frac{du}{dt} = -[u(t) - u_{rest}] + RI(t).$$ Now we introduce time constant $\tau_m = RC$, and finally get the standard form $$\tau_m \frac{du}{dt} = -[u(t) - u_{rest}] + RI(t)$$
## Limitations:
The LIF model is highly simplified, and neglects many aspects of neuronal dynamics.  
- Input is integrated linearly, which is a no-no for the same reasons that it’s bad in artificial neural nets.
- After spiking, membrane potential is reset to a constant rest potential $u_r$, and hence no memory of previous spikes is kept. 

$CV_{ISI} = \frac{std(ISI)}{mean(ISI)}$