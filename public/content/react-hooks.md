---
title: "React Hooks"
category: "React"
tags: ["hooks", "useState", "useEffect"]
date: 2024-01-20
---

# React Hooks

React Hooks revolutionized how we write React components by allowing us to use state and other React features in functional components.

## Introduction

Hooks were introduced in React 16.8 as a way to use state and lifecycle features without writing class components. They make code more reusable and easier to understand.

## useState Hook

The `useState` hook lets you add state to functional components.

```jsx
import { useState } from 'react';

function Counter() {
  const [count, setCount] = useState(0);
  
  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>
        Increment
      </button>
    </div>
  );
}
```

### Multiple State Variables

You can use `useState` multiple times in a single component:

```jsx
function UserProfile() {
  const [name, setName] = useState('');
  const [age, setAge] = useState(0);
  const [email, setEmail] = useState('');
  
  return (
    <form>
      <input 
        value={name} 
        onChange={(e) => setName(e.target.value)} 
        placeholder="Name"
      />
      <input 
        type="number"
        value={age} 
        onChange={(e) => setAge(e.target.value)} 
        placeholder="Age"
      />
      <input 
        type="email"
        value={email} 
        onChange={(e) => setEmail(e.target.value)} 
        placeholder="Email"
      />
    </form>
  );
}
```

## useEffect Hook

The `useEffect` hook lets you perform side effects in functional components. It combines the functionality of `componentDidMount`, `componentDidUpdate`, and `componentWillUnmount`.

```jsx
import { useState, useEffect } from 'react';

function DataFetcher() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    fetch('https://api.example.com/data')
      .then(response => response.json())
      .then(data => {
        setData(data);
        setLoading(false);
      });
  }, []); // Empty dependency array = run once on mount
  
  if (loading) return <p>Loading...</p>;
  return <div>{JSON.stringify(data)}</div>;
}
```

### Effect Dependencies

The dependency array controls when the effect runs:

```jsx
// Run on every render
useEffect(() => {
  console.log('Runs on every render');
});

// Run once on mount
useEffect(() => {
  console.log('Runs once on mount');
}, []);

// Run when specific values change
useEffect(() => {
  console.log('Runs when count changes');
}, [count]);
```

### Cleanup Functions

Return a cleanup function to handle cleanup:

```jsx
useEffect(() => {
  const timer = setInterval(() => {
    console.log('Tick');
  }, 1000);
  
  // Cleanup function
  return () => {
    clearInterval(timer);
  };
}, []);
```

## Custom Hooks

Create your own hooks to reuse stateful logic:

```jsx
function useLocalStorage(key, initialValue) {
  const [value, setValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      return initialValue;
    }
  });
  
  useEffect(() => {
    try {
      window.localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error('Error saving to localStorage:', error);
    }
  }, [key, value]);
  
  return [value, setValue];
}

// Usage
function App() {
  const [name, setName] = useLocalStorage('name', '');
  
  return (
    <input
      value={name}
      onChange={(e) => setName(e.target.value)}
      placeholder="Enter your name"
    />
  );
}
```

## Rules of Hooks

> **Important**: Hooks must follow these rules to work correctly:

1. **Only call hooks at the top level** - Don't call hooks inside loops, conditions, or nested functions
2. **Only call hooks from React functions** - Call them from functional components or custom hooks
3. **Hooks must be called in the same order** - React relies on call order to maintain state

```jsx
// ❌ Wrong - conditional hook call
if (condition) {
  const [state, setState] = useState(0);
}

// ✅ Correct
const [state, setState] = useState(0);
if (condition) {
  setState(newValue);
}
```

## Other Common Hooks

### useContext

Access context values without wrapping components:

```jsx
import { useContext } from 'react';

const ThemeContext = React.createContext('light');

function ThemedButton() {
  const theme = useContext(ThemeContext);
  return <button className={theme}>Click me</button>;
}
```

### useRef

Create a mutable reference that persists across renders:

```jsx
import { useRef, useEffect } from 'react';

function TextInput() {
  const inputRef = useRef(null);
  
  useEffect(() => {
    inputRef.current.focus();
  }, []);
  
  return <input ref={inputRef} />;
}
```

### useMemo

Memoize expensive calculations:

```jsx
import { useMemo } from 'react';

function ExpensiveComponent({ items }) {
  const expensiveValue = useMemo(() => {
    return items.reduce((acc, item) => acc + item.value, 0);
  }, [items]);
  
  return <div>Total: {expensiveValue}</div>;
}
```

## Conclusion

React Hooks provide a powerful and elegant way to manage state and side effects in functional components. They make code more readable, reusable, and easier to test. Start with `useState` and `useEffect`, then explore other hooks and create custom ones as needed.
