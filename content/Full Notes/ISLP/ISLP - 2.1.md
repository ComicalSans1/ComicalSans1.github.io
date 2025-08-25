***f*** - The fixed but unknown function that connects the input variable to the output variable. It is the job of the model to estimate this function as accurately as possible.

 ## ***Y = f(X) + $\epsilon$***

There are two main reasons that we may wish to estimate *f* - **prediction** and **inference**.
#### Prediction:

In many situations, a set of inputs X are readily available, but the output Y cannot be easily obtained. In this setting, since the error term averages to zero, we can predict Y using 
###### $\hat{Y}$ = $\hat{f}$(X),

where $\hat{f}$ represents our estimate for *f*, and $\hat{Y}$ represents the resulting prediction for *Y*.

In this setting, **$\hat{f}$ is often treated as a black box, in the sense that one is not typically concerned with the exact form of $\hat{f}$, provided that it yields accurate predictions for Y .**

The accuracy of $\hat{Y}$ as a prediction of Y depends on 2 quantities: the *reducible* error and the *irreducible* error.
- Reducible errors occur from $\hat{f}$ not being a perfect estimate of f, and can be rectified by using the most appropriate statistical learning technique to estimate f.
- However, even if it were possible to form a perfect estimate for f, so that the estimated response took the form $\hat{f}$ = f(X), the prediction would still have some error in it, as Y is also a function of $\epsilon$, which by definition cannot be predicted using X.\
- $\epsilon$ can be larger than 0 either due to it being affected by other unmeasured variables, or due to there being some inherent randomness present in the data.

Assuming both $\hat{f}$ and X are fixed, 
![[Pasted image 20240913131711.png]]
where E(Y - $\hat{Y}$)$^{2}$ represents the average, or expected value, of the squared expected value difference between the predicted and actual value of Y, and Var($\epsilon$) represents the variance associated with the error term $\epsilon$.
#### Inference:

When we want to understand the association between the output and input variables,
$\hat{f}$ cannot be treated as a black box, as we need to know its exact form. In this case, we may be interested in answering the following questions:

- Which predictors affect the response?
- What is the relationship between the response and each predictor?
- Can the relationship between Y and each predictor be adequately summarized using a linear equation, or is the relationship more complicated?

### **Estimating *f***
#### Parametric Methods:

We make an assumption that *f* is linear i.e:

*f(X)* = $\beta_0$ + $\beta_1X_1$ + $\beta_2X_2$ + ... + $\beta_pX_p$  

Now instead of having to estimate an entirely arbitrary p-dimensional function f(X), one only needs to estimate the p + 1 coefficients.

After a model has been selected, we need a procedure that uses the training data to ft or train the model. In the case of the above function, we need to find the value of the parameters such that *Y* $\approx$  $\beta_0$ + $\beta_1X_1$ + $\beta_2X_2$ + ... + $\beta_pX_p$.

The most common method to do so is referred to as (ordinary) least squares.

Assuming a parametric form simplifies the problem of estimating *f* down to estimating a set of parameters, thus greatly simplifying the whole process.

The biggest disadvantage of the parametric approach is naturally, decreased accuracy.
We can try to address this problem by choosing flexible models that can ft many different possible functional forms flexible for f. But in general, fitting a more flexible model requires estimating a greater number of parameters.
This can lead to a phenomenon known as overfitting the data, which essentially means they follow the errors, or noise, too closely.

#### Non-Parametric Methods:

Non-parametric methods do not make explicit assumptions about the functional form of f. Instead they seek an estimate of f that gets as close to the data points as possible without being too rough or wiggly.

By not making any assumptions about the functional form of *f*, the model can fit a wider range of possible shapes for *f*.

The big drawback of non-parametric approaches is the increased complexity, needing a very large number of observations to obtain an accurate estimate for *f*.