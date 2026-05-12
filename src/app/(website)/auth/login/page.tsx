import LoginForm from "@/features/auth/_components/login-form"


const page = () => {
    return (
        <>
            <div className="lg:basis-2/5 min-w-0">
                <div className="h-64 lg:h-full w-full overflow-hidden relative scalable-image"
                    style={{
                        backgroundImage: `url('/register.jpeg')`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                    }}
                ></div>
            </div>
            <div className="lg:basis-3/5 ">

                <div className="w-4/5  mx-auto flex justify-center lg:px-10 flex-col space-y-6 h-full">
                    <LoginForm />
                </div>
            </div>
        </>
    )
}

export default page