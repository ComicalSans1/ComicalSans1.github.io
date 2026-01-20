Gonna start off with describing the spinningup implementation  

Program Flow: Take action, log relevant data → After episode completion update batch weights 

`combined_shape`: returns the combined tensor of the 2 input tensor, with dimensions `(length, shape)`  
`mlp:` creates a MLP with specified dimensions
`get_policy`: Takes env observation as input, passes it through the mlp, and converts the output into a `torch.distributions.Categorical` class.
`get_action`: samples an action from the policy returned by `get_policy`. 
`compute_loss`: calculates policy gradient. Input: (observations, actions, weights)
NOTE: here, `weights` simply refers to the return function of your choice, so you can plug in discounted, finite-horizon, actor-critic, whatever. Damn, it took me way too long to realize that. I should have read literally like 15 lines ahead.
`train_one_epoch`: 
- initialize lists for observations, actions, weights, returns, and episode lengths.

