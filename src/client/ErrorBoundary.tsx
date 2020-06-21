// Source: https://reactjs.org/docs/error-boundaries.html#introducing-error-boundaries

import React, { Component, ErrorInfo } from "react"

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface Props { }

interface State {
  hasError: boolean
}

class ErrorBoundary extends Component {
  constructor(props: Props) {
    super(props)
    this.state = { hasError: false }
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  static getDerivedStateFromError(error: Error): State {
    // Update state so the next render will show the fallback UI.
    return { hasError: true }
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    console.log(error)
  }

  render(): JSX.Element {
    if ((this.state as State).hasError) {
      return <h1>Something went wrong.</h1>
    }
    // eslint-disable-next-line react/prop-types
    return (this.props.children as JSX.Element)
  }
}

export { ErrorBoundary }
