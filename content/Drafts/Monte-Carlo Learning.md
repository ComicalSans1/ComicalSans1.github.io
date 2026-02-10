Monte-Carlo learning is the most intuitive method of learning from experience, which is: go through an episode while recording the returns you get at each episode, and finally take the mean of all these returns as the value you want to optimize for.  

Waiting until an episode terminates naturally introduces the requirement that an episode must terminate for the agent to learn from it. This restricts us to episodic environments.

In an MDP, the value function is defined as the expected return starting from state $S$ following policy $\pi$ is
$$v_\pi(s) = \mathbb{E}_\pi[G_t \mid S_t = s]$$
To estimate this return, as discussed we take the mean of past returns. $$V(s) = \frac{S(s)}{N(s)}$$To update the value function, we use the formula $$V(S_t) \leftarrow V(S_t) + \frac{1}{N(s)}(G_t - V(S_t))$$
To quantify the most basic intuition behind MC methods, we will implement a toy problem of estimating the value of pi.  
As we know, a square with side length a 

Outline:
- Explanation of algorithm
- Implementation of basic concept
- Implementation in environment
- Limitations
- Intuition for further methods