Monte Carlo:  
generate episodes -> MC prediction -> etc  

**Generate Episode**: (policy, env) -> SAR(states, actions, rewards)
- reset env  
- keep taking actions; append observation, action, reward to states, actions, rewards
- return

**First-Visit MC Prediction:** (policy, env, n_ep) -> value table
- create value function, N as defaultdicts
- single episode: generate episode, store only states and rewards
- set returns to 0
- iterate backwards through all elements in reward and state list, add rewards to total returns.
- now FV Monte-Carlo: If state not in list of states, update count, increment N\[S], perform rolling average on value_table\[S].
- return value_table after all iterations

**MC Control:**
- Create empty action-value function, start with random policy
- Go through an episode until completion, record state action reward
- **Monte Carlo:** standard accumulate return per episode, rolling average, except update Q-table instead of SVF
- repeat
**Specifications:** 
- $\alpha_t = 1/{N}(s_t, a_t)$ 
- $\epsilon_t = N_0/{(N_0 + N(s_t))}$ 

**NOTE:** The SVF/AVF is not a table consisting of all possible states and actions, it's a dictionary mapping state to value.