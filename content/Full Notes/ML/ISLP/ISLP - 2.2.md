The most common way of measuring how well the predicted data lines up with the observed data is the *mean  squared error*(MSE) method, i.e.
##### **MSE** = $\frac{1}{n}\sum_{i=1}^{n}(y_i - \hat{f}(x_i))^2$   

The MSE of a model is computed using the training data that was used to fit the model. The accuracy of the model to the training data is largely irrelevant, the focus being on the accuracy of the predictions that we obtain when we apply our method to previously unseen test data.

A model is said to *overfit* the data if the it yields a large test MSE despite yielding a small test MSE. This happens when the model tries too hard to find patterns in the data, and thus may pick up some patterns that are just caused by random chance rather than being actual patterns in *f*. 

This leads to a much higher MSE in the test data as the patterns the model picked up simple aren't present in the training data. In this case, a less flexible model would have yielded a smaller test MSE.

### Bias-Variance Tradeoff

The expected test MSE for a given value $x_0$ can always be decomposed into the sum of three fundamental quantities: the variance of $\hat{f}(x_0)$, the squared *bias* of $\hat{f}(x_0)$ and the variance of the error variance bias terms $\epsilon$. That is, 
#### $E((y_0) - \hat{f}(x_0))^2$ = $Var(\hat{f}(x_0)) + [Bias(\hat{f}(x_0))]^2 + Var(\epsilon)$.

Here, $E((y_0) - \hat{f}(x_0))^2$ defines the *expected test MSE* at $x_0$, and refers to the average test MSE obtained by repeatedly estimating f using a large number of training sets, and testing each at $x_0$.
The overall expected test MSE can be computed by averaging $E((y_0) - \hat{f}(x_0))^2$ over all possible values of $x_0$ in the test set.

This equation tells us that in order to minimize the expected test error, we need to select a method that simultaneously achieves *low variance* and *low bias*.

As both variance and squared bias are non-negative quantities, the expected test MSE can never lie below $Var(\epsilon)$, the irreducible error.

Here, **Variance** refers to the amount by which $\hat{f}$ would change if we estimated it using a different training data set.
Ideally, the estimate for *f* should not vary too much between training sets. However, if a method has high variance then small changes in the training data can result in large changes in $\hat{f}$.
In general, more flexible statistical methods have higher variance.

**Bias** refers to the error that is introduced by approximating a real-life problem, which may be extremely complicated, by a much simpler model. For example, if a function is highly non-linear, we would not be able to accurately estimate it using a linear regression, resulting in a high *bias*. 
Generally, more flexible methods result in less bias.

The reason it's a tradeoff is because the factors that affect variance affect bias inversely. Increasing the flexibility to mitigate bias increases the variance, and vice versa. Thus, the challenge lies in finding a method for which both the variance and squared bias are low.

Because of this, you can find simpler models outperforming more complex ones if they have very little bias. 

##### Regarding Classification

Many of the same concepts that apply to regression bias-variance tradeoff transfer over to classification, the only modifications being due to the fact that $y_i$ is no longer quantitative.

The most common way of quantifying the accuracy of an estimate $\hat{f}$ is the training *error rate*, the proportion of mistakes that are made if we apply our estimate $\hat{f}$ to the training observations
#### $\frac{1}{n}\sum_{i=1}^{n}I(y_i \neq \hat{y}_i)$.

Here, $\hat{y}_i$ is the predicted class label for the $i$th observation using $\hat{f}$, and $I(y_i \neq \hat{y}_i)$ is an *indicator variable* that equals 1 if $y_i \neq \hat{y}_i$ and 0 if $y_i = \hat{y}_i$.
$I(y_i \neq \hat{y}_i)$ = 0 indicates a correct classification and 1 indicates an incorrect classification. Hence, the above equation calculates the fraction of incorrect classifications.
This equation is called the *training error rate* as it is computed on training data.

The *test error* rate for test observations of the form ($x_0, y_0$) is given by
#### $Ave(I(y_0 \neq \hat{y}_0))$,

where $\hat{y}_0$ is the predicted class label that results from applying the classifier to the test observation with predictor $x_0$. A *good* classifier is one for which the test error is smallest.

#### The Bayes Classifier

It is possible to show that the test error rate $Ave(I(y_0 \neq \hat{y}_0))$ is minimized, on average, by a very simple classifier that assigns each observation to the most likely class, given its predictor values. That is, the class where 
##### **$Pr(Y = j|X = x_0)$** 

is largest.

The Bayes classifier produces the lowest possible test error rate, called the Bayes error rate. Since the Bayes classifier will always choose the class for which $Pr(Y = j|X = x_0)$ is largest, the overall error rate will be $1 - max_jPr(Y = j|X = x_0)$  at $X = x_0$. The overall Bayes error rate is given by
##### $1 - E(max_jPr(Y = j | X))$  ,

where E(the expectation) averages the probability over all possible values of X. The Bayes error rate is analogous to irreducible error.

**NOTE :** The Bayes classifier requtesires the knowledge of the conditional distribution of Y given X, which is not possible for real data. Thus, this classifier serves as an **unattainable gold standard** against which to compare other methods.
Other approaches attempt to estimate the conditional distribution of Y given X, and then classify a given observation to the class with highest *estimated* probability.

#### K-Nearest Neighbors

One such example of a feasible but non-perfect method is the *K-nearest neighbors*(KNN) classifier. Given a positive integer $K$ and a test observation $x_0$, the KNN classifier first identifies the $K$ points in the training data that are closest to $x_0$, represented by $\cal{N}_0$. 
It then estimates the conditional probability for class *j* as the fraction of points in $\cal{N}_0$ whose response values equal *j*:
##### $Pr(Y = j|X = x_0) = \frac{1}{K}\sum_{i \in \cal{N}_0}I(y_i = j)$.

Finally, KNN classifies the test observation x0 to the class with the largest probability from the above equation.
As usual, making $K$ too large or too small results in decreased accuracy.