---
name: Pandas Patterns
description: Data manipulation and analysis with Pandas - DataFrames, indexing, groupby, merging, and time series
---

# Pandas Patterns

Essential patterns for data manipulation and analysis in Python.

**Source**: [Python Data Science Handbook](https://jakevdp.github.io/PythonDataScienceHandbook/) by Jake VanderPlas

## Core Data Structures

### Series

```python
import pandas as pd
import numpy as np

# Create Series
s = pd.Series([1, 2, 3, 4], index=['a', 'b', 'c', 'd'])
s = pd.Series({'a': 1, 'b': 2, 'c': 3})

# Access
s['a']           # By label
s[0]             # By position
s[['a', 'c']]    # Multiple labels
s[s > 2]         # Boolean indexing
```

### DataFrame

```python
# Create DataFrame
df = pd.DataFrame({
    'name': ['Alice', 'Bob', 'Charlie'],
    'age': [25, 30, 35],
    'city': ['NYC', 'LA', 'Chicago']
})

# From dict of lists, arrays, or Series
# From list of dicts
# From CSV: pd.read_csv('file.csv')
# From SQL: pd.read_sql(query, connection)
```

## Indexing & Selection

### loc vs iloc

```python
# loc: label-based
df.loc[0]                    # Row with label 0
df.loc[0, 'name']            # Specific cell
df.loc[0:2, 'name':'age']    # Slice (inclusive!)
df.loc[df['age'] > 25]       # Boolean condition

# iloc: position-based
df.iloc[0]                   # First row
df.iloc[0, 1]                # Row 0, column 1
df.iloc[0:2, 0:2]            # Slice (exclusive!)
df.iloc[[0, 2], [0, 2]]      # Specific positions

# Common patterns
df['column']                 # Single column (Series)
df[['col1', 'col2']]         # Multiple columns (DataFrame)
df[df['age'] > 25]           # Filter rows
df.query('age > 25 and city == "NYC"')  # Query string
```

### Setting Values

```python
df.loc[0, 'age'] = 26
df['new_col'] = df['age'] * 2
df.loc[df['age'] > 30, 'category'] = 'senior'
```

## Data Cleaning

### Missing Values

```python
# Detect
df.isnull()           # Boolean mask
df.isnull().sum()     # Count per column
df.isnull().any()     # Any missing per column

# Handle
df.dropna()                        # Drop rows with any NaN
df.dropna(subset=['col1', 'col2']) # Drop if NaN in specific cols
df.fillna(0)                       # Fill with value
df.fillna(method='ffill')          # Forward fill
df.fillna(df.mean())               # Fill with column means
df['col'].interpolate()            # Interpolate missing
```

### Duplicates

```python
df.duplicated()                    # Boolean mask
df.drop_duplicates()               # Keep first
df.drop_duplicates(subset=['col']) # Based on column
df.drop_duplicates(keep='last')    # Keep last
```

### Type Conversion

```python
df['col'] = df['col'].astype(int)
df['date'] = pd.to_datetime(df['date'])
df['cat'] = df['cat'].astype('category')

# Parse dates on read
pd.read_csv('file.csv', parse_dates=['date_col'])
```

## Transformations

### Apply Functions

```python
# To columns
df['age'].apply(lambda x: x * 2)
df['name'].apply(str.upper)

# To rows
df.apply(lambda row: row['a'] + row['b'], axis=1)

# To entire DataFrame
df.applymap(lambda x: f"${x:.2f}")  # Format all cells

# Vectorized operations (prefer these!)
df['age'] * 2                       # Much faster than apply
np.where(df['age'] > 30, 'old', 'young')
```

### String Operations

```python
df['name'].str.lower()
df['name'].str.upper()
df['name'].str.strip()
df['name'].str.contains('pat', regex=True)
df['name'].str.replace('old', 'new')
df['name'].str.split(' ')
df['name'].str.len()
df['name'].str.extract(r'(\d+)')    # Regex extract
```

### Categorical Data

```python
df['grade'] = pd.Categorical(
    df['grade'],
    categories=['F', 'D', 'C', 'B', 'A'],
    ordered=True
)
df['grade'].cat.codes           # Numeric codes
df['grade'].cat.categories      # Category list
```

## Grouping & Aggregation

### GroupBy

```python
# Basic groupby
grouped = df.groupby('category')

# Aggregations
grouped.mean()
grouped.sum()
grouped.count()
grouped.agg(['mean', 'std', 'count'])
grouped.agg({'col1': 'sum', 'col2': 'mean'})

# Named aggregation (clean output)
df.groupby('category').agg(
    total=('amount', 'sum'),
    average=('amount', 'mean'),
    count=('amount', 'count')
)

# Multiple columns
df.groupby(['cat1', 'cat2']).mean()

# Transform (returns same shape)
df.groupby('category')['value'].transform('mean')  # Group means broadcast back

# Filter groups
df.groupby('category').filter(lambda x: len(x) > 10)
```

### Pivot Tables

```python
pd.pivot_table(
    df,
    values='sales',
    index='region',
    columns='quarter',
    aggfunc='sum',
    fill_value=0,
    margins=True      # Add totals
)

# Simple pivot (no aggregation, must be unique)
df.pivot(index='date', columns='variable', values='value')
```

### Crosstab

```python
pd.crosstab(df['cat1'], df['cat2'])
pd.crosstab(df['cat1'], df['cat2'], normalize='index')  # Row percentages
```

## Merging & Joining

### Merge (SQL-style joins)

```python
# Inner join (default)
pd.merge(df1, df2, on='key')

# Left/Right/Outer joins
pd.merge(df1, df2, on='key', how='left')
pd.merge(df1, df2, on='key', how='outer')

# Different column names
pd.merge(df1, df2, left_on='lkey', right_on='rkey')

# Multiple keys
pd.merge(df1, df2, on=['key1', 'key2'])

# Index-based
pd.merge(df1, df2, left_index=True, right_on='key')
```

### Concat (Stack DataFrames)

```python
# Vertical stack (add rows)
pd.concat([df1, df2], ignore_index=True)

# Horizontal stack (add columns)
pd.concat([df1, df2], axis=1)
```

### Join (Index-based merge)

```python
df1.join(df2, how='left')
df1.join(df2, on='key')  # Join on df1 column, df2 index
```

## Time Series

### DateTime Index

```python
# Create datetime index
dates = pd.date_range('2024-01-01', periods=100, freq='D')
df = pd.DataFrame({'value': np.random.randn(100)}, index=dates)

# Frequencies: 'D'=day, 'H'=hour, 'W'=week, 'M'=month, 'Y'=year
#              'B'=business day, 'Q'=quarter

# Parse dates
df['date'] = pd.to_datetime(df['date_str'])
df.set_index('date', inplace=True)
```

### Resampling

```python
# Downsample (aggregate)
df.resample('W').mean()      # Weekly average
df.resample('M').sum()       # Monthly sum
df.resample('Q').agg(['mean', 'std'])

# Upsample (interpolate)
df.resample('H').ffill()     # Forward fill to hourly
df.resample('H').interpolate()
```

### Rolling Windows

```python
df['rolling_mean'] = df['value'].rolling(window=7).mean()
df['rolling_std'] = df['value'].rolling(window=7).std()
df['expanding_mean'] = df['value'].expanding().mean()
df['ewm'] = df['value'].ewm(span=7).mean()  # Exponential weighted
```

### Shifting

```python
df['prev_value'] = df['value'].shift(1)      # Lag
df['next_value'] = df['value'].shift(-1)     # Lead
df['pct_change'] = df['value'].pct_change()  # Percent change
df['diff'] = df['value'].diff()              # Difference
```

## Performance Tips

```python
# 1. Use appropriate dtypes
df['id'] = df['id'].astype('int32')           # Smaller int
df['category'] = df['category'].astype('category')  # Categories

# 2. Avoid chained indexing
# BAD: df[df['a'] > 0]['b'] = 1
# GOOD: df.loc[df['a'] > 0, 'b'] = 1

# 3. Use vectorized operations
# BAD: df['c'] = df.apply(lambda x: x['a'] + x['b'], axis=1)
# GOOD: df['c'] = df['a'] + df['b']

# 4. Use query() for complex filters
df.query('a > 0 and b < 10')

# 5. Use eval() for complex expressions
df.eval('c = a + b * 2')

# 6. Read only needed columns
pd.read_csv('file.csv', usecols=['col1', 'col2'])

# 7. Use chunks for large files
for chunk in pd.read_csv('large.csv', chunksize=10000):
    process(chunk)
```

## Common Patterns

```python
# Value counts
df['category'].value_counts()
df['category'].value_counts(normalize=True)  # Percentages

# Binning continuous data
df['age_bin'] = pd.cut(df['age'], bins=[0, 18, 35, 50, 100])
df['age_qbin'] = pd.qcut(df['age'], q=4)  # Quartiles

# Rank
df['rank'] = df['score'].rank(ascending=False)

# Cumulative operations
df['cumsum'] = df['value'].cumsum()
df['cummax'] = df['value'].cummax()

# Sampling
df.sample(n=100)             # Random rows
df.sample(frac=0.1)          # 10% sample

# Memory usage
df.memory_usage(deep=True)
df.info(memory_usage='deep')
```

## Quick Reference

| Operation | Pandas |
|-----------|--------|
| Read CSV | `pd.read_csv('file.csv')` |
| Write CSV | `df.to_csv('file.csv', index=False)` |
| Read Excel | `pd.read_excel('file.xlsx')` |
| Read JSON | `pd.read_json('file.json')` |
| Read SQL | `pd.read_sql(query, conn)` |
| Shape | `df.shape` |
| Columns | `df.columns` |
| Dtypes | `df.dtypes` |
| Head/Tail | `df.head()`, `df.tail()` |
| Describe | `df.describe()` |
| Info | `df.info()` |
