# HTML Elements in Markdown Test

This is a test file to verify that HTML elements are properly rendered in markdown.

## Basic HTML Elements

### Span with Color
<span style="color:red;">This text should be red</span>

### Span with Background Color
<span style="background-color:yellow;">This text should have a yellow background</span>

### Bold with HTML
<b>This text should be bold using HTML tags</b>

### Italic with HTML
<i>This text should be italic using HTML tags</i>

### Underline
<u>This text should be underlined</u>

## Advanced HTML Elements

### Div with Border
<div style="border: 1px solid blue; padding: 10px; margin: 10px 0;">
This content should be inside a div with a blue border
</div>

### Table
<table style="border-collapse: collapse; width: 100%;">
  <tr>
    <th style="border: 1px solid black; padding: 8px;">Header 1</th>
    <th style="border: 1px solid black; padding: 8px;">Header 2</th>
  </tr>
  <tr>
    <td style="border: 1px solid black; padding: 8px;">Cell 1</td>
    <td style="border: 1px solid black; padding: 8px;">Cell 2</td>
  </tr>
</table>

### Custom Styling
<p style="font-family: monospace; font-size: 16px; letter-spacing: 2px;">
This paragraph should have custom styling with monospace font and letter spacing
</p>

## Combining Markdown and HTML

### List with Styled Items
- Regular list item
- <span style="color:green;">Green list item</span>
- *Italic markdown* with <span style="color:purple;">purple HTML span</span>

### Code Block with HTML
Here's a code block:
```javascript
const test = () => {
  console.log("This is a test");
};
```
And <span style="color:red;">this text</span> should be red.