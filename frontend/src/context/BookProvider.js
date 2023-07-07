'use client'

import React, { createContext, useState, useContext, useEffect } from 'react'
import { questions } from 'public/data/quices'

// Context
import { UserContext } from './UserProvider'

export const BookContext = createContext()

const initialBookState = {
  isQuizOpen: false,
  quiz: null,
  quizzes: questions,
  hint: false,
  isHelpOpen: false,
}

export const BookProvider = ({ children }) => {
  const [bookState, setBookState] = useState(initialBookState)

  return <BookContext.Provider value={{ bookState, setBookState }}>{children}</BookContext.Provider>
}
