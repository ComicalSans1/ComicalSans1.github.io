# Simple Actor-Critic based on Q-Value

**Critic:** Updates w by linear TD(0)
**Actor:** Updates $\theta$ by policy gradient

**function** QAC:
	Initialize s, w, $\theta$ 
	Sample a $\sim \pi_{\theta}$ 
	**for** each step **do**:
		Sample reward r = $\mathcal{R}^a_s$; sample transition s’ $\sim \mathcal{P}^a_s$; 
		Sample action $a’ \sim \pi_{\theta}(s', a')$ 
		$\delta = r + \gamma Q_w(s', a') - Q_w(s, a)$ 
		$\theta = \theta + \alpha \nabla_{\theta}log \pi_{\theta}(s, a) Q_w(s, a)$ 
		$w \leftarrow w + \beta \delta \phi (s, a)$
		$a \leftarrow a'$ , $s \leftarrow s'$
	**end for**
**end function**

**function** QAC: **(repeat for every episode)**
	Initialize the policy $\pi_{\theta}$ and value function $Q_{s, a}$
	Initialize policy loss $\theta$ 
	Initialize starting state $S$
	Sample an action from policy $\pi$
	**for** each step **do**:
		Get reward r = $\mathcal{R}^a_s$ and next state $S’$ from environment
		Get action $a'$ from the policy
		Calculate TD-error: Same old update, refer notes
		Policy loss update similar to REINFORCE, except the MC value function is replaced with the Q-value predicted by the critic
		Backpropagate TD-error and policy loss
		Update current state and action
	**end for**
**end function**


# Actor-Critic With Eligibility Traces

**Critic:** Updates w by TD($\lambda$)
**Actor:** Updates $\theta$ by policy gradient

**function** QAC:
	Initialize s, w, $\theta$ 
	Initialize $z^{\theta}$ and $z^w$ to 0
	Initialize $I$ to 1
	**for** each step **do**:
		$A \sim \pi(. | S, \theta)$
		Take action, observe $S’$, $R$
		$\delta = R + \gamma \hat{\mu}(S', w) - \hat{\mu}(S, w)$ 
		$z^w \leftarrow \gamma \lambda^w z^w + I \nabla_w \hat{\mu}(S, w)$
		$z^{\theta} \leftarrow \gamma \lambda^{\theta} z^{\theta} + I \nabla_{\theta} ln \pi (A|S, \theta)$ 
		$w \leftarrow w + \alpha^{w} \delta z^{w}$ `
		$\theta \leftarrow \theta + \alpha^{\theta} \delta z^{\theta}$ 
		$I \leftarrow \gamma I$
		$S \leftarrow S'$ 
	**end for**
**end function**

**function** QAC: **(repeat for every episode)**
	Initialize trace decay rates $\lambda^w, \lambda^{\theta}$, step sizes $a^{\theta}, a^w$ 
	Initialize starting state, actor and critic networks
	Initialize actor and critic eligibility traces to 0
	Initialize trace discount $I$ to 1
	**for** each step **do**:
		Select action from policy $\pi$
		Take action, get reward and next state from environment
		TD(Critic) error: same as ever, MSE b/w observed reward + discounted value of next state $R + \gamma \hat{\mu}(S', w)$ and the estimated value of current state $\hat{\mu}(S, w)$
		Actor error: `-log_prob * advantage`
		Perform backprop on critic and actor 
		Get gradient values using \[parameter].grad 
		Loop through parameters of each network, update trace of each parameter according to the corresponding updation function
		Backpropagate actor and critic parameters
		Multiply $I$ by the discount factor $\gamma$ 
		Update current state
	**end for**
**end function**