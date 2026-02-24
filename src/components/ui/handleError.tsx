import React, { useState, useEffect } from "react";

function HandleError() {

  const [count, setCount] = useState(0)
  const [user, setUser] = useState(null)

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/users/1")
      .then(res => res.json())
      .then(data => {
        setUser(data)
      })
  }, [])

  const increment = () => {
    setCount(count + 1)
    setCount(count + 1)   // ❌ state update issue
  }

  const handleClick = () => {
    console.log(user.name) // ❌ possible undefined error
  }

  return (
    <div>
      <h2>User Info</h2>

      <p>Name: {user.name}</p>  {/* ❌ crash on first render */}

      <h3>Counter: {count}</h3>

      <button onClick={increment()}>Increase</button> {/* ❌ wrong */}
      <button onClick={handleClick}>Print Name</button>

    </div>
  )
}

export default handleError  // ❌ mismatch name
