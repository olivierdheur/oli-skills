---
name: Scikit-Learn Machine Learning
description: Machine learning fundamentals with Scikit-Learn - classification, regression, clustering, and model evaluation
---

# Scikit-Learn Machine Learning

Practical machine learning in Python with Scikit-Learn.

**Source**: [Python Data Science Handbook](https://jakevdp.github.io/PythonDataScienceHandbook/) by Jake VanderPlas

## The Scikit-Learn API

Every estimator follows the same pattern:

```python
from sklearn.some_module import SomeEstimator

# 1. Create estimator with hyperparameters
model = SomeEstimator(param1=value1, param2=value2)

# 2. Fit to training data
model.fit(X_train, y_train)

# 3. Predict/Transform
predictions = model.predict(X_test)
# or
transformed = model.transform(X_test)
```

## Data Preparation

### Train/Test Split

```python
from sklearn.model_selection import train_test_split

X_train, X_test, y_train, y_test = train_test_split(
    X, y, 
    test_size=0.2,          # 20% for testing
    random_state=42,        # Reproducibility
    stratify=y              # Preserve class ratios
)
```

### Feature Scaling

```python
from sklearn.preprocessing import StandardScaler, MinMaxScaler

# Standardization (mean=0, std=1)
scaler = StandardScaler()
X_train_scaled = scaler.fit_transform(X_train)
X_test_scaled = scaler.transform(X_test)  # Use same params!

# Min-Max scaling [0, 1]
scaler = MinMaxScaler()
X_scaled = scaler.fit_transform(X)

# Robust scaling (handles outliers)
from sklearn.preprocessing import RobustScaler
scaler = RobustScaler()
```

### Encoding Categorical Variables

```python
from sklearn.preprocessing import LabelEncoder, OneHotEncoder

# Label encoding (for target variable)
le = LabelEncoder()
y_encoded = le.fit_transform(y)

# One-hot encoding (for features)
from sklearn.preprocessing import OneHotEncoder
ohe = OneHotEncoder(sparse=False, handle_unknown='ignore')
X_encoded = ohe.fit_transform(X_categorical)

# Or use pandas
pd.get_dummies(df, columns=['category'])
```

## Supervised Learning

### Linear Regression

```python
from sklearn.linear_model import LinearRegression, Ridge, Lasso

# Basic linear regression
model = LinearRegression()
model.fit(X_train, y_train)
predictions = model.predict(X_test)

# Access coefficients
model.coef_       # Feature weights
model.intercept_  # Bias term

# Ridge (L2 regularization)
model = Ridge(alpha=1.0)

# Lasso (L1 regularization, feature selection)
model = Lasso(alpha=0.1)

# Elastic Net (L1 + L2)
from sklearn.linear_model import ElasticNet
model = ElasticNet(alpha=1.0, l1_ratio=0.5)
```

### Logistic Regression

```python
from sklearn.linear_model import LogisticRegression

model = LogisticRegression(
    C=1.0,                    # Inverse regularization strength
    penalty='l2',             # 'l1', 'l2', 'elasticnet', 'none'
    max_iter=1000,
    multi_class='auto'        # 'ovr', 'multinomial'
)
model.fit(X_train, y_train)

# Probabilities
probs = model.predict_proba(X_test)
```

### Decision Trees

```python
from sklearn.tree import DecisionTreeClassifier, DecisionTreeRegressor

model = DecisionTreeClassifier(
    max_depth=5,
    min_samples_split=10,
    min_samples_leaf=5,
    random_state=42
)
model.fit(X_train, y_train)

# Feature importance
model.feature_importances_

# Visualize tree
from sklearn.tree import plot_tree
plot_tree(model, feature_names=feature_names, filled=True)
```

### Random Forest

```python
from sklearn.ensemble import RandomForestClassifier, RandomForestRegressor

model = RandomForestClassifier(
    n_estimators=100,         # Number of trees
    max_depth=10,
    min_samples_split=5,
    n_jobs=-1,                # Use all cores
    random_state=42
)
model.fit(X_train, y_train)

# Feature importance
importances = model.feature_importances_
```

### Gradient Boosting

```python
from sklearn.ensemble import GradientBoostingClassifier

model = GradientBoostingClassifier(
    n_estimators=100,
    learning_rate=0.1,
    max_depth=3,
    random_state=42
)

# XGBoost (install separately)
from xgboost import XGBClassifier
model = XGBClassifier(n_estimators=100, learning_rate=0.1)

# LightGBM (install separately)
from lightgbm import LGBMClassifier
model = LGBMClassifier(n_estimators=100, learning_rate=0.1)
```

### Support Vector Machines

```python
from sklearn.svm import SVC, SVR

model = SVC(
    C=1.0,                    # Regularization
    kernel='rbf',             # 'linear', 'poly', 'rbf', 'sigmoid'
    gamma='scale',
    probability=True          # Enable predict_proba
)

# For large datasets, use LinearSVC
from sklearn.svm import LinearSVC
model = LinearSVC(C=1.0)
```

### K-Nearest Neighbors

```python
from sklearn.neighbors import KNeighborsClassifier, KNeighborsRegressor

model = KNeighborsClassifier(
    n_neighbors=5,
    weights='uniform',        # 'uniform', 'distance'
    metric='minkowski',
    n_jobs=-1
)
```

### Naive Bayes

```python
from sklearn.naive_bayes import GaussianNB, MultinomialNB, BernoulliNB

# For continuous features
model = GaussianNB()

# For count data (e.g., text)
model = MultinomialNB(alpha=1.0)

# For binary features
model = BernoulliNB()
```

## Unsupervised Learning

### K-Means Clustering

```python
from sklearn.cluster import KMeans

model = KMeans(
    n_clusters=3,
    init='k-means++',
    n_init=10,
    random_state=42
)
labels = model.fit_predict(X)

# Cluster centers
model.cluster_centers_

# Inertia (within-cluster sum of squares)
model.inertia_

# Elbow method to find optimal k
inertias = []
for k in range(1, 11):
    km = KMeans(n_clusters=k, random_state=42)
    km.fit(X)
    inertias.append(km.inertia_)
```

### DBSCAN

```python
from sklearn.cluster import DBSCAN

model = DBSCAN(
    eps=0.5,                  # Neighborhood radius
    min_samples=5             # Min points for core sample
)
labels = model.fit_predict(X)
# -1 indicates noise points
```

### Hierarchical Clustering

```python
from sklearn.cluster import AgglomerativeClustering

model = AgglomerativeClustering(
    n_clusters=3,
    linkage='ward'            # 'ward', 'complete', 'average', 'single'
)
labels = model.fit_predict(X)
```

### PCA (Dimensionality Reduction)

```python
from sklearn.decomposition import PCA

# Reduce to 2 components
pca = PCA(n_components=2)
X_reduced = pca.fit_transform(X)

# Variance explained
pca.explained_variance_ratio_

# Find components that explain 95% variance
pca = PCA(n_components=0.95)
X_reduced = pca.fit_transform(X)
```

### t-SNE

```python
from sklearn.manifold import TSNE

tsne = TSNE(
    n_components=2,
    perplexity=30,
    random_state=42
)
X_embedded = tsne.fit_transform(X)
# Note: fit_transform only, no transform method
```

## Model Evaluation

### Classification Metrics

```python
from sklearn.metrics import (
    accuracy_score, precision_score, recall_score, f1_score,
    classification_report, confusion_matrix, roc_auc_score
)

y_pred = model.predict(X_test)

accuracy_score(y_test, y_pred)
precision_score(y_test, y_pred, average='weighted')
recall_score(y_test, y_pred, average='weighted')
f1_score(y_test, y_pred, average='weighted')

print(classification_report(y_test, y_pred))

# Confusion matrix
cm = confusion_matrix(y_test, y_pred)

# ROC-AUC (need probabilities)
y_prob = model.predict_proba(X_test)[:, 1]
roc_auc_score(y_test, y_prob)

# ROC curve
from sklearn.metrics import roc_curve
fpr, tpr, thresholds = roc_curve(y_test, y_prob)
```

### Regression Metrics

```python
from sklearn.metrics import (
    mean_squared_error, mean_absolute_error, r2_score
)

y_pred = model.predict(X_test)

mse = mean_squared_error(y_test, y_pred)
rmse = np.sqrt(mse)
mae = mean_absolute_error(y_test, y_pred)
r2 = r2_score(y_test, y_pred)
```

### Cross-Validation

```python
from sklearn.model_selection import cross_val_score, cross_validate

# Simple cross-validation
scores = cross_val_score(model, X, y, cv=5, scoring='accuracy')
print(f"Accuracy: {scores.mean():.3f} (+/- {scores.std():.3f})")

# Multiple metrics
results = cross_validate(
    model, X, y, cv=5,
    scoring=['accuracy', 'f1', 'roc_auc'],
    return_train_score=True
)

# Stratified K-Fold (maintains class ratios)
from sklearn.model_selection import StratifiedKFold
skf = StratifiedKFold(n_splits=5, shuffle=True, random_state=42)
```

## Hyperparameter Tuning

### Grid Search

```python
from sklearn.model_selection import GridSearchCV

param_grid = {
    'n_estimators': [100, 200, 300],
    'max_depth': [5, 10, 15],
    'min_samples_split': [2, 5, 10]
}

grid_search = GridSearchCV(
    RandomForestClassifier(random_state=42),
    param_grid,
    cv=5,
    scoring='accuracy',
    n_jobs=-1,
    verbose=1
)
grid_search.fit(X_train, y_train)

# Best parameters and score
grid_search.best_params_
grid_search.best_score_
grid_search.best_estimator_
```

### Random Search

```python
from sklearn.model_selection import RandomizedSearchCV
from scipy.stats import randint, uniform

param_distributions = {
    'n_estimators': randint(50, 500),
    'max_depth': randint(3, 20),
    'min_samples_split': randint(2, 20),
    'learning_rate': uniform(0.01, 0.3)
}

random_search = RandomizedSearchCV(
    model,
    param_distributions,
    n_iter=100,              # Number of random combinations
    cv=5,
    scoring='accuracy',
    random_state=42,
    n_jobs=-1
)
random_search.fit(X_train, y_train)
```

## Pipelines

```python
from sklearn.pipeline import Pipeline
from sklearn.compose import ColumnTransformer

# Simple pipeline
pipe = Pipeline([
    ('scaler', StandardScaler()),
    ('pca', PCA(n_components=10)),
    ('classifier', LogisticRegression())
])
pipe.fit(X_train, y_train)
predictions = pipe.predict(X_test)

# Different preprocessing for different columns
preprocessor = ColumnTransformer(
    transformers=[
        ('num', StandardScaler(), numeric_features),
        ('cat', OneHotEncoder(handle_unknown='ignore'), categorical_features)
    ]
)

pipe = Pipeline([
    ('preprocessor', preprocessor),
    ('classifier', RandomForestClassifier())
])
```

## Quick Reference

| Task | Algorithms |
|------|------------|
| Classification | LogisticRegression, SVC, RandomForestClassifier, GradientBoostingClassifier |
| Regression | LinearRegression, Ridge, Lasso, RandomForestRegressor, GradientBoostingRegressor |
| Clustering | KMeans, DBSCAN, AgglomerativeClustering |
| Dimensionality Reduction | PCA, t-SNE, UMAP |
| Feature Selection | SelectKBest, RFE, SelectFromModel |
