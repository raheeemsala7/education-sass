import React from 'react'

const layout = ({ children }: { children: React.ReactNode }) => {
    return (
        <section >
            <div className="flex flex-col lg:flex-row lg:min-h-screen space-y-10 lg:space-y-0 relative z-10 ">
                {children}
            </div>
        </section>
    )
}

export default layout