**Basic Sarsa:**
Initialize Q(s, a)  
Repeat:  
    Initialize S  
    Choose A from S with $\epsilon$-greedy algorithm  
    Repeat:
        Take action A, observe R, S'  
        Choose A' from S' with $\epsilon$-greedy algorithm  
        Update Q according to $Q(S, A) \leftarrow Q(S, A) + \alpha (R + \gamma Q(S', A'))$  
        Make S $\leftarrow$ S' and A $\leftarrow$ A'  
    If S terminal, return episode  

**Sarsa($\lambda$):**  
Initialize Q(s, a)  
Repeat:  
    E(s, a) = 0  
    Initialize S, A  
    Repeat (for each episode):  
        Take action A, observe R, S'  
        Choose A' from S' using $\epsilon$-greedy  
        Calculate TD-error $\delta = R_{t+1} + \gamma Q(S_{t+1}, A_{t+1}) - Q(S_t, A_t)$   
        Update E(s, a) += 1  
        For all s, a:  
            Update Q: $Q(s, a) \leftarrow Q(s, a) + \alpha \delta_t E_t (s, a)$  
            Update E: $E_t(s, a) = \gamma \lambda E_{t-1}(s, a) + 1(S_t = s, A_t = a)$  
            Make S $\leftarrow$ S' and A $\leftarrow$ A'  
	   If S terminal, return whatever