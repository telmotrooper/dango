/* eslint-disable @typescript-eslint/no-unused-vars */
// Source: https://reactjs.org/docs/error-boundaries.html#introducing-error-boundaries

import React, { Component, ErrorInfo } from "react"

interface Props {
  diagram: string
}

interface State {
  hasError: boolean
}

class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError(error: Error): State {
    // Update state so the next render will show the fallback UI.
    return { hasError: true }
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    console.log(error)
  }

  render(): JSX.Element {
    if (this.state.hasError) {
      return <h1>Something went wrong.</h1>
    }
    return this.props.children as JSX.Element
  }
}

export { ErrorBoundary }
