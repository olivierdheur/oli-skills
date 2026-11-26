---
name: NumPy Patterns
description: Efficient numerical computing with NumPy - arrays, broadcasting, vectorization, and performance
---

# NumPy Patterns

Essential patterns for efficient numerical computing in Python.

**Source**: [Python Data Science Handbook](https://jakevdp.github.io/PythonDataScienceHandbook/) by Jake VanderPlas

## Core Concepts

### Array Creation

```python
import numpy as np

# From lists
arr = np.array([1, 2, 3, 4, 5])
matrix = np.array([[1, 2], [3, 4]])

# Zeros, ones, ranges
np.zeros((3, 4))                    # 3x4 zeros
np.ones((2, 3), dtype=float)        # 2x3 ones
np.full((3, 3), 7)                  # 3x3 filled with 7
np.eye(4)                           # 4x4 identity matrix

# Ranges
np.arange(0, 10, 2)                 # [0, 2, 4, 6, 8]
np.linspace(0, 1, 5)                # [0, 0.25, 0.5, 0.75, 1.0]

# Random
np.random.random((3, 3))            # Uniform [0, 1)
np.random.randn(3, 3)               # Normal distribution
np.random.randint(0, 10, (3, 3))    # Random integers
```

### Indexing & Slicing

```python
arr = np.arange(10)

# Basic slicing
arr[2:5]        # [2, 3, 4]
arr[::2]        # [0, 2, 4, 6, 8] - every 2nd
arr[::-1]       # Reverse

# 2D indexing
matrix = np.arange(12).reshape(3, 4)
matrix[1, 2]           # Single element
matrix[0:2, 1:3]       # Submatrix
matrix[:, 0]           # First column
matrix[1, :]           # Second row

# Boolean indexing
arr[arr > 5]           # Elements > 5
arr[(arr > 2) & (arr < 7)]  # Compound condition

# Fancy indexing
indices = [1, 3, 5]
arr[indices]           # Elements at indices
```

### Broadcasting

NumPy's most powerful feature - operations on different-shaped arrays.

```python
# Scalar broadcast
arr = np.array([1, 2, 3])
arr + 5                      # [6, 7, 8]

# 1D + 2D broadcast
row = np.array([1, 2, 3])
col = np.array([[1], [2], [3]])
row + col                    # 3x3 addition table

# Rules:
# 1. Trailing dimensions must match or be 1
# 2. Missing dimensions are treated as 1
# 3. Dimensions of size 1 are stretched

# Example: Normalize columns
data = np.random.randn(100, 5)
mean = data.mean(axis=0)     # Shape (5,)
std = data.std(axis=0)       # Shape (5,)
normalized = (data - mean) / std  # Broadcasting works!
```

### Vectorization (Avoid Loops!)

```python
# SLOW: Python loops
def slow_add(a, b):
    result = np.empty_like(a)
    for i in range(len(a)):
        result[i] = a[i] + b[i]
    return result

# FAST: Vectorized
def fast_add(a, b):
    return a + b  # 100x+ faster

# Vectorize custom functions
def my_func(x):
    if x < 0: return 0
    else: return x ** 2

vectorized = np.vectorize(my_func)
vectorized(np.array([-1, 0, 1, 2]))  # [0, 0, 1, 4]

# Better: use np.where
arr = np.array([-1, 0, 1, 2])
np.where(arr < 0, 0, arr ** 2)       # [0, 0, 1, 4]
```

### Universal Functions (ufuncs)

```python
arr = np.array([1, 2, 3, 4, 5])

# Math
np.sqrt(arr)
np.exp(arr)
np.log(arr)
np.sin(arr)
np.power(arr, 2)

# Comparison (return boolean arrays)
arr > 3           # [False, False, False, True, True]
np.greater(arr, 3)

# Aggregation
np.sum(arr)
np.prod(arr)
np.mean(arr)
np.std(arr)
np.min(arr), np.max(arr)
np.argmin(arr), np.argmax(arr)  # Index of min/max

# Along axes
matrix = np.random.randn(3, 4)
matrix.sum(axis=0)   # Sum columns → shape (4,)
matrix.sum(axis=1)   # Sum rows → shape (3,)
```

### Reshaping & Stacking

```python
arr = np.arange(12)

# Reshape
arr.reshape(3, 4)        # 3x4 matrix
arr.reshape(3, -1)       # -1 infers dimension
arr.reshape(-1, 1)       # Column vector

# Flatten
matrix.ravel()           # 1D view (shares memory)
matrix.flatten()         # 1D copy

# Stack arrays
a = np.array([1, 2, 3])
b = np.array([4, 5, 6])

np.vstack([a, b])        # [[1,2,3], [4,5,6]]
np.hstack([a, b])        # [1,2,3,4,5,6]
np.column_stack([a, b])  # [[1,4], [2,5], [3,6]]
np.concatenate([a, b])   # [1,2,3,4,5,6]

# Split
np.split(arr, 3)         # 3 equal parts
np.array_split(arr, 5)   # 5 parts (unequal ok)
```

### Performance Tips

```python
# 1. Preallocate arrays
result = np.empty(1000)
for i in range(1000):
    result[i] = compute(i)

# 2. Use views, not copies
arr = np.arange(10)
view = arr[2:5]          # View (shares memory)
copy = arr[2:5].copy()   # Copy (separate memory)

# 3. Use in-place operations
arr += 1                 # In-place (no copy)
arr = arr + 1            # Creates new array

# 4. Use appropriate dtypes
np.array([1, 2, 3], dtype=np.int32)   # 4 bytes each
np.array([1, 2, 3], dtype=np.int8)    # 1 byte each

# 5. Use np.einsum for complex operations
# Matrix multiply + trace in one operation
np.einsum('ij,jk->ik', A, B)   # Same as A @ B
np.einsum('ii->', A)            # Trace
```

### Common Patterns

```python
# Distance matrix
points = np.random.randn(100, 2)
diff = points[:, np.newaxis, :] - points[np.newaxis, :, :]
distances = np.sqrt((diff ** 2).sum(axis=2))

# One-hot encoding
labels = np.array([0, 2, 1, 0, 2])
n_classes = 3
one_hot = np.eye(n_classes)[labels]

# Moving average
def moving_average(arr, window):
    return np.convolve(arr, np.ones(window)/window, mode='valid')

# Binning/digitizing
data = np.random.randn(100)
bins = np.array([-2, -1, 0, 1, 2])
indices = np.digitize(data, bins)  # Which bin each value falls in

# Clip values
np.clip(arr, 0, 10)  # Clamp to [0, 10]
```

### Memory Layout

```python
# C-order (row-major) vs Fortran-order (column-major)
c_arr = np.array([[1, 2], [3, 4]], order='C')    # Row-major
f_arr = np.array([[1, 2], [3, 4]], order='F')    # Column-major

# Check contiguity
arr.flags['C_CONTIGUOUS']
arr.flags['F_CONTIGUOUS']

# Force contiguous for performance
np.ascontiguousarray(arr)
```

## Quick Reference

| Operation | NumPy |
|-----------|-------|
| Element-wise add | `a + b` |
| Matrix multiply | `a @ b` or `np.dot(a, b)` |
| Element-wise multiply | `a * b` |
| Transpose | `a.T` |
| Inverse | `np.linalg.inv(a)` |
| Determinant | `np.linalg.det(a)` |
| Eigenvalues | `np.linalg.eig(a)` |
| SVD | `np.linalg.svd(a)` |
| Solve Ax=b | `np.linalg.solve(A, b)` |
