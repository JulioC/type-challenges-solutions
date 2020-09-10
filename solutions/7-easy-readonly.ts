/*
  4 - Pick<T, K>
  -------
  by Anthony Fu (@antfu) #easy #union #built-in
  
  ### Question
  
  Implement the built-in `Pick<T, K>` generic without using it.
  
  Constructs a type by picking the set of properties `T` from `K`
  
  For example
  
  ```ts
  interface Todo {
    title: string
    description: string
    completed: boolean
  }
  
  type TodoPreview = MyPick<Todo, 'title' | 'completed'>
  
  const todo: TodoPreview = {
      title: 'Clean room',
      completed: false,
  }
  ```
  
  > View on GitHub: https://tsch.js.org/4
*/


/* _____________ Your Code Here _____________ */

// Original solution
// Differently from Pick, this solution won't fail when when K is not a key of T
// type MyPick<T, K extends string | number | symbol> = { [k in K]: k extends keyof T ? T[k] : never; };

// Improved solution
// Moved the restriction to the parameter definition, this fixes the issue in original issue
type MyPick<T, K extends keyof T> = { [k in K]: T[k]; };

// Alternative solution by zheeeng
// Also doesn't behave correctly when K is not in T
// type MyPick<T, K> = {
//     [k in keyof T & K]: T[k]
// }

/* _____________ Test Cases _____________ */
import { Equal, Expect } from '@type-challenges/utils'

type cases = [
  Expect<Equal<Expected1, MyPick<Todo, 'title'>>>,
  Expect<Equal<Expected2, MyPick<Todo, 'title' | 'completed'>>>,
  // @ts-expect-error
  MyPick<Todo, 'title' | 'completed' | 'invalid'>,
]

interface Todo {
  title: string
  description: string
  completed: boolean
}

interface Expected1 {
  title: string
}

interface Expected2 {
  title: string
  completed: boolean
}



/* _____________ Further Steps _____________ */
/*
  > Share your solutions: https://tsch.js.org/4/answer
  > View solutions: https://tsch.js.org/4/solutions
  > More Challenges: https://tsch.js.org
*/

