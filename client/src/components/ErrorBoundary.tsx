import React from 'react'

export class ErrorBoundary extends React.Component<{},{
    hasError: boolean
    error: string
}> {
    constructor(props: {children: React.ReactElement}) {
        super(props);
        this.state = {
            hasError: false,
            error: 'Error :('
        }
    }

    static getDerivedStateFromError(error: Error) {
        return {hasError: true, error: error.message}
    }

    componentDidCatch(error: Error, errorInfo: React.ErrorInfo): void {
        console.log(error)
    }

    render() {
        if (this.state.hasError) {
            return <div style={{
                padding: 10,
                color: 'red',
                border: '1px solid red',
                borderRadius: 5,
                backgroundColor: 'white',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center'}}
            >
                {this.state.error}
            </div>
        }
        return this.props.children
    }
}