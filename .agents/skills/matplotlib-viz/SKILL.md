---
name: Matplotlib & Data Visualization
description: Creating publication-quality visualizations with Matplotlib and Seaborn
---

# Matplotlib & Data Visualization

Create publication-quality plots and visualizations in Python.

**Source**: [Python Data Science Handbook](https://jakevdp.github.io/PythonDataScienceHandbook/) by Jake VanderPlas

## Basic Setup

```python
import matplotlib.pyplot as plt
import numpy as np

# Two interfaces:
# 1. MATLAB-style (plt.xxx) - quick plots
# 2. Object-oriented (fig, ax) - more control

# Object-oriented (recommended)
fig, ax = plt.subplots()
ax.plot(x, y)
plt.show()

# Save figure
fig.savefig('plot.png', dpi=300, bbox_inches='tight')
fig.savefig('plot.pdf')  # Vector format
fig.savefig('plot.svg')  # Vector format
```

## Line Plots

```python
x = np.linspace(0, 10, 100)
y = np.sin(x)

fig, ax = plt.subplots(figsize=(10, 6))

# Basic line
ax.plot(x, y)

# Styled line
ax.plot(x, y, 
        color='blue',           # or 'b', '#1f77b4', (0.1, 0.2, 0.5)
        linestyle='--',         # '-', '--', '-.', ':', 'None'
        linewidth=2,
        marker='o',             # 'o', 's', '^', 'D', 'x', '+'
        markersize=5,
        markerfacecolor='white',
        markeredgecolor='blue',
        label='sin(x)')

# Shorthand: 'ro--' = red circles with dashed line
ax.plot(x, y, 'g^-', label='data')

ax.set_xlabel('X axis')
ax.set_ylabel('Y axis')
ax.set_title('My Plot')
ax.legend()
ax.grid(True, alpha=0.3)
```

## Scatter Plots

```python
x = np.random.randn(100)
y = np.random.randn(100)
colors = np.random.randn(100)
sizes = np.abs(np.random.randn(100)) * 100

fig, ax = plt.subplots()

scatter = ax.scatter(x, y, 
                     c=colors,          # Color by value
                     s=sizes,           # Size by value
                     cmap='viridis',    # Colormap
                     alpha=0.7,
                     edgecolors='black')

fig.colorbar(scatter, label='Value')
```

## Bar Charts

```python
categories = ['A', 'B', 'C', 'D']
values = [23, 45, 56, 78]

fig, ax = plt.subplots()

# Vertical bars
ax.bar(categories, values, color='steelblue', edgecolor='black')

# Horizontal bars
ax.barh(categories, values)

# Grouped bars
x = np.arange(len(categories))
width = 0.35
ax.bar(x - width/2, values1, width, label='Group 1')
ax.bar(x + width/2, values2, width, label='Group 2')
ax.set_xticks(x)
ax.set_xticklabels(categories)

# Stacked bars
ax.bar(categories, values1, label='Group 1')
ax.bar(categories, values2, bottom=values1, label='Group 2')
```

## Histograms

```python
data = np.random.randn(1000)

fig, ax = plt.subplots()

# Basic histogram
ax.hist(data, bins=30, edgecolor='black')

# Customized
ax.hist(data, 
        bins=50,
        density=True,           # Normalize to probability density
        alpha=0.7,
        color='steelblue',
        edgecolor='black')

# Multiple histograms
ax.hist([data1, data2], bins=30, label=['A', 'B'], alpha=0.7)

# 2D histogram
ax.hist2d(x, y, bins=30, cmap='Blues')
```

## Subplots

```python
# Grid of subplots
fig, axes = plt.subplots(2, 3, figsize=(12, 8))

# Access: axes[row, col] or axes.flat[index]
axes[0, 0].plot(x, y)
axes[1, 2].scatter(x, y)

# Shared axes
fig, axes = plt.subplots(2, 2, sharex=True, sharey=True)

# Different sizes with GridSpec
from matplotlib.gridspec import GridSpec
fig = plt.figure(figsize=(12, 8))
gs = GridSpec(2, 3)
ax1 = fig.add_subplot(gs[0, :])      # Top row, all columns
ax2 = fig.add_subplot(gs[1, 0])      # Bottom left
ax3 = fig.add_subplot(gs[1, 1:])     # Bottom right 2 columns

plt.tight_layout()
```

## Customization

### Axes & Labels

```python
ax.set_xlim(0, 10)
ax.set_ylim(-1, 1)
ax.set_xlabel('X', fontsize=12)
ax.set_ylabel('Y', fontsize=12)
ax.set_title('Title', fontsize=14, fontweight='bold')

# Log scale
ax.set_xscale('log')
ax.set_yscale('log')

# Ticks
ax.set_xticks([0, 2, 4, 6, 8, 10])
ax.set_xticklabels(['zero', 'two', 'four', 'six', 'eight', 'ten'])
ax.tick_params(axis='x', rotation=45)

# Scientific notation
ax.ticklabel_format(style='scientific', axis='y', scilimits=(0,0))
```

### Text & Annotations

```python
# Text
ax.text(5, 0.5, 'Label', fontsize=12, ha='center')

# Annotation with arrow
ax.annotate('Peak', 
            xy=(x_peak, y_peak),          # Point to annotate
            xytext=(x_text, y_text),      # Text position
            arrowprops=dict(arrowstyle='->', color='red'),
            fontsize=10)

# Math text (LaTeX)
ax.set_title(r'$\alpha > \beta$')
ax.text(0.5, 0.5, r'$\int_0^1 x^2 dx = \frac{1}{3}$')
```

### Legends

```python
ax.legend(loc='upper right')      # Location
ax.legend(loc='best')             # Auto-place
ax.legend(ncol=2)                 # 2 columns
ax.legend(frameon=False)          # No box
ax.legend(bbox_to_anchor=(1.05, 1), loc='upper left')  # Outside

# Custom legend
from matplotlib.lines import Line2D
legend_elements = [
    Line2D([0], [0], color='b', label='Line'),
    Line2D([0], [0], marker='o', color='w', markerfacecolor='r', label='Points')
]
ax.legend(handles=legend_elements)
```

### Colormaps

```python
# Sequential: viridis, plasma, inferno, magma, cividis
# Diverging: RdBu, coolwarm, seismic
# Qualitative: Set1, Set2, tab10, tab20

plt.imshow(data, cmap='viridis')
plt.colorbar()

# Custom colormap
from matplotlib.colors import LinearSegmentedColormap
colors = ['white', 'blue', 'red']
cmap = LinearSegmentedColormap.from_list('custom', colors)
```

## Specialized Plots

### Error Bars

```python
ax.errorbar(x, y, yerr=errors, fmt='o', capsize=5)
ax.errorbar(x, y, xerr=x_err, yerr=y_err, fmt='none')

# Fill between for uncertainty
ax.fill_between(x, y-err, y+err, alpha=0.3)
```

### Heatmaps

```python
data = np.random.randn(10, 10)
im = ax.imshow(data, cmap='coolwarm', aspect='auto')
fig.colorbar(im)

# With labels
ax.set_xticks(range(10))
ax.set_yticks(range(10))
ax.set_xticklabels(col_labels)
ax.set_yticklabels(row_labels)
```

### Contour Plots

```python
X, Y = np.meshgrid(x, y)
Z = np.sin(X) * np.cos(Y)

# Lines
cs = ax.contour(X, Y, Z, levels=10)
ax.clabel(cs, inline=True, fontsize=8)

# Filled
ax.contourf(X, Y, Z, levels=20, cmap='viridis')
```

### 3D Plots

```python
from mpl_toolkits.mplot3d import Axes3D

fig = plt.figure()
ax = fig.add_subplot(111, projection='3d')

# 3D scatter
ax.scatter(x, y, z, c=colors, cmap='viridis')

# 3D surface
ax.plot_surface(X, Y, Z, cmap='viridis')

# 3D wireframe
ax.plot_wireframe(X, Y, Z)

ax.set_xlabel('X')
ax.set_ylabel('Y')
ax.set_zlabel('Z')
```

## Seaborn (High-Level Interface)

```python
import seaborn as sns

# Set style
sns.set_theme(style='whitegrid')  # darkgrid, white, dark, ticks

# Statistical plots
sns.histplot(data, kde=True)
sns.boxplot(x='category', y='value', data=df)
sns.violinplot(x='category', y='value', data=df)
sns.swarmplot(x='category', y='value', data=df)

# Relationships
sns.scatterplot(x='x', y='y', hue='category', size='value', data=df)
sns.lineplot(x='time', y='value', hue='group', data=df)
sns.regplot(x='x', y='y', data=df)  # With regression line

# Distributions
sns.kdeplot(data)
sns.ecdfplot(data)

# Categorical
sns.countplot(x='category', data=df)
sns.barplot(x='category', y='value', data=df)  # With error bars

# Heatmaps
sns.heatmap(correlation_matrix, annot=True, cmap='coolwarm', center=0)

# Pair plots (scatter matrix)
sns.pairplot(df, hue='category')

# Joint plots
sns.jointplot(x='x', y='y', data=df, kind='scatter')  # hex, kde, reg

# FacetGrid (small multiples)
g = sns.FacetGrid(df, col='category', row='group')
g.map(sns.scatterplot, 'x', 'y')
```

## Style & Themes

```python
# Built-in styles
plt.style.use('seaborn-v0_8')
plt.style.use('ggplot')
plt.style.use('fivethirtyeight')
plt.style.use('dark_background')

# Temporary style
with plt.style.context('seaborn-v0_8'):
    plt.plot(x, y)

# Custom rcParams
plt.rcParams.update({
    'font.size': 12,
    'font.family': 'sans-serif',
    'axes.labelsize': 14,
    'axes.titlesize': 16,
    'figure.figsize': (10, 6),
    'figure.dpi': 100
})
```

## Quick Reference

| Plot Type | Function |
|-----------|----------|
| Line | `ax.plot()` |
| Scatter | `ax.scatter()` |
| Bar | `ax.bar()`, `ax.barh()` |
| Histogram | `ax.hist()` |
| Box | `ax.boxplot()` |
| Pie | `ax.pie()` |
| Heatmap | `ax.imshow()`, `sns.heatmap()` |
| Contour | `ax.contour()`, `ax.contourf()` |
| 3D | `ax.plot_surface()` |
| Error bars | `ax.errorbar()` |
| Fill | `ax.fill_between()` |
