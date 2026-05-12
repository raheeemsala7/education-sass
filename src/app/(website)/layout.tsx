import { Header } from '@/shared/components/header'
import React from 'react'

const websiteLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <>
            <Header />
        {children}
        </>
    )
}

export default websiteLayout