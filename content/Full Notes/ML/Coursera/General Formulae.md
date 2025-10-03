#### Linear Function: $f_{w,b}(x^{(i)}) = w . x^{(i)} + b$ 

#### Cost Function: $J(w, b) = \sum_{i=1}^{m-1} (f_{w,b}(x^{(i)}) - y^{(i)})^2$ 

#### Partial Derivatives: 
#### $\frac{\partial J(w, b)}{\partial w_j} = \frac{1}{m}\sum_{i=1}^{m-1} (f_{w,b}(x^{(i)}) - y^{(i)})x_j^{(i)}$        
#### $\frac{\partial J(w, b)}{\partial b} = \frac{1}{m}\sum_{i=1}^{m-1} (f_{w,b}(x^{(i)}) - y^{(i)})$  

#### Gradient Descent:
**repeat until convergence: {
#### $w_j = w_j - \frac{\partial J(w, b)}{\partial w_j}$ 
#### $b = b - \frac{\partial J(w, b)}{\partial b_j}$ 
}**
