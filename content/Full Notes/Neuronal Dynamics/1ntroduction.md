# Structure of The Neuron:
Dendrite, Soma, Axon
**Dendrites**: Input device, collects signals from other neurons and transports them to the:
**Soma:** CPU, performs nonlinear processing (Threshold activation)
**Axon:** Output device, delivers signal to other neurons

The junction between 2 neurons is called a **Synapse**. 
Sending neuron: Presynaptic cell
Receiving neuron: Postsynaptic cell
A single neuron connects to up to tens of thousands of other neurons. Many axonal branches end in the direct neighborhood of the neuron, but some may extend several cm to reach neurons in other parts of the brain.
# Spike Trains:
Neuronal signals consist of short electrical pulses called **action potentials**, with an amplitude of 100mV and a duration of 1-2 ms. The action potential is the fundamental unit of signal transmission.

A chain of action potentials emitted by a single neuron is called a **spike train**. Since the individual spikes themselves are stereotypical events, they carry no information of their own. It is the number and timing of spikes that matter.

Action potentials in a spike train are well separated. The minimum distance between 2 spikes defines the **absolute** refractory period of the neuron, where it is impossible to excite a spike. After this, there is a **relative** refractory period, where the neuron is excitable, but less sensitive than baseline.
# Synapses
Junction of axon of presynaptic cell and dendrite of postsynaptic cell. 
The most common type of synapse is chemical synapses. 

The process: presynaptic axon comes very close to postsynaptic neuron, forming a synaptic cleft (a few nm in size) → When action potential arrives at cleft, it triggers processes that result in the release of neurotransmitter into the cleft → These transmitter molecules are detected by specialized receptors in the postsynaptic cell membrane → Specific channels open, causing ions from outside to flow into the cell → This changes the postsynaptic membrane potential. 

This process doesn’t directly make the postsynaptic neuron fire, and instead modifies (increases or decreases) the likelihood of the neuron firing very slightly. This enables complex communication between the postsynaptic and the thousands of neurons attached to it, as all of them can influence the action of the one neuron.
# Neuron Activation
The rest potential of a neuron is around -65 mV. A positive change is termed excitatory and a negative change is termed inhibitory. 

studying the time course $u_i(t)$ of the membrane potential of neuron $i$,
the initial potential of the neuron $u_i (t) = u_{rest}$. At $t=0$ the presynaptic neuron $j$ fires its spike. for $t > 0$, $u_i (t) - u_{rest} =: \epsilon_{ij} (t)$.

The membrane potential responds **linearly** to the input spikes. 
$u_t (t) = \sum_j \sum_f \epsilon_{ij} (t - t_j^{(f)}) + u_{rest}$.
If too many input spikes arrive in a short interval, this linearity breaks down. Once the potential reaches a critical value $\delta$, it shows a pulse-like excursion with an amplitude of around 100 mV. After this pulse, the potential crashes below the resting value. This hyperpolarization is called spike-afterpotential.
