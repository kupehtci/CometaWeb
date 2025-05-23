# Advanced Features

## Markdown Extensions

This viewer supports GitHub Flavored Markdown (GFM) which includes:

### Task Lists

- [x] Basic markdown rendering
- [x] Code syntax highlighting
- [x] Tables support
- [ ] Custom themes (coming soon)

### Strikethrough

~~This text is strikethrough~~

### Tables with Alignment

| Left-aligned | Center-aligned | Right-aligned |
| :----------- | :------------: | ------------: |
| Content      | Content        | Content       |
| Text         | Text           | Text          |

## Code Blocks with Syntax Highlighting

```python
def fibonacci(n):
    a, b = 0, 1
    for _ in range(n):
        yield a
        a, b = b, a + b

for number in fibonacci(10):
    print(number)
```

## Math Expressions

When using a compatible markdown renderer, you can include math expressions:

Inline math: $E=mc^2$

Block math:

$$
\frac{\partial f}{\partial x} = \lim_{h \to 0} \frac{f(x + h) - f(x)}{h}
$$

## Diagrams

Some markdown renderers support diagrams using Mermaid or other syntax:

```mermaid
graph TD;
    A-->B;
    A-->C;
    B-->D;
    C-->D;
```