 Ref: [[https://arxiv.org/pdf/1906.02691 | An Introduction to Variational Autoencoders]]
**Generative models:** 
Simulate the conditions which produce the observed data.
We are able to pick and choose which variables you want to parameterize, while treating others as a constant noise.
Modelling causal relationships makes it easy to generalize to novel environments
Directly models the joint probability distribution $P(X, Y)$, which can indirectly be used to model the conditional probability $P(Y | X = x)$ of $Y$ given $x$, but is more commonly used to generate new datapoints from the joint distribution, which as I understand means it is able to produce a synthetic observation $x$ which is in line with observed data.

**Downsides:** If you’re solely interested in discrimination tasks, generative models are bulky and lead to a higher bias when the model is wrong.

**Discriminative Models:**
Learn patterns in the data without modelling $P(X, Y)$
Directly models $P(Y | X = x)$, i.e. the conditional probability of target $Y$ given an observation $X$.
More efficient for pure discrimination tasks
## VAEs
To understand the basis for VAEs, we have to look at 2 separate parts; the variational part and the autoencoder part. 
Let’s first look at vanilla variational inference. Here we attempt to approximate a complex, intractable posterior distribution $p(z|x)$ by fitting a simpler, tractable variational distribution $q(z)$ by minimizing a dissimilarity function $d(Q, P)$, usually the KL divergence.  
The limitation of this method is that $q(z)$ has to be calculated separately for each datapoint, which becomes computationally inefficient for larger datasets. Instead, we use a recognition model with a single set of parameters to model the relationship between input and latent variables.  
Using a single set of variables to model the whole thing using REINFORCE introduces a lot of sampling noise in the gradients, as we will outline later. To combat this, we use the reparameterization trick to greatly reduce variance.

Consider a dataset $X = \{x^{i}\}_{i=1}^N$ consisting of $N$ samples of a random variable x.
- A value $z^i$ is generated from the prior distribution $p_{\theta *}(z)$ 
- A value $x^{(i)}$ is then generated from the conditional distribution $p_{\theta *}(x|z)$ 

Here, z is the latent vector, and $p_{\theta}(x|z)$ is the decoder model, and $p_{\theta *}(z|x)$ is the true posterior. We want to approximate the intractable true posterior $p_{\theta *}(z|x)$ with the probabilistic encoder $q_{\phi }(z|x)$ and decoder $p_{\theta}(x|z)$.

If we want to estimate the parameters of $p_{\theta *}(z|x)$, we optimize the marginal likelihood of the dataset $(x[1], \cdots,x[N])$.$${\log p_\theta(x[1], \cdots,x[N])=\sum_{i=1}^N{\log p_\theta(x[i])}}$$Taking each term $\log p_\theta(x)$:
To introduce $q_{\phi }(z|x)$, we multiply the term by $1 = \int{ \mathbf{q_\phi(z|x)}d\mathbf{z}}$ to get $$\log p_\theta(\mathbf{x}) \int{  \mathbf{q_\phi(z|x)}d\mathbf{z}}\\
 =  \int{\log p_\theta(\mathbf{x}) \mathbf{q_\phi(z|x)}d\mathbf{z}}\\ $$The integral of $\log p_\theta(\mathbf{x})$ over all values of z, where z is taken from $\mathbf{q_\phi(z|x)}$, is the definition of expectation $$\mathbb{E}_{\mathbf{q_\phi(z|x)}} \log p_\theta(\mathbf{x})$$As we know, $\mathbf{p_{\theta}(z|x) = \frac{p_{\theta}(z \cap x)}{p_{\theta}(x)} = \frac{p_{\theta}(z, x)}{p_{\theta}(z)} \implies p_{\theta}(z) = \frac{p_{\theta}(z \cap x)}{p_{\theta}(z|x)}}$. Thus, we get $$\mathbb{E}_{\mathbf{q_\phi(z|x)}} \left[
\log \frac{p_\theta(\mathbf{x, z})}{p_\theta(\mathbf{z|x})}
\right]$$Here, the posterior $\mathbf{p_{\theta}(z|x)}$ is intractable, so we introduce the variational approximation $\mathbf{q_{\phi}(z|x)}$ and split the term into 2.
$$ \mathbb{E}_{\mathbf{q_\phi(z|x)}} \left[\log \frac{p_\theta(\mathbf{x, z})}{p_\theta(\mathbf{z|x})}
\cdot \frac{\mathbf{q_\phi(z|x)}}{\mathbf{q_\phi(z|x)}}
\right]$$expand log $$\mathbb{E}_{\mathbf{q_\phi(z|x)}} \left[
\log \frac{ p_\theta(\mathbf{x, z}) }{ \mathbf{q_\phi(z|x)} }
\right] + \mathbb{E}_{\mathbf{q_\phi(z|x)}} \left[
\log \frac{ \mathbf{q_\phi(z|x)} }{ p_\theta(\mathbf{z|x}) }
\right]$$
These are the expressions for the Evidence Lower Bound (ELBO) $\mathcal{L}(\theta, \phi; x^{(i)})$ and the KL divergence $D_{KL}( \mathbf{q_\phi(z|x)} || p_\theta(\mathbf{z|x}) )$ respectively. 
The KL divergence is 0 only when $q_{\theta}(z|x)$ equals the true posterior. The ELBO is the lower bound on the log-likelihood of the data. $$\mathcal{L}(\theta, \phi; x^{(i)}) = log(p_{\theta}(x)) - D_{KL}( \mathbf{q_\phi(z|x)} || p_\theta(\mathbf{z|x}) )$$Looking at this, we can say that the only term we need to optimize is the ELBO, as this also optimizes the divergence. 
#### Gradients
The ELBO allows joint optimization of $\theta$ and $\phi$ using SGD. In an i.i.d dataset, the ELBO objective is the sum/average of ELBOs of individual datapoints $$\mathcal{L}_{\theta, \phi} (\mathcal{D}) = \sum_{x \in \mathcal{D}} \mathcal{L}_{\theta, \phi}(x)$$Unbiased gradients of the ELBO w.r.t the decoder parameters $\theta$ are simple to obtain as $\theta$ does not parameterize $q_{\phi}(z|x)$. $$
\nabla_{\theta}\mathcal{L}_{\theta, \phi}(x) = 
    \nabla_{\theta}\mathbb{E}_{q_{\phi}(z|x)}[logp_{\theta}(x, z) - logq_{\phi}(z|x)]$$The expectation is independent of $\theta$, allowing us to move the gradient into the expectation, i.e. the gradient of the expectation is the expectation of the gradient. $$\mathbb{E}_{q_{\phi}(z|x)}[\nabla_{\theta}(logp_{\theta}(x, z) - logq_{\phi}(z|x))]$$Now replace the expectation with a Monte Carlo sample of $z$ from the encoder and we get the final form$$\nabla_{\theta}(logp_{\theta}(x, z) - logq_{\phi}(z|x))
 = \nabla_{\theta}(logp_{\theta}(x, z))$$
 For $\phi$ however, we cannot take the gradient inside the expectation as $\mathbb{E}_{q_{\phi}(z|x)}$ is dependent on $\phi$, so optimizing $\phi$ changes the distribution too. The expectation of the gradient $\neq$ the gradient of the expectation.
### Reparameterization
The problem is that we change the distribution every time we backpropagate through the loss. To solve this, we express $z \sim q_{\phi}(z|x)$ as a differentiable and invertible transformation of another random variable $\epsilon$ , given the latent vector $z$ and encoder parameter vector $\phi$ $$z = g(\epsilon, \phi, x) = \mu + \sigma \cdot \epsilon$$where the distribution of random variable $\epsilon$ is independent of $x$ or $\phi$. The expectation can be rewritten as $$\mathbb{E}_{\mathbf{q_\phi(z|x)}}[f(z)] = \mathbb{E}_{p(\epsilon)}[f(z)]$$Now we can bring the gradient into the expectation $$\nabla_{\phi}\mathbb{E}_{p(\epsilon)}[f(z)] = \mathbb{E}_{p(\epsilon)}[\nabla_{\phi}f(z)]$$Which can be formed into a simple MC estimator $\nabla_{\phi}f(z)$
![[Variational Autoencoders.png]]

### Losses
The loss function consists of 2 terms: the reconstruction loss and the KL Divergence.

**Reconstruction Loss:**
For Gaussian input, $p_{\theta}(x|z) = \mathcal{N}(y_{\mu}, y_{\sigma})$ $$
\begin{align} & p_{\theta}(z|x) = (\frac{1}{y_{\sigma}\sqrt{2\pi}}e^{-\frac{1}{2}(\frac{x - y_{\mu}}{y_{\sigma}})^2}) \\ &

log(p_{\theta}(z|x)) = -log y_{\sigma}  - log \sqrt{2\pi} - \frac{1}{2y_{\sigma} {}^2}(x - y_\mu)^2 
\end{align}
$$To maximize $logp_{\theta}(x|z)$, we need to minimize both $(x - y_{\mu})^2$ and $y_{\sigma}$. However, optimizing both simultaneously leads to bad behaviors (won’t get into specifics because long), and so we optimize for $y_{\mu}$ and setting $y_{\sigma}$ to 1.    
Thus, we can simply minimize the mean square error $(x - y_{\mu})^2$.

For Bernoulli input, $p_{\theta}(x|z) = Bernoulli(y)$ where x and z are vectors$$\begin{align} &
p_{\theta}(x;p) = p^{x} (1 - p)^{1-x};\ x \in \{0, 1\}\\ &
p_{\theta}(x;p) = \prod_{i=1}^{D}p_i^{x_i} (1 - p_i)^{1-x_i};\ x_i \in \{0, 1\}\\ & 
\sum^D_{i=1}{x_ilogy_i + (1-x_i)log(1 - y_i)}
\end{align}
$$which is the exact form of the negative Binary Cross-Entropy loss $-BCE(y, x)$.

**KL Divergence**
$$\mathbb{E}_{\mathbf{q_\phi(z|x)}} \left[
\log \frac{ \mathbf{q_\phi(z|x)} }{ p_\theta(\mathbf{z|x}) }
    \right] = \int q_{\phi}(z|x) log\ \frac{q_{\phi}(z|x)}{p_{\theta}(z)}dz $$For Gaussian prior and posterior $p_{\theta} = \mathcal{N}(\mathbf{z};\mu, \sigma^2)$ and $q_\phi = \mathcal{N}(\mathbf{z};0, 1)$ where J is the dimensionality of $\mathbf{z}$, we get  $$\begin{align} & \int q_\phi(z|x)log\frac{1}{\sigma}e^{-\frac{1}{2}[(\frac{z - \mu}{\sigma})^2 - z^2]} dz \\ & 
-\frac{1}{2} \int q_\phi(z|x)[log \sigma^2 - z^2 + \frac{1}{\sigma^2}]dz \\ &
-\frac{1}{2}[log \sigma^2 \int q_\phi (z | x) dz - \int z^2q_\phi(z|x)dz + \frac{1}{\sigma^2} \int (z - \mu)^2 q\phi(z|x) dz]
\end{align}$$Using integral identities, we can simplify this expression down to $$-\frac{1}{2}[log\sigma^2 - \mu^2 - \sigma^2 + 1]$$
 